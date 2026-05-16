import { EditableHeader } from "@/components/basics/EditableHeader";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useList, useUpdateList } from "@/hooks/useLists";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export function ListEditor() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme])

    const { id } = useLocalSearchParams<{ id: string }>();
    const numericId = Number(id);
    const { data: list } = useList(numericId);
    const { mutate: updateList } = useUpdateList(numericId);

    if (!list) return null;

    return (
        <View style={styles.container}>
            <EditableHeader
                title={list.title}
                onSave={(title) => updateList({ title })}
                left={
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#555" />
                    </Pressable>
                }
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
