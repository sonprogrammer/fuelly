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
         <div className="h-full flex flex-col justify-center items-center bg-gray-950 px-4">
        <div className="w-full max-w-sm flex flex-col">

            <div className="text-center mb-8">
                <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-4">FUELLY</p>
                <h1 className="text-2xl font-bold text-white mb-2">회원가입</h1>
                <p className="text-sm text-gray-500">FUELLY와 함께 건강한 식단을 시작하세요</p>
            </div>

            <div className="space-y-4 mb-6">

                <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 ml-1">사용할 이름</label>
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="근육왕"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setEmailValid(null)
                            }}
                            className="w-full pl-4 pr-24 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition-all"
                            required
                        />
                        <button
                            onClick={handleEmailCheckClick}
                            disabled={!email || isChecking}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-400 disabled:bg-gray-700 disabled:text-gray-500 transition-colors cursor-pointer"
                        >
                            {isChecking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '중복 확인'}
                        </button>
                    </div>
                    {emailValid !== null && (
                        <div className={`flex items-center gap-1.5 ml-1 text-xs ${emailValid ? 'text-emerald-400' : 'text-red-400'}`}>
                            {emailValid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            {emailValid ? '사용 가능한 이름입니다' : '이미 사용 중인 이름입니다'}
                        </div>
                    )}
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 ml-1">비밀번호</label>
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition-all"
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 ml-1">비밀번호 확인</label>
                    <input
                        type="password"
                        placeholder="비밀번호를 한 번 더 입력하세요"
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                        className={`w-full px-4 py-2.5 bg-gray-900 border rounded-xl text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all
                            ${passwordMatched === false
                                ? 'border-red-500/50 focus:border-red-500'
                                : 'border-gray-800 focus:border-emerald-500'
                            }`}
                        required
                    />
                    {passwordMatched === false && (
                        <div className="flex items-center gap-1.5 ml-1 text-xs text-red-400">
                            <XCircle className="w-3.5 h-3.5" />
                            비밀번호가 일치하지 않습니다
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={handleRegisterClick}
                className="w-full py-3 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-400 active:scale-[0.98] transition-all cursor-pointer"
            >
                시작하기
            </button>

            <p className="text-center text-xs text-gray-600 mt-6">
                이미 계정이 있으신가요?{' '}
                <a href="/login" className="text-emerald-500 hover:text-emerald-400 transition-colors">
                    로그인
                </a>
            </p>
        </div>
    </div>
    )
}

export default SignUpPage