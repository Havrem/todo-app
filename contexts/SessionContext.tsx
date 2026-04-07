import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

type SessionContextType = {
    session: string | null;
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
    const [session, setSession] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        SecureStore.getItemAsync('token').then((token) => {
            setSession(token);
            setIsLoading(false);
        });
    }, []);

    const signIn = async (token: string) => {
        await SecureStore.setItemAsync('token', token);
        setSession(token);
    }

    const signOut = async () => {
        await SecureStore.deleteItemAsync('token');
        setSession(null);
    }

    return (
        <SessionContext.Provider value={{ session, isLoading, signIn, signOut}}>
            {children}
        </SessionContext.Provider>
    )
}