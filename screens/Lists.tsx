import { Title } from "@/components/basics/ActiveTitle";
import { Button } from "@/components/basics/Button";
import { Header } from "@/components/basics/Header";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useCategories } from "@/hooks/useCategories";
import { useLists } from "@/hooks/useLists";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export function Lists() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    const { data: lists } = useLists();
    const { data: categories } = useCategories();

    return (
        <View style={styles.container}>
            {/* <Header text="LISTS" /> */}
            <ScrollView contentContainerStyle={styles.content}>
                <Header text="LISTS" />
                {categories?.map((category) => {
                    const inCategory = lists?.filter((l) => l.categoryId === category.id) ?? [];

                    return (
                        <View key={category.id} style={styles.section}>
                            <Title
                                text={category.name}
                                icon={<Ionicons name="add-circle" />}
                                onPress={() => console.log('Pressed group icon.')}
                            />
                            {inCategory.map((list) => (
                                <Button
                                    key={list.id}
                                    text={list.title}
                                    icon={<Ionicons name="chevron-forward" />}
                                    onPress={() => router.push(`/list/${list.id}`)}
                                />
                            ))}
                        </View>
                    );
                })}
            </ScrollView>
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
        content: {
            // backgroundColor: t.colors.content,
            // padding: 10,
            // paddingVertical: 15,
            flex: 1,
            gap: 0
        },
        section: {
            backgroundColor: t.colors.content,
            padding: 15,
            paddingVertical: 20,
            gap: 10,
            marginBottom: 10
        }
    })
}