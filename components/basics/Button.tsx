import { Theme } from "@/constants/themes";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export function Button({ text, icon, size = 25, color, backgroundColor, onPress } : {text: string, icon?: React.ReactElement<any>, size?: number, color?: string, backgroundColor?: string, onPress: () => void}) {
    const { theme } = useTheme();
    const styles = makeStyles(theme);

    return (
        <Pressable style={[styles.btn, !icon && { justifyContent: 'center' }, backgroundColor ? { backgroundColor } : null]} onPress={onPress}>
            <Text style={styles.txt}>{text}</Text>
            {icon && React.cloneElement(icon, { size: size, color: color ? color : theme.colors.icon})}
        </Pressable>
    );
}

const makeStyles = (t: Theme) => {
    return (
        StyleSheet.create({
            btn: {
                backgroundColor: t.colors.accent,
                borderRadius: 5,
                paddingHorizontal: 15,
                paddingVertical: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'   
            },
            txt: {
                fontFamily: t.font.family.button,
                fontSize: t.font.size.medium,
                color: t.colors.text
            }
        })
    )
}