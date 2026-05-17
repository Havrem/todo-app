import { EditableHeader } from "@/components/basics/EditableHeader";
import { SortableItems } from "@/components/cards/SortableItems";
import { ImportItemsSheet } from "@/components/sheets/ImportItemsSheet";
import { InviteSheet } from "@/components/sheets/InviteSheet";
import { ItemTypeSheet } from "@/components/sheets/ItemTypeSheet";
import { ListActionsSheet } from "@/components/sheets/ListActionsSheet";
import { ListTypeSheet } from "@/components/sheets/ListTypeSheet";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useCreateItem } from "@/hooks/useItems";
import { useImportItems, useList, useLists, useUpdateList } from "@/hooks/useLists";
import { useListRealtime } from "@/hooks/useListRealtime";
import { ItemType } from "@/schemas/list";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from "react-native";

export function ListEditor() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme])

    const { id } = useLocalSearchParams<{ id: string }>();
    const numericId = Number(id);
    const { data: list } = useList(numericId);
    const { data: lists } = useLists();
    const { mutate: updateList } = useUpdateList(numericId);
    const { mutate: importItems } = useImportItems(numericId);
    const { mutate: createItem } = useCreateItem(numericId);

    useListRealtime(numericId);

    const typeSheetRef = useRef<BottomSheetModal>(null);
    const importItemsSheetRef = useRef<BottomSheetModal>(null);
    const listTypeSheetRef = useRef<BottomSheetModal>(null);
    const inviteSheetRef = useRef<BottomSheetModal>(null);
    const actionsSheetRef = useRef<BottomSheetModal>(null);
    const [editMode, setEditMode] = useState(false);

    const onActionSelect = (key: 'import' | 'rearrange' | 'invite' | 'type') => {
        actionsSheetRef.current?.dismiss();
        if (key === 'import') importItemsSheetRef.current?.present();
        else if (key === 'rearrange') setEditMode(true);
        else if (key === 'invite') inviteSheetRef.current?.present();
        else listTypeSheetRef.current?.present();
    };

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
                    editMode
                        ? (
                            <Pressable onPress={() => setEditMode(false)}>
                                <MaterialCommunityIcons name="check" size={22} color={theme.colors.icon} />
                            </Pressable>
                        )
                        : (
                            <Pressable onPress={() => actionsSheetRef.current?.present()}>
                                <MaterialCommunityIcons name="dots-horizontal" size={22} color={theme.colors.icon} />
                            </Pressable>
                        )
                }
            />
            <View style={styles.paper}>
                <SortableItems items={list.items} listId={numericId} editMode={editMode} />
                {!editMode && (
                    <View style={styles.bottom}>
                        <Pressable
                            onPress={() => addItem(inheritedType)}
                            onLongPress={() => typeSheetRef.current?.present()}
                            style={styles.addBtn}
                        >
                            <Ionicons name="add-circle" size={32} color={theme.colors.icon}/>
                        </Pressable>
                    </View>
                )}
            </View>
            <ItemTypeSheet
                ref={typeSheetRef}
                onSelect={(type) => {
                    addItem(type);
                    typeSheetRef.current?.dismiss();
                }}
            />
            <InviteSheet ref={inviteSheetRef} listId={numericId} />
            <ImportItemsSheet
                ref={importItemsSheetRef}
                currentListId={numericId}
                lists={lists ?? []}
                onSelect={(sourceListId) => {
                    importItems({ sourceListId });
                    importItemsSheetRef.current?.dismiss();
                }}
            />
            <ListTypeSheet
                ref={listTypeSheetRef}
                selected={list.type}
                onSelect={(type) => {
                    updateList({ type });
                    listTypeSheetRef.current?.dismiss();
                }}
            />
            <ListActionsSheet ref={actionsSheetRef} onSelect={onActionSelect} />
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
    })
}
