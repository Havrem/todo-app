import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem, deleteItem, reorderItem, updateItem } from '@/api/items';
import { CreateItemInput, List, ListItem, ReorderItemInput, UpdateItemInput } from '@/schemas/list';

export function useCreateItem(listId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: Omit<CreateItemInput, 'itemListId'>) =>
            createItem({ ...input, itemListId: listId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
        },
    });
}

export function useUpdateItem(listId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: number; input: UpdateItemInput }) =>
            updateItem(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
        },
    });
}

export function useDeleteItem(listId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
        },
    });
}

export function useReorderItem(listId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: number; input: ReorderItemInput }) =>
            reorderItem(id, input),
        onMutate: async ({ id, input }) => {
            await queryClient.cancelQueries({ queryKey: ['lists', listId] });
            const previous = queryClient.getQueryData<List>(['lists', listId]);
            if (previous) {
                queryClient.setQueryData<List>(['lists', listId], {
                    ...previous,
                    items: reorderInArray(previous.items, id, input),
                });
            }
            return { previous };
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.previous) queryClient.setQueryData(['lists', listId], ctx.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
        },
    });
}

function reorderInArray(items: ListItem[], movedId: number, input: ReorderItemInput): ListItem[] {
    const moving = items.find((i) => i.id === movedId);
    if (!moving) return items;
    const without = items.filter((i) => i.id !== movedId);
    let insertIdx = without.length;
    if (input.nextId !== null) {
        const idx = without.findIndex((i) => i.id === input.nextId);
        if (idx !== -1) insertIdx = idx;
    } else if (input.previousId !== null) {
        const idx = without.findIndex((i) => i.id === input.previousId);
        if (idx !== -1) insertIdx = idx + 1;
    }
    return [...without.slice(0, insertIdx), moving, ...without.slice(insertIdx)];
}
