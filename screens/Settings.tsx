import { Button } from "@/components/basics/Button";
import { Header } from "@/components/basics/Header";
import { Theme, themes } from "@/constants/themes";
import { useSession } from "@/contexts/SessionContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export function Settings() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [themes])
    const { signOut } = useSession();

    return (
        <View style={styles.container}>
            <Header text="SETTINGS" />
            <View style={styles.content}>
                <Button text="Change password" icon={<MaterialCommunityIcons name='pencil-circle'/>} onPress={() => console.log('Pressed change password')}/>
                <Button text="Delete account" icon={<MaterialCommunityIcons name='delete'/>} onPress={() => console.log('Pressed delete account')}/>
                <View style={{marginTop: 'auto'}}>
                    <Button text="Logout" icon={<Ionicons name='log-out'/>} onPress={() => signOut()}/>
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
            backgroundColor: t.colors.content,
            gap: 10,
            flex: 1
        }
    })
}