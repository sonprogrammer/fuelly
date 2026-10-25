'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'



export function SubmitLoading() {
    return (
        <section
            role="status"
            aria-live="polite"
            className="relative flex min-h-[450px] w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 px-6 py-12 text-center sm:px-8"
        >
            <div className="relative flex h-40 w-40 items-center justify-center">
                <div
                    aria-hidden="true"
                    className="absolute inset-3 rounded-full bg-emerald-500/15 blur-2xl"
                />
                <Image
                    src="/fuellyRun.png"
                    alt="Fuelly 로고"
                    width={144}
                    height={144}
                    className="relative h-36 w-36 object-contain drop-shadow-lg"
                />
            </div>
            <p className="mt-5 text-[10px] font-semibold tracking-[0.25em] text-emerald-400">
                READY FOR YOU
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
                시작할 준비가 되었어요
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
                입력하신 정보가 저장되었어요.
                <br />
                Fuelly와 함께 나에게 맞는 식단을 시작해보세요.
            </p>
            <div className="mt-8 flex items-center gap-2 rounded-full border border-gray-800 bg-gray-950/50 px-4 py-2.5">
                <Loader2
                    className="h-3.5 w-3.5 animate-spin text-emerald-400 motion-reduce:animate-none"
                    aria-hidden="true"
                />
                <span className="text-xs text-gray-400">
                    홈으로 이동하고 있어요
                </span>
            </div>
        </section>
    )
}