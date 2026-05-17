import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useDeleteItem, useUpdateItem } from "@/hooks/useItems";
import { ListItem } from "@/schemas/list";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ReanimatedSwipeable, { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

const ACTION_WIDTH = 64;
const MARKER_WIDTH = 28;

type Props = {
    item: ListItem;
    index: number;
    listId: number;
    onLongPress?: () => void;
    editMode: boolean;
};

export function SwipeableItemRow({ item, index, listId, onLongPress, editMode }: Props) {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const swipeableRef = useRef<SwipeableMethods>(null);
    const { mutate: deleteItem } = useDeleteItem(listId);
    const { mutate: updateItem } = useUpdateItem(listId);

    const [text, setText] = useState(item.text);
    const lastSavedRef = useRef(item.text);

    useEffect(() => {
        if (text === lastSavedRef.current) {
            setText(item.text);
            lastSavedRef.current = item.text;
        }
    }, [item.text]);

    const commitText = () => {
        if (text === lastSavedRef.current) return;
        lastSavedRef.current = text;
        updateItem({ id: item.id, input: { text } });
    };

    const close = () => swipeableRef.current?.close();

    const onDelete = () => {
        close();
        deleteItem(item.id);
    };

    const toggleCompleted = () => {
        updateItem({ id: item.id, input: { completed: !item.completed } });
    };

    const renderRightActions = () => (
        <View style={styles.actions}>
            <Pressable style={styles.delete} onPress={onDelete}>
                <Ionicons name="trash" size={22} color="white" />
            </Pressable>
        </View>
    );

    if (editMode) {
        return (
            <Pressable style={styles.row} onLongPress={onLongPress}>
                <View style={styles.marker}>{renderMarker(item, index, theme, toggleCompleted, true)}</View>
                <Text style={styles.txt}>{item.text || ' '}</Text>
                <View style={styles.dragSlot}>
                    <Ionicons name="reorder-three-outline" size={20} color={theme.colors.subtle} />
                </View>
            </Pressable>
        );
    }

    return (
        <ReanimatedSwipeable
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            rightThreshold={40}
            friction={2}
            activeOffsetX={[-5, 5]}
            containerStyle={{ backgroundColor: theme.colors.accent, borderRadius: 5 }}
        >
            <Pressable
                style={styles.row}
                onLongPress={onLongPress}
                unstable_pressDelay={200}
            >
                <View style={styles.marker}>{renderMarker(item, index, theme, toggleCompleted, false)}</View>
                <TextInput
                    style={styles.txt}
                    value={text}
                    onChangeText={setText}
                    onBlur={commitText}
                    onSubmitEditing={commitText}
                    returnKeyType="default"
                    multiline
                    submitBehavior="blurAndSubmit"
                    scrollEnabled={false}
                />
                <View style={styles.dragSlot} />
            </Pressable>
        </ReanimatedSwipeable>
    );
}

function renderMarker(item: ListItem, index: number, theme: Theme, onToggle: () => void, editMode: boolean) {
    switch (item.type) {
        case 'BULLET':
            return (
                <View
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: 6,
                        backgroundColor: theme.colors.accentStrong,
                    }}
                />
            );
        case 'CHECKED': {
            const icon = (
                <MaterialCommunityIcons
                    name={item.completed ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                    size={22}
                    color={theme.colors.accentStrong}
                />
            );
            return editMode ? icon : (
                <Pressable onPress={onToggle} hitSlop={10}>{icon}</Pressable>
            );
        }
        case 'NUMBERED':
            return (
                <Text
                    style={{
                        fontFamily: theme.font.family.button,
                        fontSize: theme.font.size.medium,
                        color: theme.colors.accentStrong,
                    }}
                >
                    {index + 1}.
                </Text>
            );
        case 'NONE':
            return null;
    }
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        row: {
            backgroundColor: t.colors.accent,
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        marker: {
            width: MARKER_WIDTH,
            alignItems: 'center',
        },
        dragSlot: {
            width: 22,
            height: 22,
            alignItems: 'center',
            justifyContent: 'center',
        },
        txt: {
            fontFamily: t.font.family.body,
            fontSize: t.font.size.medium,
            color: t.colors.text,
            flex: 1,
            paddingVertical: 0,
        },
        actions: {
            flexDirection: 'row',
            height: '100%',
        },
        delete: {
            width: ACTION_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: t.colors.delete,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
        },
    });
};
