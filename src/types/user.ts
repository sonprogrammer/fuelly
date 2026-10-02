import { ActivityLevel, Gender, GoalLabel } from "@/types/goal"

export interface User {
    height?: number
    weight?: number
    gender?: Gender
    activity?: ActivityLevel
    goal?: GoalLabel
    age?: number
    birthDate?: string
}

export type FixedUser = {
    height: number
    weight: number
    age?: number
    birthDate: string
    gender: Gender
    activity: ActivityLevel
    goal: GoalLabel
  }