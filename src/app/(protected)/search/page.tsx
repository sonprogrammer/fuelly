import { AISearchSection } from "@/app/components/search-page";

export default function AISearchPage() {
   
    return (
        <div className="relative h-full overflow-hidden flex flex-col items-center">


            <div className="bg-gradient-animated h-full absolute inset-0 z-0" />

            <div className="p-5 sm:p-6 lg:px-8 flex flex-col h-full gap-3 w-full max-w-5xl items-center relative z-10 mx-auto">
                <header className="pt-8 pb-6 sm:pt-12 sm:pb-10 shrink-0">
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                        AI 식단 가이드
                    </h1>
                    <p className="text-center text-gray-500 mt-2 text-sm sm:text-base">
                        AI가 영양 성분을 분석 및 추천을 도와드립니다.
                    </p>
                </header>

                <AISearchSection />

                
                
            </div>
        </div>

    )
}
