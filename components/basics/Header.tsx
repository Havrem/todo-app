import { StyleSheet, Text, View } from "react-native";

export function Header({ text } : {text: string}) {
    return (
        <View style={styles.container}>
            <Text style={styles.txt}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(219, 209, 181, 1)",
        paddingVertical: 25,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    txt: {
        fontFamily: 'Glory-Bold',
        color: '#555555',
        fontSize: 17
    },
});