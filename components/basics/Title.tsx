import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function Title({ text, icon, size = 20, color = '#6E3409' } : {text: string, icon: React.ReactElement<any>, size?: number, color?: string}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            {icon && React.cloneElement(icon, { size: size, color: color})}
        </View>
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