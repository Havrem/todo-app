import { Pressable, Text, View } from "react-native";
import { useSession } from "@/contexts/SessionContext";

export function Settings() {
    const { signOut } = useSession();

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={signOut} style={{ backgroundColor: 'red', padding: 16, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontFamily: 'Glory-Bold' }}>Log out</Text>
            </Pressable>
        </View>
    );
}