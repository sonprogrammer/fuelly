'use client'

import usePostRegister from '@/hooks/usePostRegister'
import checkEmail from '@/lib/checkEmail'

import { useState } from "react"


const SignUpPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')
    const [emailValid, setEmailValid] = useState<boolean | null>(null)
    const [isChecking, setIsChecking] = useState<boolean>(false)

    
    const {register } = usePostRegister()

    const handleEmailCheckClick = async () => {
        if (!email) return

        setIsChecking(true)
        const res = await checkEmail(email)
        setEmailValid(res)
        setIsChecking(false)
    }

    const passwordMatched = password && checkPassword ?
    password === checkPassword : null

    const handleRegisterClick = () => {
        //입력한 이메일이 디비에 있을 때, 이메일 중복 확인을 안했을 때
        if(!emailValid || emailValid === null){
            alert('이메일 중복 확인해주세요')
            return
        }
        //비번이 서로 다를때
        if(!passwordMatched){
            alert('비밀번호를 확인해주세요')
            return
        }
        //둘다 잘되었을 때
        const data = {nickName: email, password}
        register(data)
    }

    return (
        <div className="h-full flex flex-col justify-center items-center bg-gray-100">
            <div className="w-[50%]">
                <h1 className="text-2xl font-bold mb-6 text-center title">회원가입</h1>
                <div className="아이디,비밀번호창 input flex flex-col gap-2 mb-5">
                    <div className="relative">
                        <input type="email"
                            placeholder="아이디"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 border rounded w-full"
                            required
                        />
                        <button
                            onClick={handleEmailCheckClick}
                            className="absolute right-3 cursor-pointer top-2 bg-amber-500 rounded-lg text-sm px-2 py-2">
                            중복 확인
                        </button>
                        {isChecking ? '확인 중...' :
                        emailValid === null ? null : emailValid ? 
                            (<p className='text-green-600 font-bold mt-2'>사용가능한 이메일 입니다</p>)
                            : (<p className='text-red-600 font-bold mt-2'>이미 존재하는 아이디입니다</p>)
                        }
                    </div>
                    <input type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border rounded"
                        required
                    />
                    <input type="password"
                        placeholder="비밀번호 확인"
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                        className="p-3 border rounded"
                        required
                    />
                    {passwordMatched === null ? null :
                    (passwordMatched ? null : <p className='mt-2 pl-2 text-red-500 font-bold'>비밀번호가 다릅니다</p>)}
                </div>
                <div>
                    <button 
                        onClick={handleRegisterClick}
                        className="btn w-full border">register</button>
                </div>

            </div>
        </div>
    )
}

export default SignUpPage
