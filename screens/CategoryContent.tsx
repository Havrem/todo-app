import { Header } from "@/components/basics/Header";
import { SortableLists } from "@/components/cards/SortableLists";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useCategories } from "@/hooks/useCategories";
import { useCreateList, useLists } from "@/hooks/useLists";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export function CategoryContent() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme])

    const { id } = useLocalSearchParams<{ id: string }>();
    const numericId = Number(id);

    const { data: categories } = useCategories();
    const { data: lists } = useLists();
    const { mutate: createList } = useCreateList();

    const category = categories?.find((c) => c.id === numericId);
    const included = lists?.filter((l) => l.category.id === numericId) ?? [];

    if (!category) return null;

    return (
        <View style={styles.container}>
            <Header
                left={
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#555" />
                    </Pressable>
                }
                text={category.name}
                right={<FontAwesome name="edit" size={22} color={theme.colors.icon} />}
                onRightPress={() => router.push(`/category/${category.id}/edit`)}
            />
            <View style={styles.content}>
                <SortableLists lists={included} />
                <View style={styles.bottom}>
                    <Pressable onPress={() => createList({title: 'New List...', category: category.id})} style={styles.addBtn}>
                        <Ionicons name="add-circle" size={32} color={theme.colors.icon}/>
                    </Pressable>
                </View>
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
            flex: 1,
            gap: 10,
        },
        bottom: {
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: 0,
        },
        addBtn: {
            backgroundColor: t.colors.accent,
            padding: 10,
            borderRadius: 40
        }
    })
}
