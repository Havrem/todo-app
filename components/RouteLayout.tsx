import { useSession } from "@/contexts/SessionContext";
import { Stack } from "expo-router";

export default function RouteLayout() {
    const { session, isLoading } = useSession();

    if (isLoading) return null;

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Protected guard={!!session}>
                <Stack.Screen name="(tabs)"/>
            </Stack.Protected>
            <Stack.Protected guard={!session}>
                <Stack.Screen name="start"/>
            </Stack.Protected>
        </Stack>
    );
}