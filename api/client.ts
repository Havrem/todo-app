import axios, { AxiosRequestConfig } from "axios";
import { Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { refreshAccessToken } from "./auth";

const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Android emulator reaches the host via 10.0.2.2; iOS simulator uses localhost.
// Physical device: replace with the Mac's LAN IP (same Wi-Fi).
const API_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const api = axios.create({
    baseURL: `http://${API_HOST}:8080`,
    headers: {'Content-Type':'application/json'},
});

// Attaches a function that runs before each request
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

// Lets SessionContext register a handler that runs when refresh fails (user must re-login).
let onUnauthorized: (() => void) | null = null;
let onTokenRefreshed: ((accessToken: string) => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
    onUnauthorized = handler;
};

export const setTokenRefreshedHandler = (handler: (accessToken: string) => void) => {
    onTokenRefreshed = handler;
};

// Single-flight: if a refresh is in flight, all callers share the same promise.
let refreshPromise: Promise<string> | null = null;

async function refreshSession(): Promise<string> {
    if (refreshPromise) return refreshPromise;

    refreshPromise = (async () => {
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        if (!refreshToken) throw new Error('No refresh token');
        const response = await refreshAccessToken(refreshToken);
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, response.accessToken);
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, response.refreshToken);
        onTokenRefreshed?.(response.accessToken);
        return response.accessToken;
    })().finally(() => {
        refreshPromise = null;
    });

    return refreshPromise;
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config as AxiosRequestConfig & { _retry?: boolean };
        const status = error.response?.status;

        if (status !== 401 || !original || original._retry) {
            return Promise.reject(error);
        }

        original._retry = true;

        try {
            const newAccessToken = await refreshSession();
            original.headers = { ...original.headers, Authorization: `Bearer ${newAccessToken}` };
            return api(original);
        } catch {
            onUnauthorized?.();
            return Promise.reject(error);
        }
    }
);
