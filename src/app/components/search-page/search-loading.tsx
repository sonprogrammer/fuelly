export function SearchLoading() {
    return (
        <section className="flex-1 min-h-0 mb-6 flex flex-col min-w-[90%]">
            <div className="flex-1 bg-white/80 rounded-3xl border border-white shadow-xl flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
                    <p className="font-medium text-gray-600 animate-pulse">
                        Fuelly AI 분석관이 데이터를 확인 중입니다...
                    </p>
                </div>
            </div>
        </section>
    )
}