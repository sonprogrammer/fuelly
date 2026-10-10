export interface GoalProps {
    goal?: string
    height?: number
    weight?: number
    activity?: string
}

export type EditType = 'height' | 'weight' | 'goal' | 'activity'

export interface GoalEditBtnProps {
    edit: () => void
    value: string

}

export interface ModalProps {
    type: 'height' | 'weight' | 'goal' | 'activity' | null
    onClose: () => void
    recentGoal?: string
    recentHeight?: number
    recentWeight?: number
    recentAtivity?: string
}

export interface EditModalProps {
  onClose: () => void
  recentGoal?: string
  recentHeight?: number
  recentWeight?: number
  recentActivity?: string
}