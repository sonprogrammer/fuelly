import { userResSchema } from '@/schemas/user/userInfo/userRes'
import { z} from 'zod'

export const registerResSchema = z.object({
    success: z.literal(true),
    message: z.string(),
    user: userResSchema
})