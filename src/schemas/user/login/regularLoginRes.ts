import { userResSchema } from '@/schemas/user/userInfo/userRes'
import { z} from 'zod'

export const regularLoginResSchema = z.object({
    success: z.literal(true),
    user: userResSchema,
    accessToken: z.string().min(1)
})