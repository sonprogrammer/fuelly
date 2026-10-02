'use client'


import { NumberQuestion } from "@/app/components/survey/NumberQuestion"
import { QuestionHeader } from "@/app/components/survey/QuestionHeader"
import { SelectCard } from "@/app/components/survey/SelectCard"
import { ACTIVITIES, GOALS } from "@/config/survey-goals"
import usePostUserInfo from "@/hooks/usePostUserInfo"
import { useSurveyStore } from "@/store/surveyStore"
import { useUserStore } from "@/store/userStore"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

const TOTAL_STEP = 6

export default function SurveyComponent() {
    const router = useRouter()
    const user = useUserStore((state) => state.user)
    const step = useSurveyStore((state) => state.step)
    const survey = useSurveyStore((state) => state.survey)
    const setStep = useSurveyStore((state) => state.setStep)
    const setSurveyValue = useSurveyStore((state) => state.setSurveyValue)
    const resetSurvey = useSurveyStore((state) => state.resetSurvey)
    const { mutate, isPending } = usePostUserInfo()

    const handleNext = () => {
        if (step === 0 && !survey.goal) {
            toast.error("목표를 선택해주세요")
            return
        }
        if (step === 1 && !survey.gender) {
            toast.error("성별을 선택해주세요")
            return
        }
        if (step === 2 && !survey.age) {
            toast.error("나이를 입력해주세요")
            return
        }
        if (step === 3 && !survey.height) {
            toast.error("키를 입력해주세요")
            return
        }
        if (step === 4 && !survey.weight) {
            toast.error("몸무게를 입력해주세요")
            return
        }
        if (step === 5 && !survey.activity) {
            toast.error("활동량을 선택해주세요")
            return
        }
        if (step < TOTAL_STEP - 1) {
            setStep(step + 1)
            return
        }
        handleSubmit()
    }

    const handlePrev = () => {
        if (step === 0) return
        setStep(step - 1)
    }

    const handleSubmit = () => {
        const { goal, gender, age, height, weight, activity } = survey
        if (!goal || !gender || !age || !height || !weight || !activity) {
            toast.error("입력 상태를 확인해주세요")
            return
        }
        mutate({ goal, gender, age, height, weight, activity }, {
            onSuccess: () => {
                resetSurvey()
                toast.success("Fuelly와 함께 건강한 식단을 만들어 보세요!")
                router.replace("/home")
            }
        })
}

const progress = ((step + 1) / TOTAL_STEP) * 100

return (
    <section className="w-full max-w-md rounded-3xl border border-gray-800 bg-gray-900 p-6 sm:p-8">
        <div className="mb-8">
            <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-[0.2em] text-emerald-500">FUELLY</p>
                <span className="text-xs font-medium text-gray-500">{step + 1} / {TOTAL_STEP}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-800">
                <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
        </div>

        <div className="min-h-[330px]">
            {step === 0 && (
                <div>
                    <QuestionHeader title={`${user?.nickName || user?.name || ""}님은 어떤 목표가 있으신가요?`} description="목표에 맞춰 하루 권장 섭취량을 계산해드릴게요." />
                    <div className="mt-7 flex flex-col gap-3">
                        {GOALS.map((goal) => (
                            <SelectCard
                                key={goal.label}
                                selected={survey.goal === goal.label}
                                title={goal.title}
                                description={goal.description}
                                onClick={() => setSurveyValue("goal", goal.label)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {step === 1 && (
                <div>
                    <QuestionHeader title="성별을 알려주세요" description="기초대사량과 권장 영양 섭취량 계산에 활용돼요." />
                    <div className="mt-7 grid grid-cols-2 gap-3">
                        <SelectCard selected={survey.gender === "male"} title="남성" onClick={() => setSurveyValue("gender", "male")} />
                        <SelectCard selected={survey.gender === "female"} title="여성" onClick={() => setSurveyValue("gender", "female")} />
                    </div>
                </div>
            )}

            {step === 2 && (
                <NumberQuestion
                    title="나이가 어떻게 되시나요?"
                    description="보다 정확한 하루 영양 목표를 계산하는 데 사용돼요."
                    value={survey.age}
                    unit="세"
                    placeholder="30"
                    onChange={(value) => setSurveyValue("age", value)}
                />
            )}

            {step === 3 && (
                <NumberQuestion
                    title="키를 알려주세요"
                    description="신체 정보를 바탕으로 적정 섭취량을 계산해요."
                    value={survey.height}
                    unit="cm"
                    placeholder="175"
                    onChange={(value) => setSurveyValue("height", value)}
                />
            )}

            {step === 4 && (
                <NumberQuestion
                    title="현재 몸무게를 알려주세요"
                    description="현재 상태와 목표를 비교해 맞춤 영양 정보를 제공해요."
                    value={survey.weight}
                    unit="kg"
                    placeholder="70"
                    onChange={(value) => setSurveyValue("weight", value)}
                />
            )}

            {step === 5 && (
                <div>
                    <QuestionHeader title="평소 활동량은 어느 정도인가요?" description="일상 활동량을 포함해 필요한 에너지를 계산해요." />
                    <div className="mt-7 flex flex-col gap-3">
                        {ACTIVITIES.map((activity) => (
                            <SelectCard
                                key={activity.label}
                                selected={survey.activity === activity.label}
                                title={activity.title}
                                description={activity.description}
                                onClick={() => setSurveyValue("activity", activity.label)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>

        <div className="mt-8 flex gap-3">
            {step > 0 && (
                <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isPending}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-700 bg-gray-800 text-gray-300 transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ArrowLeft className="h-4 w-4" />
                </button>
            )}
            <button
                type="button"
                onClick={handleNext}
                disabled={isPending}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-semibold text-white transition hover:bg-emerald-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isPending ? "저장 중..." : step === TOTAL_STEP - 1 ? "Fuelly 시작하기" : "다음"}
                {!isPending && (step === TOTAL_STEP - 1 ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />)}
            </button>
        </div>
    </section>
)
}





