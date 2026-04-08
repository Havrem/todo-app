import { Button } from "@/components/basics/Button";
import { Header } from "@/components/basics/Header";
import { Theme } from "@/constants/themes";
import { useSession } from "@/contexts/SessionContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useDeleteAccount, useUser } from "@/hooks/useUser";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

type Styles = ReturnType<typeof makeStyles>;

function EmailDisplay({ email, theme, styles }: { email: string; theme: Theme; styles: Styles }) {
    return (
        <Pressable style={styles.emailBtn} onPress={() => console.log('Email display pressed')}>
            <Text style={styles.emailTxt}>{email}</Text>
            <MaterialCommunityIcons name="email" size={20} color={theme.colors.icon} />
        </Pressable>
    );
}

export function Settings() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    const { signOut } = useSession();
    const { data: user } = useUser();

    if (!user) return null;

    return (
        <View style={styles.container}>
            <Header text="SETTINGS" />
            <View style={styles.content}>
                <EmailDisplay email={user.email} theme={theme} styles={styles} />
                <Button text="Change password" icon={<MaterialCommunityIcons name='pencil-circle' />} onPress={() => router.push('/change-password')} />
                <Button text="Switch theme" icon={<MaterialCommunityIcons name='palette' />} onPress={() => router.push('/switch-theme')} />
                <Button text="Delete account" icon={<MaterialCommunityIcons name='delete' />} onPress={() => router.push('/delete-account')} />
                <View style={{ marginTop: 'auto' }}>
                    <Button text="Logout" icon={<Ionicons name='log-out' />} onPress={() => signOut()} />
                </View>
            </View>
        </View>
    );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        container: {
            padding: 10,
            backgroundColor: t.colors.background,
            flex: 1
        },
        content: {
            padding: 15,
            paddingBottom: 25,
            backgroundColor: t.colors.content,
            gap: 10,
            flex: 1
        },
        emailBtn: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: 15,
            borderRadius: 10,
            borderColor: 'black',
            borderBottomWidth: 1
        },
        emailTxt: {
            fontFamily: t.font.family.body,
            fontSize: t.font.size.medium,
            color: t.colors.text,
        },
    })
}
