import Link from "next/link"
import Image from "next/image"
import {  Home } from "lucide-react"
import BackBtn from "@/app/components/BackBtn"

export default function NotFound() {
    return (
        <main className="min-h-dvh bg-gray-950 px-5 py-8 text-white">
            <div className="mx-auto flex min-h-[calc(100dvh-64px)] w-full max-w-lg flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/10 shadow-lg shadow-emerald-500/10">
                    <Image
                        src="/favicon.png"
                        alt="Fuelly"
                        width={72}
                        height={72}
                        className="h-18 w-18"
                        priority
                    />
                </div>

                <p className="text-sm font-bold tracking-[0.25em] text-emerald-400">
                    FUELLY
                </p>

                <h1 className="mt-4 text-7xl font-black tracking-tight text-white">
                    404
                </h1>

                <h2 className="mt-4 text-xl font-bold text-gray-100">
                    이 페이지는 식단에서 빠졌나 봐요
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    요청한 페이지를 찾을 수 없어요.
                    <br />
                    주소가 잘못되었거나 페이지가 이동되었을 수 있어요.
                </p>

                <div className="mt-8 flex w-full max-w-sm gap-3">
                    <Link
                        href="/"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-400 active:scale-[0.98]"
                    >
                        <Home className="h-4 w-4" />
                        홈으로
                    </Link>

                    <BackBtn />
                </div>

                <div className="mt-10 h-px w-full max-w-xs bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />

                <p className="mt-4 text-xs text-gray-700">
                    Eat better, every day.
                </p>
            </div>
        </main>
    )
}