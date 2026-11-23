export const redisKeys = {
    session: (sessionId: string) => `fuelly:session:${sessionId}`,
    refreshRequest: (sessionId: string, requestId: string) => `fuelly:refresh:${sessionId}:${requestId}`

}