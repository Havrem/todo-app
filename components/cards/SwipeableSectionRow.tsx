import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useDeleteListSection, useUpdateListSection } from "@/hooks/useListSections";
import { ListSection } from "@/schemas/list";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ReanimatedSwipeable, { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

const ACTION_WIDTH = 64;

type Props = {
    section: ListSection;
    listId: number;
    onLongPress?: () => void;
    editMode: boolean;
};

export function SwipeableSectionRow({ section, listId, onLongPress, editMode }: Props) {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const swipeableRef = useRef<SwipeableMethods>(null);
    const { mutate: deleteSection } = useDeleteListSection(listId);
    const { mutate: updateSection } = useUpdateListSection(listId);

    const [text, setText] = useState(section.text);
    const lastSavedRef = useRef(section.text);

    useEffect(() => {
        if (text === lastSavedRef.current) {
            setText(section.text);
            lastSavedRef.current = section.text;
        }
    }, [section.text]);

    const commitText = () => {
        if (text === lastSavedRef.current) return;
        lastSavedRef.current = text;
        updateSection({ id: section.id, input: { text } });
    };

    const onDelete = () => {
        swipeableRef.current?.close();
        deleteSection(section.id);
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
                {/* <Ionicons name="folder-open-outline" size={20} color={theme.colors.accentStrong} /> */}
                <Text style={styles.txt}>{section.text || ' '}</Text>
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
            containerStyle={{ backgroundColor: theme.colors.accentMedium, borderRadius: 5 }}
        >
            <Pressable style={styles.row} onLongPress={onLongPress} unstable_pressDelay={200}>
                {/* <Ionicons name="folder-open-outline" size={20} color={theme.colors.accentStrong} /> */}
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

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        row: {
            backgroundColor: t.colors.content,
            borderColor: "#000000",
            borderBottomWidth: 1,
            borderStyle: 'solid',
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        txt: {
            fontFamily: t.font.family.button,
            fontSize: t.font.size.medium,
            color: t.colors.text,
            flex: 1,
            paddingVertical: 0,
        },
        dragSlot: {
            width: 22,
            height: 22,
            alignItems: 'center',
            justifyContent: 'center',
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
