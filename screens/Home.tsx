import { Header } from "@/components/basics/Header";
import { Bookmarked } from "@/components/home/Bookmarked";
import { Categories } from "@/components/home/Categories";
import { Theme, themes } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export function Home() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [themes])

    return (
        <View style={styles.container}>
            <Header text="HOME" />
            <Bookmarked />
            <Categories />
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