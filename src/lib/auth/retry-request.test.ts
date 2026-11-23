import { describe, it, expect, vi } from 'vitest'
import { retryRequest } from './retry-request'

describe('retryRequest', () => {
  it('요청이 성공하면 재시도하지 않는다', async () => {
    const request = vi.fn().mockResolvedValue('success')

    const result = await retryRequest(request)

    expect(result).toBe('success')
    expect(request).toHaveBeenCalledTimes(1)
  })

  it('503 오류가 발생하면 재시도한다', async () => {
    const request = vi.fn()
      .mockRejectedValueOnce({
        isAxiosError: true,
        response: { status: 503 }
      })
      .mockResolvedValue('success')

    const result = await retryRequest(request, 1)

    expect(result).toBe('success')
    expect(request).toHaveBeenCalledTimes(2)
  })

  it('401 오류가 발생하면 재시도하지 않는다', async () => {
    const error = {
      isAxiosError: true,
      response: { status: 401 }
    }
    const request = vi.fn().mockRejectedValue(error)

    await expect(retryRequest(request)).rejects.toBe(error)
    expect(request).toHaveBeenCalledTimes(1)
  })
})