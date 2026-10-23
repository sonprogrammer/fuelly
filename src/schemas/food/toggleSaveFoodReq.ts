import { z} from 'zod'

export const toggleSaveReqSchema = z.object({
    foodId: z.hex().length(24)
})