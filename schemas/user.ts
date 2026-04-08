import z from "zod";

export const userSchema = z.object({
    email: z.email()
})

export type User = z.infer<typeof userSchema>;

export const changePasswordSchema = z.object({
    currentPassword: z.string().nonempty('Required'),
    newPassword: z.string().min(6, 'Must be at least 6 characters'),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;