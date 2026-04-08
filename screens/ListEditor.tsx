import { Header } from "@/components/basics/Header";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useList } from "@/hooks/useLists";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native";

export function ListEditor() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme])

    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: list } = useList(id);

    if (!list) return null;

    return (
        <View style={styles.container}>
            <Header
                left={
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#555" />
                    </Pressable>
                }
                text={list.title} 
            />
            <View style={styles.paper}/>
        </View>
    )
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        container: {
            padding: 10,
            backgroundColor: t.colors.background,
            flex: 1,
        },
        paper: {
            backgroundColor: t.colors.content,
            flex: 1
        }
    })
}