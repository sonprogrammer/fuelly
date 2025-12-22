import {ActivityLevel } from '@/types/user'

export interface AiRecommendFood{
    user:{
        gender: 'male' | 'female'
        age: number
        height: number
        weight: number
        goal: 'diet' | 'maintain' | 'bulk'
        activity: ActivityLevel
    },
    remain:{
        calorie: number
        protein: number
    }
}

export interface AiRecommendResult{
    meals: {
        name: string
        calorie: number
        protein: number
        amount: string
        reason: string
    }[]
}

export interface AiRecommendResultFood{
        name: string
        calorie: number
        protein: number
        amount: string
        reason?: string
}

export interface CreateFoodFromAi {
    name: string
    calorie: number
    protein: number
    unit: string
  }