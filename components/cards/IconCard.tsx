import { IconKey, IconRegistry } from "@/constants/icons";
import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export function IconCard({ icon }: { icon: string }) {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const Icon = IconRegistry[icon as IconKey];

    return (
        <View style={styles.wrapper}>
            <LinearGradient
                colors={theme.category.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                {Icon && <Icon size={32} color={theme.category.nameColor} />}
            </LinearGradient>
        </View>
    );
}

const makeStyles = (t: Theme) => {
    return StyleSheet.create({
        wrapper: {
            width: 90,
            borderRadius: 10,
            marginVertical: 5,

            shadowColor: '#00000020',
            shadowOffset: { width: 3, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 3,

            borderWidth: 0.5,
            borderColor: 'rgba(255, 255, 255, 0.52)',
        },
        container: {
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        txt: {
            fontFamily: t.font.family.button,
            fontSize: t.font.size.medium,
            color: t.category.nameColor
        }
    })
}