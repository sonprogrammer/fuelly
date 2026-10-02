'use client'

import { ChevronRight, Pencil, Target } from "lucide-react"
import { useState } from "react"
import GoalModalComponent from "../components/GoalModalComponent"

interface GoalProps {
  goal?: string
  weight?: number
  activity?: string
}

type EditType = 'weight' | 'goal' | 'activity'

export default function GoalComponent({ goal, weight, activity }: GoalProps) {
  const [edit, setEdit] = useState<EditType | null>(null)

  const goalMap: Record<string, string> = {
    bulk: "근육 증가",
    diet: "체지방 감소",
    maintain: "현재 상태 유지"
  }

  const activityMap: Record<string, string> = {
    sedentary: "거의 운동 안함",
    light: "주 1~2회 운동",
    moderate: "주 3~5회 운동",
    active: "주 6회 이상 운동"
  }

  const goalName = goal ? goalMap[goal] : "목표 설정 필요"
  const activityName = activity ? activityMap[activity] : "활동량 설정 필요"

  return (
    <>
      <div className="min-w-[290px] overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">
        <div className="flex items-start justify-between p-5">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <Target className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">현재 목표</p>
              <p className="mt-1 text-lg font-bold text-white">{goalName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEdit('goal')}
            aria-label="목표 수정"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-800 hover:text-white"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="border-t border-gray-800">
          <button
            type="button"
            onClick={() => setEdit('weight')}
            className="flex w-full cursor-pointer items-center justify-between px-5 py-4 transition hover:bg-gray-900"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">현재 체중</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">{weight ? `${weight}kg` : "설정 필요"}</span>
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setEdit('activity')}
            className="flex w-full cursor-pointer items-center justify-between border-t border-gray-800 px-5 py-4 transition hover:bg-gray-900"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">활동량</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${activity ? "text-white" : "text-red-400"}`}>{activityName}</span>
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </div>
          </button>
        </div>
      </div>

      {edit && (
        <div
          onClick={() => setEdit(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <GoalModalComponent
              type={edit}
              recentGoal={goal}
              recentWeight={weight}
              recentAtivity={activity}
              onClose={() => setEdit(null)}
            />
          </div>
        </div>
      )}
    </>
  )
}