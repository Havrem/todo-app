import { Theme, ThemeName, themes } from "@/constants/themes"
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

// Without typing the context we don't get access to what type of information is inside
type ThemeContextType = {
    theme: Theme,
    themeName: ThemeName,
    setTheme: (name: ThemeName) => Promise<void>;
}
;
const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}

export function ThemeProvider({ children } : { children: React.ReactNode }) {
    const [themeName, setThemeName] = useState<ThemeName>('default');

    useEffect(() => {
        SecureStore.getItemAsync('theme').then((saved) => {
            if (saved && saved in themes) setTheme(saved as ThemeName);
        });
    }, []);

    const setTheme = async (name: ThemeName) => {
        await SecureStore.setItemAsync('theme', name);
        setThemeName(name);
    };

    return (
        <ThemeContext.Provider value={{theme: themes[themeName], themeName, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
} 