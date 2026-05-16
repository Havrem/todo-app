import { AuthResponse, LoginData, RegisterData } from '@/schemas/auth';
import { api } from './client';

export const loginUser = (credentials: LoginData): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/login', credentials).then((r) => r.data);

export const registerUser = (credentials: RegisterData): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/signup', credentials).then((r) => r.data);
