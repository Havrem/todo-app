import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { router } from "expo-router";
import { api, setTokenRefreshedHandler, setUnauthorizedHandler } from "@/api/client";
import { logoutUser } from "@/api/auth";

const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

type SessionContextType = {
    token: string | null;
    isLoading: boolean;
    signIn: (accessToken: string, refreshToken: string) => Promise<void>,
    signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within SessionProvider');
  return context;
}

export function SessionProvider({ children }: { children: React.ReactNode}) {
    const { t } = useTranslation('errors');
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        SecureStore.getItemAsync(ACCESS_TOKEN_KEY).then(async (stored) => {
            setToken(stored);
            if (stored) {
                try {
                    await api.get('/users/me');
                } catch {
                    // 401 is handled by the response interceptor (refresh-then-signout)
                }
            }
            setIsLoading(false);
        });
    }, []);

    const signIn = async (accessToken: string, refreshToken: string) => {
        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
        setToken(accessToken);
    }

    const clearSession = async () => {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        setToken(null);
        router.replace('/start');
    }

    const signOut = async () => {
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        if (refreshToken) {
            try {
                await logoutUser(refreshToken);
            } catch {
                // best-effort; clear local state regardless
            }
        }
        await clearSession();
    }

    useEffect(() => {
        setUnauthorizedHandler(async () => {
            await clearSession();
            Toast.show({
                type: 'error',
                text1: t('sessionExpired.title'),
                text2: t('sessionExpired.body'),
                position: 'bottom',
            });
        });

        setTokenRefreshedHandler((accessToken) => {
            setToken(accessToken);
        });
    }, []);

    return (
        <SessionContext.Provider value={{ token, isLoading, signIn, signOut}}>
            {children}
        </SessionContext.Provider>
    )
}
