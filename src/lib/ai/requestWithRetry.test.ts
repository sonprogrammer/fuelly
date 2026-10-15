import { describe, expect, it, vi } from "vitest";

import { requestWithRetry } from './requestWithRetry'

describe('requestWithRetry', () => {
  it('첫 요청이 성공하면 바로 결과를 반환한다', async () => {
    const request = vi.fn().mockResolvedValue('success')

    const result = await requestWithRetry(request, {
      retries: 1,
      timeoutMs: 1000
    })

    expect(result).toBe('success')
    expect(request).toHaveBeenCalledTimes(1)
  })

  it('timeout이 발생하면 한 번 재시도한다', async () => {
    const request = vi.fn()
      .mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve('late'), 100)))
      .mockResolvedValueOnce('success')

    const result = await requestWithRetry(request, {
      retries: 1,
      timeoutMs: 10
    })

    expect(result).toBe('success')
    expect(request).toHaveBeenCalledTimes(2)
  })

  it('재시도 대상이 아닌 에러는 즉시 throw한다', async () => {
    const request = vi.fn().mockRejectedValue(new Error('BAD_REQUEST'))

    await expect(
      requestWithRetry(request, {
        retries: 1,
        timeoutMs: 1000
      })
    ).rejects.toThrow('BAD_REQUEST')

    expect(request).toHaveBeenCalledTimes(1)
  })
})