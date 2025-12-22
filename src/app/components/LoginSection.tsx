import { MoveRight } from 'lucide-react'

export default function LoginSection() {
    return (
        <section className="relative h-full flex flex-col justify-center items-center text-center bg-linear-to-br from-teal-400 via-emerald-500 to-green-600 text-white overflow-hidden px-4">
      
      <div className="absolute top-0 left-0 w-full h-full opacity-5 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl flex flex-col items-center">

        <span className="text-4xl mb-2 animate-bounce">🥗</span>
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-sm">
          건강한 식단,<br className="sm:hidden" /> 쉽게 시작하세요
        </h1>
        
        <p className="text-lg md:text-xl mb-10 max-w-xl text-green-50 font-medium leading-relaxed opacity-90">
          다양한 맞춤 식단과 레시피로 건강을 지키고, <br className="hidden sm:block"/>
          체계적인 식단 관리가 가능합니다. 오늘도 활기차게 시작해볼까요?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="/signup"
            className="group bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
          >
            지금 시작하기 (회원가입)
            <MoveRight />
          </a>

          <a
            href="/login"
            className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white text-white hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center justify-center"
          >
            로그인
          </a>
        </div>
      </div>
    </section>
    )
}