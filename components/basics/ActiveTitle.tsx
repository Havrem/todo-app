import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Title({ text, icon, size = 20, color = '#6E3409' , onPress} : {text: string, icon: React.ReactElement<any>, size?: number, color?: string, onPress: () => void}) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
            {icon && React.cloneElement(icon, { size: size, color: color})}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    text: {
        fontFamily: 'Glory-Bold',
        color: 'rgba(0, 0, 0, 0.59)',
        fontSize: 16
    }
});