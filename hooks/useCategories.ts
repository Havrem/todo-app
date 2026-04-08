import { createCategory, deleteCategory, getCategories, updateCategory } from '@/api/category';
import { UpdateCategoryInput } from '@/schemas/category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

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
            router.back();
            Toast.show({
                type: 'success',
                text1: 'Category created!',
                position: 'bottom',
            });
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
