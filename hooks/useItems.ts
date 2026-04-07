import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem, deleteItem, updateItem } from '@/api/items';
import { CreateItemInput, UpdateItemInput } from '@/schemas/list';

export function useCreateItem(listId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateItemInput) => createItem(listId, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
        },
    });
}

export function useUpdateItem(listId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: UpdateItemInput }) =>
            updateItem(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
        },
    });
}

export function useDeleteItem(listId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
        },
    });
}
