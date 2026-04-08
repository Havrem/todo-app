import { LoginData, LoginResponse, RegisterData, RegisterResponse } from '@/schemas/auth';
import { api } from './client';

export const loginUser = (credentials: LoginData): Promise<LoginResponse> =>
    api.post<LoginResponse>('/auth/login', credentials).then((r) => r.data);

export const registerUser = (credentials: RegisterData): Promise<RegisterResponse> =>
    api.post<RegisterResponse>('/auth/register', credentials).then((r) => r.data);