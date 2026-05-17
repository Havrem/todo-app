import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useDeleteList, useUpdateList } from "@/hooks/useLists";
import { ListSummary } from "@/schemas/list";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable, { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

const ACTION_WIDTH = 64;

type Props = {
    list: ListSummary,
    onPress: () => void,
    onLongPress?: () => void
}

export function SwipeableListRow({ list, onPress, onLongPress }: Props) {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const swipeableRef = useRef<SwipeableMethods>(null);

    const { mutate: deleteList } = useDeleteList();
    const { mutate: updateList } = useUpdateList(list.id);

    const close = () => swipeableRef.current?.close();

    const onDelete = () => {
        close();
        deleteList(list.id);
    };

    const onBookmark = () => {
        close();
        updateList({ bookmarked: !list.bookmarked });
    };

    const renderRightActions = () => (
        <View style={styles.actions}>
            <Pressable style={[styles.action, styles.bookmark]} onPress={onBookmark}>
                <Ionicons
                    name={list.bookmarked ? "bookmark" : "bookmark-outline"}
                    size={22}
                    color="white"
                />
            </Pressable>
            <Pressable style={[styles.action, styles.delete]} onPress={onDelete}>
                <Ionicons name="trash" size={22} color="white" />
            </Pressable>
        </View>
    );

    return (
        <ReanimatedSwipeable
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            rightThreshold={40}
            friction={2}
            activeOffsetX={[-5, 5]}
            containerStyle={{backgroundColor: theme.colors.accent, borderRadius: 5}}
        >
            <Pressable style={styles.row} onPress={onPress} onLongPress={onLongPress} unstable_pressDelay={200}>
                <Text style={styles.txt}>{list.title}</Text>
                <Ionicons name="chevron-forward" size={25} color={theme.colors.icon} />
            </Pressable>
        </ReanimatedSwipeable>
    );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        row: {
            backgroundColor: t.colors.accent,
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        txt: {
            fontFamily: t.font.family.button,
            fontSize: t.font.size.medium,
            color: t.colors.text,
        },
        actions: {
            flexDirection: 'row',
            height: '100%'
        },
        action: {
            width: ACTION_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
        },
        bookmark: {
            backgroundColor: t.colors.accentMedium,
        },
        delete: {
            backgroundColor: t.colors.delete,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
        },
    });
};
