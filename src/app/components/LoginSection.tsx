export default function LoginSection() {
    return (
        <section className="h-full flex flex-col justify-center items-center text-center bg-gradient-to-b from-green-200 to-green-400 text-white">
            <h1 className="text-5xl font-bold mb-4">건강한 식단, 쉽게 시작하세요</h1>
            <p className="text-xl mb-6 max-w-xl">
                다양한 맞춤 식단과 레시피로 건강을 지키고, 체계적인 식단 관리가 가능합니다.
            </p>
            <div className="flex gap-4">
                <a
                    href="/login"
                    className="bg-white text-green-500 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition"
                >
                    로그인
                </a>
                <a
                    href="/signup"
                    className="bg-white text-green-500 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition"
                >
                    회원가입
                </a>
            </div>
        </section>
    )
}