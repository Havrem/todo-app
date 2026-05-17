import axios from 'axios';
import { AuthResponse, LoginData, RegisterData } from '@/schemas/auth';
import { api } from './client';

export const loginUser = (credentials: LoginData): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/login', credentials).then((r) => r.data);

export const registerUser = (credentials: RegisterData): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/signup', credentials).then((r) => r.data);

// Uses bare axios (no interceptors) so it doesn't recurse through the 401 refresh logic.
export const refreshAccessToken = (refreshToken: string): Promise<AuthResponse> =>
    axios.post<AuthResponse>(
        `${api.defaults.baseURL}/auth/refresh`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
    ).then((r) => r.data);

export const logoutUser = (refreshToken: string): Promise<void> =>
    axios.post(
        `${api.defaults.baseURL}/auth/logout`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
    ).then(() => undefined);
