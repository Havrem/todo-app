import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
    title: string;
    onSave: (newTitle: string) => void;
    left?: React.ReactNode;
    right?: React.ReactNode;
};

export function EditableHeader({ title, onSave, left, right }: Props) {
    const [value, setValue] = useState(title);
    const lastSavedRef = useRef(title);

    useEffect(() => {
        setValue(title);
        lastSavedRef.current = title;
    }, [title]);

    const commit = () => {
        const trimmed = value.trim();
        if (!trimmed) {
            setValue(lastSavedRef.current);
            return;
        }
        if (trimmed === lastSavedRef.current) return;
        lastSavedRef.current = trimmed;
        onSave(trimmed);
    };

    return (
        <View style={styles.container}>
            <View style={styles.side}>{left}</View>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                onBlur={commit}
                onSubmitEditing={commit}
                returnKeyType="default"
                selectTextOnFocus
                maxLength={500}
                selectionColor={"#ffffff"}
            />
            <View style={styles.side}>{right}</View>
        </View>
    );
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
    input: {
        flex: 1,
        fontFamily: 'Glory-Bold',
        color: '#555555',
        fontSize: 17,
        textAlign: 'center',
        paddingVertical: 0,
    },
});
