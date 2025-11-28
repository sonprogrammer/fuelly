type GoalLabel = 'bulk' | 'diet' | 'maintain'

interface Goal{
    name: string;
    label: GoalLabel
}

export const goals:Goal[] = [
    { name: '벌그업(근육 증가)', label: 'bulk' },
    { name: '다이어트(체지방 감소)', label: 'diet' },
    { name: '유지', label: 'maintain' }
]