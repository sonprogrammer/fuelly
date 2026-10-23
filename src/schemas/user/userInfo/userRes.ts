import { z} from 'zod'

const policyAgreementResSchema = z.object({
    version: z.string().optional(),
    agreed: z.boolean(),
    agreeeAt: z.iso.datetime().nullable().optional()
})

const userPolicyResSchema = z.object({
    terms: policyAgreementResSchema.optional(),
    privacy: policyAgreementResSchema.optional(),
    serviceImprovement: policyAgreementResSchema.optional()

})

const aiPreferenceResSchema = z.object({
    allergies: z.array(z.string()),
    dislikedFoods: z.array(z.string()),
    preferredFoods: z.array(z.string()),
    customRequest: z.string()
})

export const userResSchema = z.object({
    _id: z.hex().length(24),
    nickName: z.string().optional(),
    kakaoId: z.string().optional(),
    name: z.string().optional(),
    height: z.number().optional(),
    weight: z.number().optional(),
    age: z.number().optional(),
    birthDate: z.iso.datetime().nullable().optional(),
    gender: z.enum(['male', 'female']).optional(),
    activity: z.enum(['sedentary', 'light', 'moderate', 'active']).optional(),
    goal: z.enum(['bulk', 'diet', 'maintain']).optional(),
    aiPreference: aiPreferenceResSchema.optional(),
    policy: userPolicyResSchema.optional(),
    createdAt: z.iso.datetime()
})