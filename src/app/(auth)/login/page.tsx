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
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 mt-10">

            <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-sm text-gray-400 font-medium text-balance">
                        다시 오신 것을 환영합니다! <br/> 오늘도 건강한 하루를 기록해보세요.
                    </p>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                        <input 
                            type="email"
                            placeholder="아이디(이메일)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all text-sm"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-emerald-500 transition-colors" />
                        <input 
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all text-sm"
                            required
                        />
                    </div>
                </div>

                {/* 아이디 저장 및 찾기 */}
                <div className="flex mb-8 justify-between items-center px-1">
                    <label className="flex gap-2 items-center cursor-pointer group">
                        <input 
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer accent-emerald-500"
                        />
                        <span className="text-xs font-bold text-gray-500 group-hover:text-gray-700 transition-colors">아이디 저장</span>
                    </label>
                    
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handleRegularLogin}
                        className="cursor-pointer w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-100 hover:bg-emerald-600 hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <LogIn className="w-5 h-5" />
                        로그인
                    </button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100">
                                </div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-300 font-bold tracking-widest">
                                OR
                            </span>
                        </div>
                    </div>


                    <KakaoLogin
                        token={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string}
                        onSuccess={kakaoOnSuccess}
                        onFail={kakaoOnFailure}
                        render={(renderProps: { onClick: () => void }) => (
                            <button
                                onClick={renderProps.onClick}
                                className="cursor-pointer w-full py-4 bg-[#FEE500] text-[#191919] rounded-2xl font-bold text-lg hover:bg-[#FDE500] hover:shadow-md transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                
                                카카오로 시작하기
                            </button>
                        )}
                    />
                </div>

                <p className="text-center text-sm text-gray-400 mt-8 font-medium">
                    아직 회원이 아니신가요? <a href="/signup" className="text-emerald-600 font-bold hover:underline">회원가입</a>
                </p>
            </div>
        </div>
    )
}