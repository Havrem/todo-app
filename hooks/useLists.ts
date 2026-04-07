import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createList, deleteList, getList, getLists, updateList } from '@/api/list';
import { UpdateListInput } from '@/schemas/list';

export function useLists() {
    return useQuery({
        queryKey: ['lists'],
        queryFn: getLists,
    });
}

export function useList(id: string) {
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists'] });
        },
    });
}

export function useUpdateList(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: UpdateListInput) => updateList(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists'] });
            queryClient.invalidateQueries({ queryKey: ['lists', id] });
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