import { aiSearchResponseSchema } from "@/schemas/ai/aiSearch/aiSearchRes"



interface AiFood {
  name: string
  protein: number
  calorie: number
  unit: string
}

interface AiSearchResponse {
  description: string
  foods: AiFood[]
}

export function isValidAiSearchRes(data: unknown): data is AiSearchResponse {
      return aiSearchResponseSchema.safeParse(data).success

}