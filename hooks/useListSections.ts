import { createListSection, deleteListSection, reorderListSection, updateListSection } from "@/api/listSections";
import { CreateListSectionInput, List, ListSection, ReorderListSectionInput, UpdateListSectionInput } from "@/schemas/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateListSection(listId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateListSectionInput) => createListSection(listId, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
        },
    });
}

export function useUpdateListSection(listId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: number; input: UpdateListSectionInput }) =>
            updateListSection(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
        },
    });
}

export function useDeleteListSection(listId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteListSection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', listId] });
        },
    });
}

export function useReorderListSection(listId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: number; input: ReorderListSectionInput }) =>
            reorderListSection(id, input),
        onMutate: async ({ id, input }) => {
            await queryClient.cancelQueries({ queryKey: ['lists', listId] });
            const previous = queryClient.getQueryData<List>(['lists', listId]);
            if (previous) {
                queryClient.setQueryData<List>(['lists', listId], {
                    ...previous,
                    sections: reorderInArray(previous.sections, id, input),
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

function reorderInArray(sections: ListSection[], movedId: number, input: ReorderListSectionInput): ListSection[] {
    const moving = sections.find((section) => section.id === movedId);
    if (!moving) return sections;
    const without = sections.filter((section) => section.id !== movedId);
    let insertIdx = without.length;
    if (input.nextId !== null) {
        const idx = without.findIndex((section) => section.id === input.nextId);
        if (idx !== -1) insertIdx = idx;
    } else if (input.previousId !== null) {
        const idx = without.findIndex((section) => section.id === input.previousId);
        if (idx !== -1) insertIdx = idx + 1;
    }
    return [...without.slice(0, insertIdx), moving, ...without.slice(insertIdx)];
}
