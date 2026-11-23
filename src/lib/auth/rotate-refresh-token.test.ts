import { decryptToken, encryptToken } from "@/lib/auth/encrypt-token";
import { rotateRefreshToken } from "@/lib/auth/rotate-refresh-token";
import { hashToken } from "@/lib/hashToken";
import { redis } from "@/lib/redis";
import { redisKeys } from "@/lib/redis-keys";
import { randomUUID } from "crypto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe('refresh token rotation', () => {
    let sessionId: string
    let userId: string
    let requestId: string

    const tokenA = 'tokenA'
    const tokenB = 'tokenB'

    beforeEach(async () => {
        sessionId = randomUUID()
        userId = randomUUID()
        requestId = randomUUID()

        await redis.set(redisKeys.session(sessionId), {
            userId, tokenHash: hashToken(tokenA)
        }, { ex: 60 })
    })

    afterEach(async () => {
        await redis.del(redisKeys.session(sessionId), redisKeys.refreshRequest(sessionId, requestId))
    })

    it('기존 리프레시토큰a->b로 교체', async () => {
        const res = await rotateRefreshToken(
            sessionId,
            userId,
            requestId,
            hashToken(tokenA),
            hashToken(tokenB),
            encryptToken(tokenB)
        )

        const session = await redis.get<{ tokenHash: string }>(redisKeys.session(sessionId))

        expect(res).toBe('SUCCESS')
        expect(session?.tokenHash).toBe(hashToken(tokenB))
    })

    it('같은 requtestid로 재요청시 기존 토큰 b를 반환함', async () => {
        const firstResult = await rotateRefreshToken(
            sessionId,
            userId,
            requestId,
            hashToken(tokenA),
            hashToken(tokenB),
            encryptToken(tokenB)
        )

        const secondResult = await rotateRefreshToken(
            sessionId,
            userId,
            requestId,
            hashToken(tokenA),
            hashToken('tokenC'),
            encryptToken('tokenC')
        )
        expect(firstResult).toBe('SUCCESS')
        expect(decryptToken(secondResult)).toBe(tokenB)
    })

    it('다른 requestId 로 기존 토큰을 재사용시 거부', async () => {
        await rotateRefreshToken(
            sessionId,
            userId,
            requestId,
            hashToken(tokenA),
            hashToken(tokenB),
            encryptToken(tokenB)
        )

        const anotherRequestId = randomUUID()

        const res = await rotateRefreshToken(
            sessionId,
            userId,
            anotherRequestId,
            hashToken(tokenA),
            hashToken('tokenC'),
            encryptToken('tokenC')
        )
        expect(res).toBe('INVALID')
    })

    it('복구 기록이삭제되면 기존 토큰으로 재요청불가', async () => {
        await rotateRefreshToken(
            sessionId,
            userId,
            requestId,
            hashToken(tokenA),
            hashToken(tokenB),
            encryptToken(tokenB)
        )

        await redis.del(redisKeys.refreshRequest(sessionId, requestId))

        const res = await rotateRefreshToken(
            sessionId,
            userId,
            requestId,
            hashToken(tokenA),
            hashToken('tokenC'),
            encryptToken('tokenC')
        )

        expect(res).toBe('INVALID')
    })

    it('2번째 요청으로 3번째 토큰으로 교체된후 첫번째요청의 토큰을 거부한다', async () => {
        const requestId2 = randomUUID()

        try {
            await rotateRefreshToken(
                sessionId,
                userId,
                requestId,
                hashToken(tokenA),
                hashToken(tokenB),
                encryptToken(tokenB)
            )

            await rotateRefreshToken(
                sessionId,
                userId,
                requestId2,
                hashToken(tokenB),
                hashToken('tokenC'),
                encryptToken('tokenC')
            )

            const res = await rotateRefreshToken(
                sessionId,
                userId,
                requestId,
                hashToken(tokenA),
                hashToken(tokenB),
                encryptToken(tokenB)
            )

            expect(res).toBe("INVALID")
        } finally{
            await redis.del(redisKeys.refreshRequest(sessionId, requestId2))
        }
    })

})