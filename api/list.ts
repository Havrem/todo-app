import type { CreateListInput, List, ListSummary, UpdateListInput } from '@/schemas/list';
import { api } from './client';

export const getLists = (): Promise<ListSummary[]> =>
    api.get<ListSummary[]>('/item-lists').then((r) => r.data);

export const getList = (id: number): Promise<List> =>
    api.get<List>(`/item-lists/${id}`).then((r) => r.data);

export const createList = (input: CreateListInput): Promise<List> =>
    api.post<List>('/item-lists', input).then((r) => r.data);

export const updateList = (id: number, input: UpdateListInput): Promise<List> =>
    api.patch<List>(`/item-lists/${id}`, input).then((r) => r.data);

export const deleteList = (id: number): Promise<void> =>
    api.delete(`/item-lists/${id}`).then(() => undefined);
