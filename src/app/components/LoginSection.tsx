import { MoveRight } from 'lucide-react'

export default function LoginSection() {
  return (
    <section className="h-full flex flex-col justify-center items-center text-center px-6 bg-gray-950">
            <div className="max-w-md w-full flex flex-col items-center">

                <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-8">FUELLY</p>

                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                    건강한 식단,<br />
                    <span className="text-emerald-400">쉽게 시작하세요</span>
                </h1>

                <p className="text-sm text-gray-400 leading-relaxed mb-10 max-w-xs">
                    맞춤 영양 목표와 AI 식단 추천으로<br />
                    체계적인 식단 관리를 시작해보세요
                </p>

                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <a
                        href="/signup"
                        className="flex items-center justify-center gap-2 w-full bg-emerald-500 text-white py-3 rounded-xl text-sm font-medium hover:bg-emerald-400 active:scale-[0.98] transition-all"
                    >
                        지금 시작하기
                        <MoveRight className="w-4 h-4" />
                    </a>

                    <a
                        href="/login"
                        className="flex items-center justify-center w-full border border-gray-700 text-gray-300 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 active:scale-[0.98] transition-all"
                  >
                        로그인
                    </a>
                </div>

                <div className="flex items-center gap-6 mt-12 text-xs text-gray-600">
                    <span>AI 식단 추천</span>
                    <span className="w-px h-3 bg-gray-700 inline-block" />
                    <span>영양 목표 관리</span>
                    <span className="w-px h-3 bg-gray-700 inline-block" />
                    <span>즐겨찾기</span>
                </div>
            </div>
        </section>
  )
}