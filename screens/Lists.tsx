import { Title } from "@/components/basics/ActiveTitle";
import { Button } from "@/components/basics/Button";
import { Header } from "@/components/basics/Header";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useCategories } from "@/hooks/useCategories";
import { useCreateList, useLists } from "@/hooks/useLists";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

export function Lists() {
    const { t } = useTranslation('lists');
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    const { data: lists } = useLists();
    const { data: categories } = useCategories();
    const { mutate: createList } = useCreateList();

    const [ search, setSearch ] = useState('');

    const matches = (title: string) => title.toLocaleLowerCase().includes(search.toLowerCase());

    return (
        <ScrollView style={styles.container} automaticallyAdjustKeyboardInsets>
            <View style={styles.content}>
                <Header text={t('title')} />

                <View style={styles.section}>
                    <View style={styles.searchbar}>
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder={t('searchPlaceholder')}
                            style={{ flex: 1}}
                        />
                        <Ionicons name="search" size={20} color={theme.colors.text}/>
                    </View>
                </View>

                {categories?.map((category) => {
                    const inCategory = lists?.filter((l) => l.categoryId === category.id && matches(l.title)) ?? [];

                    if (search && inCategory.length === 0) return null;

                    return (
                        <View key={category.id} style={styles.section}>
                            <Title
                                text={category.name}
                                icon={<Ionicons name="add-circle" />}
                                onPress={() => createList({ title: t('newListTitle'), categoryId: category.id })}
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
            </View>
        </ScrollView>
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
            flex: 1,
            gap: 0
        },
        section: {
            backgroundColor: t.colors.content,
            padding: 15,
            paddingVertical: 20,
            gap: 10,
            marginBottom: 10
        },
        searchbar: {
            backgroundColor: t.colors.accent,
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    })
}