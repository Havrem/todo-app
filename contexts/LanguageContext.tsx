import i18n from "@/i18n";
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from "react";

type Language = 'en' | 'sv';

type LanguageContextType = {
    language: Language;
    setLanguage: (lng: Language) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>(i18n.language as Language);

    useEffect(() => {
        SecureStore.getItemAsync('language').then((saved) => {
            if (saved === 'en' || saved === 'sv') {
                i18n.changeLanguage(saved);
                setLanguageState(saved);
            }
        });
    }, []);

    const setLanguage = async (lng: Language) => {
        await SecureStore.setItemAsync('language', lng);
        await i18n.changeLanguage(lng);
        setLanguageState(lng);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
