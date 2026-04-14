import { Button } from "@/components/basics/Button";
import { Header } from "@/components/basics/Header";
import { Theme } from "@/constants/themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { resources } from "@/i18n";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

type Language = keyof typeof resources;

const languageNames: Record<Language, string> = {
    en: 'English',
    sv: 'Svenska',
};

export function SwitchLanguage() {
    const { t } = useTranslation(['switchLanguage', 'common']);
    const { theme } = useTheme();
    const { setLanguage } = useLanguage();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const handleSelect = async (lng: Language) => {
        await setLanguage(lng);
        router.back();
    };

    return (
        <View style={styles.container}>
            <Header
                text={t('title')}
                left={
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#555" />
                    </Pressable>
                }
            />
            <View style={styles.top}>
                {(Object.keys(resources) as Language[]).map((lng) => (
                    <Button
                        key={lng}
                        text={languageNames[lng]}
                        onPress={() => handleSelect(lng)}
                    />
                ))}
            </View>
        </View>
    );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        container: {
            padding: 10,
            backgroundColor: t.colors.background,
            flex: 1,
        },
        top: {
            padding: 10,
            backgroundColor: t.colors.content,
            flex: 1,
            marginBottom: 10,
            gap: 10
        },
        bottom: {
            padding: 10,
            backgroundColor: t.colors.content,
            gap: 10
        },
        swatchRow: {
            flexDirection: 'row',
            gap: 15,
            padding: 10,
        },
        swatch: {
            width: 60,
            height: 60,
            borderRadius: 8,
            margin: 5
        },
        swatchSelected: {
            borderBottomWidth: 3,
            borderColor: 'white'
        }
    })
}
