'use client'

import useKakaoLogin from "@/hooks/useKakaoLogin"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import useRegularLogin from "@/hooks/useRegularLogin"
import { Mail, Lock, LogIn } from 'lucide-react'

const KakaoLogin = dynamic(() => import('react-kakao-login'), { ssr: false })

export default function LoginPage() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [remember, setRemember] = useState<boolean>(false)

    const { login } = useRegularLogin()
    const { kakaoOnSuccess, kakaoOnFailure } = useKakaoLogin()

    useEffect(() => {
        const getEmailFromLocal = localStorage.getItem('email')
        if (getEmailFromLocal) {
            Promise.resolve().then(() => setRemember(true))
            Promise.resolve().then(() => setEmail(getEmailFromLocal))
        }
    }, [])

    const handleRegularLogin = async () => {
        await login({ nickName: email, password })
        if (remember) {
            localStorage.setItem('email', email)
        } else {
            localStorage.removeItem('email')
        }
    }

    return (
        <div className="h-full flex flex-col justify-center items-center bg-gray-950 px-4">
            <div className="w-full max-w-sm flex flex-col">

                <div className="text-center mb-8">
                    <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-4">FUELLY</p>
                    <h1 className="text-2xl font-bold text-white mb-2">다시 오셨군요</h1>
                    <p className="text-sm text-gray-500">오늘도 건강한 하루를 기록해보세요</p>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-emerald-400 transition-colors" />
                        <input
                            type="email"
                            placeholder="닉네임"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition-all"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-emerald-400 transition-colors" />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition-all"
                            required
                        />
                    </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer mb-6 px-1">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-700 cursor-pointer accent-emerald-500"
                    />
                    <span className="text-xs text-gray-500">아이디 저장</span>
                </label>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleRegularLogin}
                        className="cursor-pointer w-full py-3 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <LogIn className="w-4 h-4" />
                        로그인
                    </button>

                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-gray-950 px-3 text-xs text-gray-600 tracking-widest uppercase">or</span>
                        </div>
                    </div>

                    <KakaoLogin
                        token={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string}
                        onSuccess={kakaoOnSuccess}
                        onFail={kakaoOnFailure}
                        render={(renderProps: { onClick: () => void }) => (
                            <button
                                onClick={renderProps.onClick}
                                className="cursor-pointer w-full py-3 bg-[#FEE500] text-[#191919] rounded-xl text-sm font-medium hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                카카오로 시작하기
                            </button>
                        )}
                    />
                </div>

                <p className="text-center text-xs text-gray-600 mt-8">
                    아직 회원이 아니신가요?{' '}
                    <a href="/signup" className="text-emerald-500 hover:text-emerald-400 transition-colors">
                        회원가입
                    </a>
                </p>
            </div>
        </div>
    )
}