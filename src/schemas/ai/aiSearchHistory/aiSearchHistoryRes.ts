import { aiSearchResponseSchema } from "@/schemas/ai/aiSearch/aiSearchRes";
import z from "zod";

export const aiSearchHistoryResSchema = z.object({
    _id: z.hex().length(24),
    userId: z.hex().length(24),
    prompt: z.string(),
    answer: aiSearchResponseSchema,
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime()
})

export const getAiSearchHistoryResSchema = z.object({
    message: z.string(),
    histories: z.array(aiSearchHistoryResSchema)
})