'use client'

import usePostRegister from '@/hooks/usePostRegister'
import checkEmail from '@/lib/checkEmail'
import { useState } from "react"
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

const SignUpPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')
    const [emailValid, setEmailValid] = useState<boolean | null>(null)
    const [isChecking, setIsChecking] = useState<boolean>(false)

    const { register } = usePostRegister()

    const handleEmailCheckClick = async () => {
        if (!email) return
        setIsChecking(true)
        const res = await checkEmail(email)
        setEmailValid(res)
        setIsChecking(false)
    }

    const passwordMatched = password && checkPassword ? password === checkPassword : null

    const handleRegisterClick = () => {
        if (!emailValid) {
            toast.error('이메일 중복 확인을 완료해주세요.')
            return
        }
        if (!passwordMatched) {
            toast.error('비밀번호가 일치하지 않습니다.')
            return
        }
        const data = { nickName: email, password }
        register(data)
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 mt-10">

            <div className="w-full max-w-md bg-white p-8 rounded-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">회원가입</h1>
                    <p className="text-sm text-gray-400 font-medium">FUELLY와 함께 건강한 식단을 시작하세요</p>
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                        <div className="relative group">
                            <input 
                                type="email"
                                placeholder="example@fuelly.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailValid(null) 
                                }}
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                                required
                            />
                            <button
                                onClick={handleEmailCheckClick}
                                disabled={!email || isChecking}
                                className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 disabled:bg-gray-200 transition-colors shadow-sm"
                            >
                                {isChecking ? <Loader2 className="w-4 h-4 animate-spin" /> : '중복 확인'}
                            </button>
                        </div>
                        {emailValid !== null && (
                            <div className={`flex items-center gap-1.5 ml-1 mt-1 text-[13px] font-bold ${emailValid ? 'text-emerald-600' : 'text-red-500'}`}>
                                {emailValid ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                {emailValid ? '사용 가능한 이메일입니다' : '이미 사용 중인 아이디입니다'}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                        <input 
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                        <input 
                            type="password"
                            placeholder="비밀번호를 한 번 더 입력하세요"
                            value={checkPassword}
                            onChange={(e) => setCheckPassword(e.target.value)}
                            className={`w-full p-4 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all ${
                                passwordMatched === false ? 'border-red-200 focus:ring-red-500/10 focus:bg-white' : 'border-gray-100 focus:ring-emerald-500/20 focus:bg-white'
                            }`}
                            required
                        />
                        {passwordMatched === false && (
                            <p className="text-[13px] font-bold text-red-500 ml-1 mt-1 flex items-center gap-1.5">
                                <XCircle className="w-4 h-4" /> 비밀번호가 일치하지 않습니다
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-10">
                    <button 
                        onClick={handleRegisterClick}
                        className="w-full py-4 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                    >
                        시작하기
                    </button>
                    <p className="text-center text-sm text-gray-400 mt-6 font-medium">
                        이미 계정이 있으신가요? <a href="/login" className="text-emerald-600 font-bold hover:underline">로그인</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage