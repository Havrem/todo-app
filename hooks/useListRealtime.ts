import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRealtime } from "@/contexts/RealtimeContext";

/** Subscribe to a list's realtime events; invalidate cache when any change arrives. */
export function useListRealtime(listId: number) {
    const { subscribe } = useRealtime();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!listId) return;
        const unsubscribe = subscribe(`/user/queue/lists/${listId}`, () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
            queryClient.invalidateQueries({ queryKey: ['lists'] });
        });
        return unsubscribe;
    }, [listId, subscribe, queryClient]);
}
