import axios from "axios";
import * as SecureStore from 'expo-secure-store';

// Creates an axios instance with these settings
export const api = axios.create({
    baseURL: 'http://localhost/api',
    headers: {'Content-Type':'application/json'},
});

// Attaches a function that runs before each request
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})