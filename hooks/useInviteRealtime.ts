import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useRealtime } from "@/contexts/RealtimeContext";
import { useSession } from "@/contexts/SessionContext";
import { router } from "expo-router";

/** Listens for incoming invites and shows a toast + invalidates the invites query. */
export function useInviteRealtime() {
    const { token } = useSession();
    const { subscribe } = useRealtime();
    const queryClient = useQueryClient();
    const { t } = useTranslation('share');

    useEffect(() => {
        if (!token) return;
        const unsubscribe = subscribe('/user/queue/invites', () => {
            queryClient.invalidateQueries({ queryKey: ['invites'] });
            Toast.show({
                type: 'invite',
                text1: t('received.title'),
                text2: t('received.body'),
                position: 'bottom',
                onPress: () => {
                    Toast.hide();
                    router.push('/invites' as never);
                },
            });
        });
        return unsubscribe;
    }, [token, subscribe, queryClient, t]);
}
