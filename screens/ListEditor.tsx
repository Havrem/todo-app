import { EditableHeader } from "@/components/basics/EditableHeader";
import { SortableItems } from "@/components/cards/SortableItems";
import { ItemTypeSheet } from "@/components/sheets/ItemTypeSheet";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useCreateItem } from "@/hooks/useItems";
import { useList, useUpdateList } from "@/hooks/useLists";
import { ItemType } from "@/schemas/list";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from "react-native";

export function ListEditor() {
    const { t } = useTranslation('common');
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme])

    const { id } = useLocalSearchParams<{ id: string }>();
    const numericId = Number(id);
    const { data: list } = useList(numericId);
    const { mutate: updateList } = useUpdateList(numericId);
    const { mutate: createItem } = useCreateItem(numericId);

    const sheetRef = useRef<BottomSheetModal>(null);
    const [editMode, setEditMode] = useState(false);

    if (!list) return null;

    const inheritedType: ItemType = list.items[list.items.length - 1]?.type ?? 'NONE';

    const addItem = (type: ItemType) =>
        createItem({ text: 'New Item', completed: false, type });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <EditableHeader
                title={list.title}
                onSave={(title) => updateList({ title })}
                left={
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#555" />
                    </Pressable>
                }
                right={
                    <Pressable onPress={() => setEditMode((v) => !v)}>
                        {editMode ? <MaterialCommunityIcons name="check" size={22} color={theme.colors.icon} /> : <MaterialCommunityIcons name="arrange-bring-forward" size={22} color={theme.colors.icon} />}
                    </Pressable>
                }
            />
            <View style={styles.paper}>
                <SortableItems items={list.items} listId={numericId} editMode={editMode} />
                {!editMode && (
                    <View style={styles.bottom}>
                        <Pressable
                            onPress={() => addItem(inheritedType)}
                            onLongPress={() => sheetRef.current?.present()}
                            style={styles.addBtn}
                        >
                            <Ionicons name="add-circle" size={32} color={theme.colors.icon}/>
                        </Pressable>
                    </View>
                )}
            </View>
            <ItemTypeSheet
                ref={sheetRef}
                onSelect={(type) => {
                    addItem(type);
                    sheetRef.current?.dismiss();
                }}
            />
        </KeyboardAvoidingView>
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
            borderRadius: 40,
        },
        toggle: {
            fontFamily: t.font.family.button,
            fontSize: 15,
            color: '#555',
        },
    })
}
