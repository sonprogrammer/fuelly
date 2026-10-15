import Groq from "groq-sdk";

interface RetryOptions {
  retries?: number;
  timeoutMs?: number
}

function needRetry(err: unknown) {
  if (err instanceof Error && err.message === 'ai time out') return true

  if (err instanceof Groq.APIError) {
    return err.status === 429 || (err.status >= 500 && err.status <= 504)
  }
  return false
}

export async function requestWithRetry<T>(request: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { retries = 1, timeoutMs = 10000 } = options

  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {

    try {
      return await Promise.race([
        request(),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('ai time out')), timeoutMs)
        })
      ])
    } catch (error) {
      lastError = error
      if(!needRetry(error)) throw error
      if(attempt === retries) throw error

      if (attempt === retries) throw error
    }
  }

  throw lastError
}