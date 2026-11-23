import { decryptToken, encryptToken } from "@/lib/auth/encrypt-token";
import { hashToken } from "@/lib/hashToken";
import { describe, expect, it } from "vitest";

describe('Refresh token 보안함수', () => {
    it('같은 토큰을 동일한 해시를 생성함', () => {
        const first = hashToken('tokenA')
        const second = hashToken('tokenA')

        expect(first).toBe(second)
    })

    it('다른 토큰은 서로 다른 해시를 생성함', () => {
        const first = hashToken('tokenA')
        const second = hashToken('tokenB')

        expect(first).not.toBe(second)
    })

    it('암호화토큰 복호화 가능', () => {
        const token = 'tokena'
        const encrypted = encryptToken(token)
        const decrypted = decryptToken(encrypted)

        expect(encrypted).not.toBe(token)
        expect(decrypted).toBe(token)
    })

    it('같은 토큰을 암호화해도 매번 다른 값이 나옴', () => {
        const first = encryptToken('tokena')
        const second = encryptToken('tokena')

        expect(first).not.toBe(second)
    })
})