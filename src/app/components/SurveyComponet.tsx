'use client'
import { useUserStore } from "@/store/userStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import usePostUserInfo from "@/hooks/usePostUserInfo"
import { toast } from 'react-hot-toast'

type GoalLabel = 'bulk' | 'diet' | 'maintain'
type Gender = 'male' | 'female'
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active'
interface Goal {
    name: string;
    label: GoalLabel
}


export default function SurveyComponent() {
    const [goal, setGoal] = useState<GoalLabel | null>(null)
    const [height, setHeight] = useState<number | null>(null)
    const [weight, setWeight] = useState<number | null>(null)
    const [gender, setGender] = useState<Gender | null>(null)
    const [activity, setActivity] = useState<ActivityLevel | null>(null)
    const [age, setAge] = useState<number | null>(null)
    const router = useRouter()
    const user = useUserStore(state => state.user)


    const { mutate, isPending } = usePostUserInfo()

    const goals: Goal[] = [
        { name: '벌그업(근육 증가)', label: 'bulk' },
        { name: '다이어트(체지방 감소)', label: 'diet' },
        { name: '유지', label: 'maintain' }
    ]

    const formValid = weight !== null && height !== null && goal !== null && gender !== null && activity !== null && age !== null
    const handleStartClick = () => {
        if (!formValid) {
            toast.error('입력 상태를 확인해주세요')
            return
        }
        const userInfoData = { goal, height, weight, gender, activity, age }
        mutate(userInfoData, {
            onSuccess: () => {
                toast.success('Fuelly와 함께 건강식단을 만들어 보세요!')
                router.replace('/home')
            }
        })
    }


    return (
        <section className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-6 overflow-y-auto max-h-[85vh]">

            <div className="mb-6">
                <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-4">FUELLY</p>
                <h1 className="text-lg font-bold text-white mb-1">
                    {user?.nickName || user?.name}님, 환영합니다!
                </h1>
                <p className="text-sm text-gray-500">영양 목표 설정을 위해 몇 가지 정보를 알려주세요</p>
            </div>

            <div className="flex flex-col gap-5">

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500">나이</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={age ?? ''}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className="w-full px-4 py-2.5 pr-10 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white text-right focus:outline-none focus:border-emerald-500 transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">세</span>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500">성별</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setGender('male')}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer
                            ${gender === 'male'
                                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            남성
                        </button>
                        <button
                            onClick={() => setGender('female')}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer
                            ${gender === 'female'
                                    ? 'bg-pink-500/20 border-pink-500/50 text-pink-400'
                                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            여성
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500">몸무게</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={weight ?? ''}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full px-4 py-2.5 pr-10 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white text-right focus:outline-none focus:border-emerald-500 transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg</span>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500">키</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={height ?? ''}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-full px-4 py-2.5 pr-10 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white text-right focus:outline-none focus:border-emerald-500 transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">cm</span>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500">활동량</label>
                    <div className="flex flex-col gap-2">
                        {[
                            { label: 'sedentary', name: '거의 운동 안함' },
                            { label: 'light', name: '가벼운 운동 (주 1~2회)' },
                            { label: 'moderate', name: '보통 운동 (주 3~5회)' },
                            { label: 'active', name: '많이 운동함 (주 6회 이상)' },
                        ].map(a => (
                            <button
                                key={a.label}
                                onClick={() => setActivity(a.label as ActivityLevel)}
                                className={`w-full text-left text-sm px-4 py-2.5 rounded-xl border transition-all cursor-pointer
                                ${activity === a.label
                                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                {a.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500">목표</label>
                    <div className="flex flex-col gap-2">
                        {goals.map(g => (
                            <button
                                key={g.name}
                                onClick={() => setGoal(g.label)}
                                className={`w-full text-left text-sm px-4 py-2.5 rounded-xl border transition-all cursor-pointer
                                ${goal === g.label
                                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                {g.name}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleStartClick}
                    disabled={isPending}
                    className="w-full py-3 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-400 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? '전송 중...' : '시작하기'}
                </button>
            </div>
        </section>
    )
}