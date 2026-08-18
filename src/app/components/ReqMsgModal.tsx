'use client'

import { useRequestDailyMessage } from "@/hooks/useRequestDailyMessage"
import { useState } from "react"
import toast from "react-hot-toast"


export function ReqMsgModal({onClose} : {onClose: () => void}) {
    const [prompt, setPrompt] = useState('')

    const { mutate, isPending } = useRequestDailyMessage()

    console.log('hifdasf')

    const handleSubmitToAi = () => {
        console.log('pompt', prompt)
        if (!prompt) return toast('응원받고 싶은 내용을 적어주세요')
            console.log('clicek', prompt)
        mutate(prompt, {
            onSuccess: (res) => {
                console.log('res fsdf', res)
                onClose()
            }
        })
    }
    
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
        onClick={onClose}
    >
            <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-sm flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <h3
                    className="text-white text-center"
                >오늘 하루는 어떠셨나요.<br/> 지친 하루 위로의 응원 받아보세요</h3>
                <textarea 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full bg-gray-800 p-2 text-white my-4 outline-none resize-none" 
                />
                <button 
                    className="bg-purple-300 px-5 py-2 rounded-md hover:bg-purple-500 hover:text-white font-semibold "
                onClick={handleSubmitToAi} disabled={isPending}>
                    {isPending ? '요청 중...' : '요청하기'}
                </button>
            </div>
        </div>
  )
}