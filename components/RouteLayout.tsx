import { useSession } from "@/contexts/SessionContext";
import { Stack } from "expo-router";

export default function RouteLayout() {
    const { token, isLoading } = useSession();

    if (isLoading) return null;

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Protected guard={!!token}>
                <Stack.Screen name="(tabs)"/>
                <Stack.Screen name="change-password"/>
                <Stack.Screen name="delete-account"/>
            </Stack.Protected>
            <Stack.Protected guard={!token}>
                <Stack.Screen name="start"/>
            </Stack.Protected>
        </Stack>
    );
}