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