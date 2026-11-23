import axios from "axios";

const sleep = (ms: number) => new Promise<void>(res => setTimeout(res, ms))

export async function retryRequest<T>(request: () => Promise<T>, maxRetries = 3): Promise<T> {
    for (let attempt = 0; ; attempt++) {
        try {
            return await request()
        } catch (error) {
            const status = axios.isAxiosError(error) ? error.response?.status : undefined

            const retryable = axios.isAxiosError(error) && (status === 429 || status === 502 || status === 503 || status === 504 || !error.response)

            if (!retryable || attempt >= maxRetries) {
                throw error
            }

            await sleep(1000 * 2 ** attempt)
        }
    }
}