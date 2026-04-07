import type { CreateListInput, List, ListSummary, UpdateListInput } from '@/schemas/list';
import { api } from './client';

export const getLists = (): Promise<ListSummary[]> =>
    api.get<ListSummary[]>('/lists').then((r) => r.data);

export const getList = (id: string): Promise<List> =>
    api.get<List>(`/lists/${id}`).then((r) => r.data);

export const createList = (input: CreateListInput): Promise<List> =>
    api.post<List>('/lists', input).then((r) => r.data);

export const updateList = (id: string, input: UpdateListInput): Promise<List> =>
    api.patch<List>(`/lists/${id}`, input).then((r) => r.data);

export const deleteList = (id: string): Promise<void> =>
    api.delete(`/lists/${id}`).then(() => undefined);
