import { Button } from "@/components/basics/Button";
import { Header } from "@/components/basics/Header";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useDeleteAccount } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export function DeleteAccount() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    const { mutate: deleteAccount } = useDeleteAccount();

    return (
        <View style={styles.container}>
            <Header
                text="DELETE ACCOUNT"
                left={
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#555" />
                    </Pressable>
                }
            />
            <View style={styles.top}/>
            <View style={styles.bottom}>
                <Button text="Cancel" onPress={() => router.back()}/>
                <Button text="Delete" backgroundColor={theme.colors.delete} onPress={() => deleteAccount()}/>
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
            marginBottom: 10
        },
        bottom: {
            padding: 10,
            backgroundColor: t.colors.content,
            gap: 10
        }
    })
}
