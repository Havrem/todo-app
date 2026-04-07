import z from "zod";

export const userSchema = z.object({
    email: z.email()
})

export type User = z.infer<typeof userSchema>;