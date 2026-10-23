import { z} from 'zod'

export const jwtPayloadSchema = z.object({
    objectId: z.string().length(24)
})