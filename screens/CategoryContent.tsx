import { Button } from "@/components/basics/Button";
import { Header } from "@/components/basics/Header";
import { IconKey, IconRegistry } from "@/constants/icons";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useCategories } from "@/hooks/useCategories";
import { useLists } from "@/hooks/useLists";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native";

export function CategoryContent() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme])

    const { id } = useLocalSearchParams<{ id: string }>();

    const { data: categories } = useCategories();
    const { data: lists } = useLists();
    
    const category = categories?.find((c) => c.id === id);
    const included = lists?.filter((l) => l.categoryId === id) ?? [];

    if (!category) return null;

    const Icon = IconRegistry[category.icon as IconKey];

    return (
        <View style={styles.container}>
            <Header
                left={
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#555" />
                    </Pressable>
                }
                text={category.name}
                right={
                    <Pressable onPress={() => console.log('Icon pressed.')}>
                        <Icon size={24} color={theme.colors.icon} />
                    </Pressable>
                } 
            />
            <View style={styles.content}>
                {included?.map((list) => (
                    <Button
                        key={list.id}
                        text={list.title}
                        icon={<Ionicons name="chevron-forward" />}
                        onPress={() => router.push(`/list/${list.id}`)}
                    />
                ))}
            </View>
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
        content: {
            backgroundColor: t.colors.content,
            padding: 10,
            flex: 1
        }
    })
}