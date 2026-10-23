import { userResSchema } from "@/schemas/user/userInfo/userRes";
import z from "zod";

export const getUserResSchema = z.object({
    user: userResSchema
})