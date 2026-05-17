import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    text: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
    onRightPress?: () => void;
};

export function Header({ text, left, right, onRightPress }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.side}>{left}</View>
            <Text style={styles.txt} numberOfLines={1} ellipsizeMode="tail">{text}</Text>
            <View style={styles.side}>
                {onRightPress
                    ? <Pressable onPress={onRightPress}>{right}</Pressable>
                    : right
                }
            </View>
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
        flex: 1,
        fontFamily: 'Glory-Bold',
        color: '#555555',
        fontSize: 17,
        textAlign: 'center',
        paddingHorizontal: 8,
    },
});
