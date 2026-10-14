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
  if (!data || typeof data !== 'object') return false

  const result = data as Partial<AiSearchResponse>

  if (typeof result.description !== 'string') return false
  if (!Array.isArray(result.foods) || result.foods.length !== 3) return false

  return result.foods.every(food =>
    typeof food.name === 'string' &&
    typeof food.protein === 'number' &&
    typeof food.calorie === 'number' &&
    typeof food.unit === 'string'
  )
}