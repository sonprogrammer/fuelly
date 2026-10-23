import { userResSchema } from '@/schemas/user/userInfo/userRes'
import { z} from 'zod'

export const updateUserInfoResSchema = z.object({
    message: z.string(),
    userUpdated: userResSchema
})