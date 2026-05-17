import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { ItemType } from "@/schemas/list";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TYPES: ItemType[] = ['NONE', 'BULLET', 'CHECKED', 'NUMBERED'];

const ICONS: Record<ItemType, keyof typeof MaterialCommunityIcons.glyphMap> = {
    NONE: 'format-text',
    BULLET: 'format-list-bulleted',
    CHECKED: 'format-list-checks',
    NUMBERED: 'format-list-numbered',
};

type Props = {
    onSelect: (type: ItemType) => void;
};

export const ItemTypeSheet = forwardRef<BottomSheetModal, Props>(({ onSelect }, ref) => {
    const { t } = useTranslation('itemTypes');
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    return (
        <BottomSheetModal
            ref={ref}
            enableDynamicSizing
            backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
            )}
        >
            <BottomSheetView style={styles.content}>
                {TYPES.map((type) => (
                    <Pressable
                        key={type}
                        style={styles.row}
                        onPress={() => onSelect(type)}
                    >
                        <View style={styles.marker}>
                            <MaterialCommunityIcons name={ICONS[type]} size={22} color={theme.colors.text} />
                        </View>
                        <Text style={styles.label}>{t(type.toLowerCase() as never)}</Text>
                    </Pressable>
                ))}
            </BottomSheetView>
        </BottomSheetModal>
    );
});

ItemTypeSheet.displayName = 'ItemTypeSheet';

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        content: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            paddingBottom: 30,
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
        label: {
            fontFamily: t.font.family.body,
            fontSize: t.font.size.medium,
            color: t.colors.text,
        },
    });
};
