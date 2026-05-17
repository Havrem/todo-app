import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { ListSummary, ListType } from "@/schemas/list";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const ICONS: Record<ListType, keyof typeof MaterialCommunityIcons.glyphMap> = {
    GENERAL: 'format-list-text',
    GROCERY: 'cart-outline',
    RECIPES: 'book-open-page-variant',
};

type Props = {
    lists: ListSummary[];
    currentListId: number;
    onSelect: (sourceListId: number) => void;
};

export const ImportItemsSheet = forwardRef<BottomSheetModal, Props>(({ lists, currentListId, onSelect }, ref) => {
    const { t } = useTranslation('listEditor');
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    const candidates = lists.filter((list) => list.id !== currentListId);

    return (
        <BottomSheetModal
            ref={ref}
            enableDynamicSizing
            backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
            )}
        >
            <BottomSheetView style={styles.content}>
                {candidates.length === 0 ? (
                    <Text style={styles.empty}>{t('imports.empty')}</Text>
                ) : (
                    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                        {candidates.map((list) => (
                            <Pressable
                                key={list.id}
                                style={styles.row}
                                onPress={() => onSelect(list.id)}
                            >
                                <View style={styles.marker}>
                                    <MaterialCommunityIcons name={ICONS[list.type]} size={22} color={theme.colors.text} />
                                </View>
                                <View style={styles.text}>
                                    <Text style={styles.label}>{list.title}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </ScrollView>
                )}
            </BottomSheetView>
        </BottomSheetModal>
    );
});

ImportItemsSheet.displayName = 'ImportItemsSheet';

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        content: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            paddingBottom: 30,
        },
        scroll: {
            maxHeight: 460,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 10,
            gap: 15,
        },
        marker: {
            width: 28,
            alignItems: 'center',
        },
        text: {
            flex: 1,
            gap: 2,
        },
        label: {
            fontFamily: t.font.family.body,
            fontSize: t.font.size.medium,
            color: t.colors.text,
        },
        subtle: {
            fontFamily: t.font.family.body,
            fontSize: t.font.size.small,
            color: t.colors.subtle,
        },
        empty: {
            paddingVertical: 18,
            paddingHorizontal: 10,
            fontFamily: t.font.family.body,
            fontSize: t.font.size.medium,
            color: t.colors.subtle,
        },
    });
};
