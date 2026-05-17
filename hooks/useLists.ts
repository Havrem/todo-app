import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createList, deleteList, getList, getLists, importItems, reorderList, updateList } from '@/api/list';
import { ImportItemsInput, ListSummary, ReorderListInput, UpdateListInput } from '@/schemas/list';
import { router } from 'expo-router';

export function useLists() {
    return useQuery({
        queryKey: ['lists'],
        queryFn: getLists,
    });
}

export function useList(id: number) {
    return useQuery({
        queryKey: ['lists', id],
        queryFn: () => getList(id),
        enabled: !!id,
    });
}

export function useCreateList() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createList,
        onSuccess: (newList) => {
            queryClient.invalidateQueries({ queryKey: ['lists'] });
            router.push(`/list/${newList.id}`);
        },
    });
}

export function useUpdateList(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: UpdateListInput) => updateList(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists'] });
            queryClient.invalidateQueries({ queryKey: ['lists', id] });
        },
    });
}

export function useImportItems(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: ImportItemsInput) => importItems(id, input),
        onSuccess: (updatedList) => {
            queryClient.setQueryData(['lists', id], updatedList);
            queryClient.invalidateQueries({ queryKey: ['lists'] });
        },
    });
}

export function useDeleteList() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteList,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists'] });
        },
    });
}

export function useReorderList() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: number; input: ReorderListInput }) =>
            reorderList(id, input),
        onMutate: async ({ id, input }) => {
            await queryClient.cancelQueries({ queryKey: ['lists'] });
            const previous = queryClient.getQueryData<ListSummary[]>(['lists']);
            if (previous) {
                queryClient.setQueryData<ListSummary[]>(['lists'], reorderInArray(previous, id, input));
            }
            return { previous };
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.previous) queryClient.setQueryData(['lists'], ctx.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['lists'] });
        },
    });
}


function reorderInArray(lists: ListSummary[], movedId: number, input: ReorderListInput): ListSummary[] {
    const moving = lists.find((l) => l.id === movedId);
    if (!moving) return lists;
    const without = lists.filter((l) => l.id !== movedId);
    let insertIdx = without.length;
    if (input.nextId !== null) {
        const idx = without.findIndex((l) => l.id === input.nextId);
        if (idx !== -1) insertIdx = idx;
    } else if (input.previousId !== null) {
        const idx = without.findIndex((l) => l.id === input.previousId);
        if (idx !== -1) insertIdx = idx + 1;
    }
    return [...without.slice(0, insertIdx), moving, ...without.slice(insertIdx)];
}
