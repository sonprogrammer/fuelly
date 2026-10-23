import { userResSchema } from '@/schemas/user/userInfo/userRes'
import { z} from 'zod'

export const userInfoResSchema = z.object({
    message: z.string(),
    user: userResSchema
})