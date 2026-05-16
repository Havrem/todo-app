import z from "zod";

export const userSchema = z.object({
    id: z.number(),
    email: z.email(),
});

export type User = z.infer<typeof userSchema>;

export const changePasswordSchema = z.object({
    currentPassword: z.string().nonempty('Required'),
    newPassword: z.string().min(8, 'Must be at least 8 characters'),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
