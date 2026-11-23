import { refreshAccessToken, isRefreshRecoveryFailed } from "@/lib/auth/refresh-access-token";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock('axios', () => ({
    default: {
        post: vi.fn(),
        isAxiosError: (error: unknown) => {
            return !!error && typeof error === 'object' && 'isAxiosError' in error && error.isAxiosError === true
        }
    }
}))

beforeAll(() => {
    const storage = new Map<string, string>()

    vi.stubGlobal('sessionStorage', {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
        removeItem: (key: string) => storage.delete(key),
        clear: () => storage.clear()
    })
})

describe('refreshaccesstoken', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        sessionStorage.clear()
    })

    it('재발급 성공시 엑세스토큰을 저장한다', async () => {
        const post = vi.mocked(axios.post)
        post.mockResolvedValue({
            data: { accessToken: 'new-access-token' }
        })

        const token = await refreshAccessToken()

        expect(token).toBe('new-access-token')
        expect(useUserStore.getState().userAccessToken).toBe('new-access-token')
        expect(post).toHaveBeenCalledTimes(1)
    })

    it('동시에 재발급 요청해도 api는 한번만 호출된다', async () => {
        const post = vi.mocked(axios.post)
        post.mockResolvedValue({
            data: { accessToken: 'new-access-token' }
        })

        const first = refreshAccessToken()
        const second = refreshAccessToken()

        const res = await Promise.all([first, second])

        expect(res).toEqual(['new-access-token', 'new-access-token'])
        expect(post).toHaveBeenCalledTimes(1)
    })

    it('네트워크 오류시 동일한 requestId로 재시도', async () => {
        const post = vi.mocked(axios.post)

        post.mockRejectedValueOnce({
            isAxiosError: true,
            response: undefined
        }).mockResolvedValue({
            data: { accessToken: 'new-access-token' }
        })

        const token = await refreshAccessToken()

        expect(token).toBe('new-access-token')
        expect(post).toHaveBeenCalledTimes(2)

        const firstRequestId = post.mock.calls[0][2]?.headers?.['Idempotency-Key']
        const secondRequestId = post.mock.calls[1][2]?.headers?.['Idempotency-Key']

        expect(firstRequestId).toBe(secondRequestId)
    })

    it('401시 재시도하지 않는다', async () => {
        const post = vi.mocked(axios.post)
        const error = {
            isAxiosError: true,
            response: { status: 401 }
        }

        post.mockRejectedValue(error)

        await expect(refreshAccessToken()).rejects.toBe(error)
        expect(post).toHaveBeenCalledTimes(1)
    })

    it('401시 재시도 하지 않고 복구 실패 기록을 남기지 않는다.', async () => {
        const post = vi.mocked(axios.post)
        const error = {
            isAxiosError: true,
            response: { status: 401 }
        }

        sessionStorage.removeItem('refreshRecoveryFailed')
        post.mockRejectedValue(error)

        await expect(refreshAccessToken()).rejects.toBe(error)

        expect(post).toHaveBeenCalledTimes(1)
        expect(isRefreshRecoveryFailed()).toBe(false)
        expect(sessionStorage.getItem('refreshRecoveryFailed')).toBeNull()
    })


    it('503 재시도 실패 시 복구 실패 기록을 남긴다', async () => {
        const post = vi.mocked(axios.post)
        const error = {
            isAxiosError: true,
            response: { status: 503 }
        }
        post.mockRejectedValue(error)

        await expect(refreshAccessToken()).rejects.toBe(error)

        expect(post).toHaveBeenCalledTimes(5)
        expect(isRefreshRecoveryFailed()).toBe(true)
        expect(sessionStorage.getItem('refreshRecoveryFailed')).toBe('true')
    }, 20000)

})