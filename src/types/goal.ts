export type GoalLabel = 'bulk' | 'diet' | 'maintain'
export type Gender = "male" | "female"
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active"

export interface Goal {
    name: string
    description: string
    label: GoalLabel
}

export interface Activity {
    name: string
    description: string
    label: ActivityLevel
}