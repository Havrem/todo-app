import { Header } from "@/components/basics/Header";
import { EditCategoryForm } from "@/components/forms/EditCategoryForm";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useCategories } from "@/hooks/useCategories";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

export function EditCategory() {
    const { t } = useTranslation('editCategory');
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const { id } = useLocalSearchParams<{ id: string }>();
    const numericId = Number(id);

    const { data: categories } = useCategories();
    const category = categories?.find((c) => c.id === numericId);

    if (!category) return null;

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
            <EditCategoryForm category={category}/>
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
