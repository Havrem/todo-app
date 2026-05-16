import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem, deleteItem, updateItem } from '@/api/items';
import { CreateItemInput, UpdateItemInput } from '@/schemas/list';

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
