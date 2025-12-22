'use client'
import { useUserStore } from "@/store/userStore"
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { useRouter } from "next/navigation"
import { useState } from "react"
import usePostUserInfo from "@/hooks/usePostUserInfo"

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
            alert('입력 상태를 확인해주세요')
            return
        }
        const userInfoData = { goal, height, weight, gender, activity, age }
        mutate(userInfoData)
    }


    return (
        <section className="border sm:w-[50%] w-[80%] max-h-[90%]  rounded-2xl bg-white p-5 overflow-y-auto">
            <div className="mb-5">
                {/* TODO 카카오랑 일반로그인 이름 처리 하기 */}
                <h1 className="font-bold text-lg">{user?.nickName}님 FUELLY에 오신 것을 환영합니다!</h1>
                <p className='text-gray-500 font-bold'>영양 목표를 설정하기 위해 몇 가지 정보를 알려주세요</p>
            </div>

            <section className="flex flex-col gap-2 mb-5">
                <h2 className="font-bold">나이</h2>
                <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                        type="number"
                        value={age ?? ''}
                        onChange={(e) => setAge(Number(e.target.value))}
                        endAdornment={<InputAdornment position="end">세</InputAdornment>}
                        inputProps={{
                            style: { textAlign: 'right' }
                        }}
                    />
                </FormControl>
            </section>

            <section className="flex flex-col gap-2 mb-5">
                <h2 className="font-bold">성별</h2>
                <section className="flex gap-3">
                    <button
                        className={`flex-1 rounded-xl border px-3 py-2 
                        ${gender === 'male' ? 'bg-blue-300' : 'bg-stone-50'}`}
                        onClick={() => setGender('male')}
                    >
                        남성
                    </button>
                    <button
                        className={`flex-1 rounded-xl border px-3 py-2 
                        ${gender === 'female' ? 'bg-red-300' : 'bg-stone-50'}`}
                        onClick={() => setGender('female')}
                    >
                        여성
                    </button>
                </section>
            </section>

            <section className="flex flex-col gap-2 mb-5">
                <h2 className="font-bold">몸무게(kg)</h2>
                <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                        type="number"
                        value={weight ?? ''}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                        inputProps={{
                            style: { textAlign: 'right' }
                        }}
                    />
                </FormControl>
            </section>
            <section className="flex flex-col gap-2 mb-5">
                <h2 className="font-bold">키(cm)</h2>
                <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                        type="number"
                        value={height ?? ''}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                        inputProps={{
                            style: { textAlign: 'right' }
                        }}
                    />
                </FormControl>

            </section>

            <section className="flex flex-col gap-2 mb-5">
                <h2 className="font-bold">활동량</h2>
                <section className="flex flex-col gap-2">
                    {[
                        { label: 'sedentary', name: '거의 운동 안함' },
                        { label: 'light', name: '가벼운 운동 (주 1~2회)' },
                        { label: 'moderate', name: '보통 운동 (주 3~5회)' },
                        { label: 'active', name: '많이 운동함 (주 6회 이상)' },
                    ].map(a => (
                        <button
                            key={a.label}
                            className={`bg-stone-50 w-full text-start 
                    rounded-xl border px-3 py-2 
                    ${activity === a.label ? 'bg-stone-200' : ''}`}
                            onClick={() => setActivity(a.label as ActivityLevel)}
                        >
                            {a.name}
                        </button>
                    ))}
                </section>
            </section>

            <section className="flex flex-col gap-2 mb-5">
                <h2 className="font-bold">목표</h2>
                <section className="flex flex-col gap-2 items-start">
                    {goals.map(g => (
                        <button
                            key={g.name}
                            className={`bg-stone-50 w-full text-start 
                                    rounded-xl border border-gray-300 px-3 py-2 ${goal === g.label ? 'bg-stone-200' : ''}`}
                            onClick={() => setGoal(g.label)}
                        >
                            {g.name}
                        </button>
                    ))}
                </section>
            </section>

            <section className="flex justify-center">
                <button
                    className="bg-black text-white px-10 py-3 rounded-lg cursor-pointer"
                    onClick={handleStartClick}
                    disabled={isPending}
                >
                    {isPending ? '전송 중...' : '시작하기'}
                </button>
            </section>
        </section>
    )
}