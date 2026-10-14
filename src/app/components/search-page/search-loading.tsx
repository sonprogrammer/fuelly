
export function SearchLoading() {
    return (
        <section className=" mb-6 flex flex-col min-w-[90%]">
            <div className="py-10 bg-white/80 rounded-3xl border border-white shadow-xl flex items-center justify-center animate-pulse">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-blue-100 border-t-emerald-500 rounded-full animate-spin" />
                    <p className="font-medium text-gray-600 ">
                        Fuelly AI가 분석 중입니다...
                    </p>
                </div>
            </div>
        </section>
    )
}