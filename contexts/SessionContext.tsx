import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { api, setUnauthorizedHandler } from "@/api/client";

type SessionContextType = {
    token: string | null;
    isLoading: boolean;
    signIn: (token: string) => Promise<void>,
    signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within SessionProvider');
  return context;
}

export function SessionProvider({ children }: { children: React.ReactNode}) {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        SecureStore.getItemAsync('token').then(async (stored) => {
            setToken(stored);
            if (stored) {
                try {
                    await api.get('/users/profile');
                } catch {
                    // 401 is handled by the response interceptor (signs out)
                }
            }
            setIsLoading(false);
        });
    }, []);

    const signIn = async (newToken: string) => {
        await SecureStore.setItemAsync('token', newToken);
        setToken(newToken);
    }

    const signOut = async () => {
        await SecureStore.deleteItemAsync('token');
        setToken(null);
    }

    useEffect(() => {
        setUnauthorizedHandler(signOut);
    }, []);

    return (
        <SessionContext.Provider value={{ token, isLoading, signIn, signOut}}>
            {children}
        </SessionContext.Provider>
    )
}