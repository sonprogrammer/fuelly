type Gender = 'male' | 'female'
export type ActivityLevel =  'sedentary' | 'light' | 'moderate' | 'active'
type GoalLabel = 'bulk' | 'diet' | 'maintain'

export interface User {
    height?: number
    weight?: number
    gender?: Gender
    activity?: ActivityLevel
    goal?: GoalLabel
    age?: number
}

export type FixedUser = {
    height: number
    weight: number
    age: number
    gender: Gender
    activity: ActivityLevel
    goal: GoalLabel
  }