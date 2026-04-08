import { StyleSheet, Text, View } from "react-native";

export function Header({ text, left ,right }: { text: string; left?: React.ReactNode; right?: React.ReactNode }) {
    return (
        <View style={styles.container}>
            <View style={styles.side}>{left}</View>
            <Text style={styles.txt}>{text}</Text>
            <View style={styles.side}>{right}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(219, 209, 181, 1)",
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    side: {
        width: 40,
        alignItems: 'center',
    },
    txt: {
        fontFamily: 'Glory-Bold',
        color: '#555555',
        fontSize: 17
    },
});
