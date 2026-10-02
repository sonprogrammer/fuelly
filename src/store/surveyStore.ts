import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GoalLabel = "bulk" | "diet" | "maintain"
export type Gender = "male" | "female"
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active"

interface SurveyData {
  goal: GoalLabel | null
  gender: Gender | null
  age: number | null
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
  age: null,
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