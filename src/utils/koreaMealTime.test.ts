
import { getMealTime } from "./koreaMealTime";
import { describe, expect, it } from "vitest";

describe('getMealTime', () => {
    it('오전 8시는 아침이다', () => {
        expect(getMealTime(new Date('2026-10-15T08:00:00+09:00'))).toBe('아침')
    })

    it('오후 12시는 점심이다', () => {
        expect(getMealTime(new Date('2026-10-15T12:00:00+09:00'))).toBe('점심')
    })

    it('오후 4시는 간식이다', () => {
        expect(getMealTime(new Date('2026-10-15T16:00:00+09:00'))).toBe('간식')
    })

    it('오후 7시는 저녁이다', () => {
        expect(getMealTime(new Date('2026-10-15T19:00:00+09:00'))).toBe('저녁')
    })

    it('새벽 2시는 야식이다', () => {
        expect(getMealTime(new Date('2026-10-15T02:00:00+09:00'))).toBe('야식')
    })
})