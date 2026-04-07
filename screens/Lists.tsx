import { Header } from "@/components/basics/Header";
import { Theme, themes } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export function Lists() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [themes])

    return (
        <View style={styles.container}>
            <Header text="LISTS" />
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
    })
}