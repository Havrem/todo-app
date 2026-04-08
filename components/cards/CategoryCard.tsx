import { IconKey, IconRegistry } from "@/constants/icons";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { Category } from "@/schemas/category";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export function CategoryCard({ category }: { category: Category }) {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const Icon = IconRegistry[category.icon as IconKey];

    return (
        <View style={styles.container}>
            {Icon && <Icon size={32} color={theme.category.nameColor} />}
            <Text style={styles.txt}>{category.name}</Text>
        </View>
    );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        container: {
            backgroundColor: t.category.backgroundColor,
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: 130,
        },
        txt: {
            fontFamily: t.font.family.button,
            fontSize: t.font.size.medium,
            color: t.category.nameColor
        }
    })
}
