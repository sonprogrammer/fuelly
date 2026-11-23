'use client'

import { useState } from 'react'
import { useUserStore } from '@/store/userStore'
import axios from 'axios'
import toast from 'react-hot-toast'

export function LoginError({ requiresRelogin }: { requiresRelogin: boolean }) {
    const [isPending, setIsPending] = useState(false)

    const handleRelogin = async () => {
        if (isPending) return

        setIsPending(true)

        try {
            await axios.post('/api/clear-refresh')
            useUserStore.getState().clearUser()
            sessionStorage.removeItem('refreshRecoveryFailed')
            window.location.replace('/')
        } catch (err) {
            console.error('쿠키 삭제 실패', err)
            toast.error('연결을 확인한 후 다시 시도해 주세요.')
            setIsPending(false)
        }
    }
    return (
        <div className="fixed inset-0 z-100 flex flex-col gap-3 items-center justify-center bg-white/10 backdrop-blur-md">
            <p className='text-red-800 text-2xl font-bold'>{requiresRelogin ? '로그인 상태를 복구하지 못했습니다.' : '일시적으로 연결에 문제가 발생했습니다.'}</p>
            <p className="text-sm text-red-500">
                {requiresRelogin ? <span>다시 로그인해 주세요.</span>  : <span className='animate-pulse'>자동으로 연결을 다시 확인하고 있습니다.</span>}
            </p>
            {requiresRelogin && (
                <button
                    onClick={handleRelogin}
                    disabled={isPending}
                    className="rounded-lg bg-emerald-500 px-4 py-2 text-white disabled:opacity-50"
                >
                    {isPending ? '처리 중...' : '다시 로그인'}
                </button>
            )}
        </div>
    )
}