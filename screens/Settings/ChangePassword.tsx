import { Header } from "@/components/basics/Header";
import { UpdatePasswordForm } from "@/components/forms/UpdatePasswordForm";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

export function ChangePassword() {
    const { t } = useTranslation('changePassword');
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

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
            <UpdatePasswordForm/>
        </View>
    );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        container: {
            padding: 10,
            backgroundColor: t.colors.background,
            flex: 1
        }
    })
}
