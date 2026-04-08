import { createCategory, deleteCategory, getCategories, updateCategory } from '@/api/category';
import { UpdateCategoryInput } from '@/schemas/category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}

export function useUpdateCategory(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: UpdateCategoryInput) => updateCategory(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            // cascade affects lists too
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['lists'] });
        },
    });
}
