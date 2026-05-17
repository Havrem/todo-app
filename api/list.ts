import type { CreateListInput, ImportItemsInput, List, ListSummary, UpdateListInput, ReorderListInput } from '@/schemas/list';
import { api } from './client';

export const getLists = (): Promise<ListSummary[]> =>
    api.get<ListSummary[]>('/item-lists').then((r) => r.data);

export const getList = (id: number): Promise<List> =>
    api.get<List>(`/item-lists/${id}`).then((r) => r.data);

export const createList = (input: CreateListInput): Promise<List> =>
    api.post<List>('/item-lists', input).then((r) => r.data);

export const updateList = (id: number, input: UpdateListInput): Promise<List> =>
    api.patch<List>(`/item-lists/${id}`, input).then((r) => r.data);

export const importItems = (id: number, input: ImportItemsInput): Promise<List> =>
    api.post<List>(`/item-lists/${id}/items/import`, input).then((r) => r.data);

export const organizeGroceryList = (id: number): Promise<List> =>
    api.post<List>(`/item-lists/${id}/sections/organize`).then((r) => r.data);

export const deleteList = (id: number): Promise<void> =>
    api.delete(`/item-lists/${id}`).then(() => undefined);

export const reorderList = (id: number, input: ReorderListInput): Promise<List> =>
    api.patch<List>(`/item-lists/${id}/order`, input).then((r) => r.data);
