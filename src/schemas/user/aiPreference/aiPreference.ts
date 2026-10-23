
import { z} from 'zod'

export const AiPreferenceSchema = z.object({
    allergies: z.array(z.string()),
    dislikedFoods: z.array(z.string()),
    preferredFoods: z.array(z.string()),
    customRequest: z.string()
})

export const updateAiPreferenceReqSchema = AiPreferenceSchema.partial()