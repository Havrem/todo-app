import { LoginData } from '@/schemas/auth';
import axios from 'axios';

export const loginUser = (credentials: LoginData) => axios.post('auth/login', credentials);

export const mockLoginUser = async (credentials: LoginData) => {
    if (credentials.email === 'Abc') return { success: true}
    throw new Error ('Invalid credentials');
};