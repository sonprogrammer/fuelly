'use client'

import { useState } from "react"
import KakaoLogin from 'react-kakao-login'


export default function LoginPage() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [remember, setRemember] = useState<boolean>(false)

    const handleLogin = (e: React.InputEvent) => {
        e.preventDefault()
        console.log('email', email, password)
    }

    return (
        <div className="h-full flex flex-col justify-center items-center bg-gray-100">
            <div className="w-[50%]">
                <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
                <div className="input flex flex-col gap-2 mb-5">
                    <input type="email"
                        placeholder="아이디"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border rounded"
                        required
                    />
                    <input type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border rounded"
                        required
                    />
                </div>
                <div className="flex mb-3 justify-between">
                    <label className="flex gap-2 items-center">
                        {/* TODO 로컬스토리지에 저장 */}
                        <input type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="w-4 h-4 accent-green-500"
                        />
                        <span>아이디 저장</span>
                    </label>
                    <div className="flex gap-2 items-center">
                        <span><a href="아이디찾기">아이디 찾기</a></span>
                        <center><div className="w-0.5 h-3.5 bg-gray-900"></div></center>
                        <span><a href="아이디찾기">비밀번호 찾기</a></span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button type="submit"
                        className="bg-green-500 text-white px-6 py-3 rounded font-bold hover:bg-green-600 transition"
                    >
                        로그인
                    </button>
                    <KakaoLogin
                    // token={process.env.REACT_APP_KAKAO_CLIENT_ID as string}
                    // onSuccess={}
                    // onFail={}
                        style={{width: '100%', backgroundColor: 'yellow', padding: '12px 30px', borderRadius: '3px'}}
                    />
                </div>
            </div>
        </div>
    )
}
