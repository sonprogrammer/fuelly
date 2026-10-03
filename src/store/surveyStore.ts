import {  ActivityLevel, Gender, GoalLabel } from "@/types/goal";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



interface SurveyData {
  goal: GoalLabel | null
  gender: Gender | null
//   age: number | null
  birthDate: string
  height: number | null
  weight: number | null
  activity: ActivityLevel | null
}

interface SurveyStore {
  step: number
  survey: SurveyData
  setStep: (step: number) => void
  setSurveyValue: <K extends keyof SurveyData>(key: K, value: SurveyData[K]) => void
  resetSurvey: () => void
}

const initialSurvey: SurveyData = {
  goal: null,
  gender: null,
  birthDate: '',
  height: null,
  weight: null,
  activity: null
}

export const useSurveyStore = create<SurveyStore>()(
    persist(
        (set) => ({
            step: 0,
            survey: initialSurvey,
            setStep: (step) => set({step}),
            setSurveyValue: (key, value) => set(state => ({
                survey: {
                    ...state.survey,
                    [key]: value
                }
            })),
            resetSurvey: () => set({step: 0, survey: initialSurvey})
        }),
        {
            name: 'fuelly-survey',
            storage: createJSONStorage(() => localStorage)
        }
    )
)