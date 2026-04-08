import axios from "axios";
import * as SecureStore from 'expo-secure-store';

// Creates an axios instance with these settings.
// Phone and Mac must be on the same Wi-Fi network.
// If your Mac's LAN IP changes, update this value.
export const api = axios.create({
    baseURL: 'http://192.168.50.175:3001',
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

// Lets SessionContext register a handler that runs when any request returns 401.
let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
    onUnauthorized = handler;
};

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            onUnauthorized?.();
        }
        return Promise.reject(error);
    }
);