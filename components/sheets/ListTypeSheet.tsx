import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { ListType } from "@/schemas/list";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TYPES: ListType[] = ['GENERAL', 'GROCERY', 'RECIPES'];

const ICONS: Record<ListType, keyof typeof MaterialCommunityIcons.glyphMap> = {
    GENERAL: 'format-list-text',
    GROCERY: 'cart-outline',
    RECIPES: 'book-open-page-variant',
};

type Props = {
    selected?: ListType;
    onSelect: (type: ListType) => void;
};

export const ListTypeSheet = forwardRef<BottomSheetModal, Props>(({ selected, onSelect }, ref) => {
    const { t } = useTranslation('listEditor');
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
                {TYPES.map((type) => {
                    const isSelected = selected === type;
                    return (
                        <Pressable
                            key={type}
                            style={styles.row}
                            onPress={() => onSelect(type)}
                        >
                            <View style={styles.marker}>
                                <MaterialCommunityIcons name={ICONS[type]} size={22} color={theme.colors.text} />
                            </View>
                            <Text style={styles.label}>{t(`types.${type.toLowerCase()}` as never)}</Text>
                            {isSelected && <MaterialCommunityIcons name="check" size={22} color={theme.colors.icon} />}
                        </Pressable>
                    );
                })}
            </BottomSheetView>
        </BottomSheetModal>
    );
});

ListTypeSheet.displayName = 'ListTypeSheet';

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
            flex: 1,
            fontFamily: t.font.family.body,
            fontSize: t.font.size.medium,
            color: t.colors.text,
        },
    });
};
