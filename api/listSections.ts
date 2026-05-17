import type { CreateListSectionInput, ListSection, ReorderListSectionInput, UpdateListSectionInput } from '@/schemas/list';
import { api } from './client';

export const createListSection = (listId: number, input: CreateListSectionInput): Promise<ListSection> =>
    api.post<ListSection>(`/item-lists/${listId}/sections`, input).then((r) => r.data);

export const updateListSection = (id: number, input: UpdateListSectionInput): Promise<ListSection> =>
    api.patch<ListSection>(`/list-sections/${id}`, input).then((r) => r.data);

export const deleteListSection = (id: number): Promise<void> =>
    api.delete(`/list-sections/${id}`).then(() => undefined);

export const reorderListSection = (id: number, input: ReorderListSectionInput): Promise<ListSection> =>
    api.patch<ListSection>(`/list-sections/${id}/order`, input).then((r) => r.data);
