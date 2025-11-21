'use client'

import { useState } from "react"


const SignUpPage = () => {
    const [checkEmail, setCheckEmail] = useState<string>('')

    // TODO 이메일 체크 로직 
    return (
        <div className="h-full flex flex-col justify-center items-center bg-gray-100">
            <div className="w-[50%]">
                <h1 className="text-2xl font-bold mb-6 text-center title">로그인</h1>
                <div className="input flex flex-col gap-2 mb-5">
                    <div className="relative">
                        <input type="email"
                            placeholder="아이디"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            className="p-3 border rounded w-full"
                            required
                        />
                        <button 
                            className="absolute right-3 cursor-pointer top-2 bg-amber-500 rounded-lg text-sm px-2 py-2">
                                중복 확인
                        </button>
                        {checkEmail.length > 0 && <p></p>}
                    </div>
                    <input type="password"
                        placeholder="비밀번호"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border rounded"
                        required
                    />
                    <input type="password"
                        placeholder="비밀번호 확인"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border rounded"
                        required
                    />
                </div>
                <div>
                    <button className="btn w-full border">register</button>
                </div>

            </div>
        </div>
    )
}

export default SignUpPage
