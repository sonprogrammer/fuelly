import { EditType } from './types'

interface GoalEditItemsParams {
  height?: number
  weight?: number
  activity?: string
}

interface GoalEditItem {
  key: EditType
  value: string
}

export const activityMap: Record<string, string> = {
  sedentary: "거의 운동 안함",
  light: "주 1~2회 운동",
  moderate: "주 3~5회 운동",
  active: "주 6회 이상 운동"
}

export const goalMap: Record<string, string> = {
  bulk: "근육 증가",
  diet: "체지방 감소",
  maintain: "현재 상태 유지"
}


export const getGoalEditItems = ({ height, weight, activity }: GoalEditItemsParams): GoalEditItem[] => [
  {
    key: 'height',
    value: height ? `${height}cm` : '설정 필요'
  },
  {
    key: 'weight',
    value: weight ? `${weight}kg` : '설정 필요'
  },
  {
    key: 'activity',
    value: activity ? activityMap[activity] || activity : '설정 필요'
  }
]