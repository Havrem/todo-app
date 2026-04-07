import { LoginData, LoginResponse } from '@/schemas/auth';
import { api } from './client';

export const loginUser = (credentials: LoginData): Promise<LoginResponse> => api.post<LoginResponse>('/auth/login', credentials).then((r) => r.data);