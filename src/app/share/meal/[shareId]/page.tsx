import dbConnect from "@/lib/mongoose"
import SharedMealModel from "@/models/sharedMealModel"
import { Beef, Flame, Utensils } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"

interface SharedMealPageProps {
    params: Promise<{
        shareId: string
    }>
}


export default async function SharedMealPage({ params }: SharedMealPageProps) {
    const { shareId } = await params

    await dbConnect()

    const sharedMeal = await SharedMealModel.findOne({ shareId }).lean()

    if (!sharedMeal) {
        notFound()
    }

    return (
        <main className="h-dvh overflow-hidden bg-gray-950 px-4 py-5 text-white sm:py-8">
            <div className="mx-auto flex h-full w-full max-w-2xl flex-col gap-4">
                <header className="shrink-0 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Image
                            src="/favicon.png"
                            alt="Fuelly"
                            width={32}
                            height={32}
                            className="h-8 w-8"
                            priority
                        />

                        <p className="text-sm font-bold tracking-[0.2em] text-emerald-400">
                            FUELLY
                        </p>
                    </div>

                    <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
                        {sharedMeal.displayName}님의 오늘 식단
                    </h1>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        Fuelly에서 기록한 하루 식단을 공유했어요.
                    </p>
                </header>

                <section className="grid shrink-0 grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-orange-500/10 bg-gray-900 p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
                                <Flame className="h-4 w-4 text-orange-400" />
                            </div>

                            <span className="text-xs text-gray-500">
                                총 칼로리
                            </span>
                        </div>

                        <p className="text-xl font-bold text-orange-400 sm:text-2xl">
                            {sharedMeal.totalCalorie.toLocaleString()}
                            <span className="ml-1 text-xs font-normal text-gray-600">
                                kcal
                            </span>
                        </p>
                    </div>

                    <div className="rounded-2xl border border-red-500/10 bg-gray-900 p-4">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                                <Beef className="h-4 w-4 text-red-400" />
                            </div>

                            <span className="text-xs text-gray-500">
                                총 단백질
                            </span>
                        </div>

                        <p className="text-xl font-bold text-red-400 sm:text-2xl">
                            {sharedMeal.totalProtein.toLocaleString()}
                            <span className="ml-1 text-xs font-normal text-gray-600">
                                g
                            </span>
                        </p>
                    </div>
                </section>

                <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900">
                    <div className="flex shrink-0 items-center justify-between border-b border-gray-800 px-5 py-3.5">
                        <div className="flex items-center gap-2">
                            <Utensils className="h-4 w-4 text-emerald-400" />

                            <h2 className="text-sm font-semibold text-gray-200">
                                오늘 먹은 음식
                            </h2>
                        </div>

                        <span className="text-xs text-gray-600">
                            {sharedMeal.meals.length}개
                        </span>
                    </div>

                    <div className="min-h-0 flex-1 divide-y divide-gray-800 overflow-y-auto">
                        {sharedMeal.meals.map(food => (
                            <div
                                key={`${food.name}-${food.unit}`}
                                className="flex items-center justify-between gap-4 px-5 py-4"
                            >
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-200">
                                        {food.name}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-600">
                                        {food.unit}
                                        {food.quantity > 1 && ` · ${food.quantity}회`}
                                    </p>
                                </div>

                                <div className="shrink-0 text-right">
                                    <p className="text-sm font-semibold text-orange-400">
                                        {(food.calorie * food.quantity).toLocaleString()}
                                        <span className="ml-0.5 text-[10px] font-normal text-orange-500/60">
                                            kcal
                                        </span>
                                    </p>

                                    <p className="mt-1 text-xs font-medium text-blue-400">
                                        단백질 {(food.protein * food.quantity).toLocaleString()}g
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="shrink-0 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4">
                    <div className="mb-3 text-center">
                        <p className="text-sm font-semibold text-gray-100">
                            나도 오늘 먹은 음식을 기록해볼까요?
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            칼로리와 단백질을 간편하게 기록하고 관리해보세요.
                        </p>
                    </div>

                    <Link
                        href="/signup"
                        className="flex w-full items-center justify-center rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-400 active:scale-[0.99]"
                    >
                        Fuelly 시작하기
                    </Link>
                </section>
            </div>
        </main>
    )
}