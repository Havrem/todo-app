import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().nonempty('Required'),
    password: z.string().nonempty('Required'),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Must be at least 6 characters')
});

export type RegisterData = z.infer<typeof registerSchema>;

export const loginResponse = z.object({
    token: z.string()
});

export type LoginResponse = z.infer<typeof loginResponse>;

export const registerResponse = z.object({
    token: z.string()
});

export type RegisterResponse = z.infer<typeof registerResponse>;

export const updatePasswordSchema = z.object({
    currentPassword: z.string().nonempty('Required'),
    newPassword: z.string().min(6, 'Must be at least 6 characters'),
    confirmPassword: z.string().nonempty('Required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type UpdatePassword = z.infer<typeof updatePasswordSchema>;