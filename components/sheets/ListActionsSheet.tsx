import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Action = {
    key: 'import' | 'rearrange' | 'invite' | 'type';
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const ACTIONS: Action[] = [
    { key: 'import', icon: 'import' },
    { key: 'rearrange', icon: 'arrange-bring-forward' },
    { key: 'type', icon: 'shape-outline' },
    { key: 'invite', icon: 'account-plus' },
];

type Props = {
    onSelect: (key: Action['key']) => void;
};

export const ListActionsSheet = forwardRef<BottomSheetModal, Props>(({ onSelect }, ref) => {
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
                {ACTIONS.map((action) => (
                    <Pressable
                        key={action.key}
                        style={styles.row}
                        onPress={() => onSelect(action.key)}
                    >
                        <View style={styles.marker}>
                            <MaterialCommunityIcons name={action.icon} size={22} color={theme.colors.text} />
                        </View>
                        <Text style={styles.label}>{t(`actions.${action.key}`)}</Text>
                    </Pressable>
                ))}
            </BottomSheetView>
        </BottomSheetModal>
    );
});

ListActionsSheet.displayName = 'ListActionsSheet';

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
