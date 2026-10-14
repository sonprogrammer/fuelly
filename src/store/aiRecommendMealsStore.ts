import { AiRecommendResult } from "@/types/ai";
import { create } from "zustand";

interface AiMealsStore{
    recommendation: AiRecommendResult | null
    setRecommendation: (recommendation: AiRecommendResult) => void
    clearRecommendation: () => void
}

export const useAiRecommendStore = create<AiMealsStore>(set => ({
    recommendation: null,
    setRecommendation: recommendation => set({recommendation}),
    clearRecommendation: () => set({recommendation: null})
}))