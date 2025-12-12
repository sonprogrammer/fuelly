'use client'

import { useEffect, useState } from 'react'
// TODO 
import { axiosInstance } from '@/lib/axios'
import dayjs from "dayjs";



export default function useGetDailyMessage() {
    const [message, setMessage] = useState<string>('응원 불러오는 중...')

    useEffect(() => {
        const today = dayjs().format('YY-MM-DD')
        const savedDate = localStorage.getItem('message_date')
        const savedMessage = localStorage.getItem('message')

        // if(savedDate === today && savedMessage){
        //     Promise.resolve().then(() => setMessage(savedMessage))
        //     return
        // }

        const fetchMessage = async () => {
            try {
                const res = await axiosInstance.post('/grok', {
                    prompt: '운동과 식단을 관리하는 사람을 위해 두 문장으로 응원 메시지 보내줘'
                })
           
                const text = res.data.answer.trim()
                setMessage(text)

                localStorage.setItem('message_date', today)
                localStorage.setItem('message', text)
            } catch (err) {
                const notGiven = '오늘의 작은 변화가 더 큰 성장을 만든다 \n No matter what, JUST DO IT '
                setMessage(notGiven)
                console.log('err', err)
            }
        }
        fetchMessage()
    }, [])
    return message

}