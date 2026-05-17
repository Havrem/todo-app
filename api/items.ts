import type { CreateItemInput, ListItem, ReorderItemInput, UpdateItemInput } from '@/schemas/list';
import { api } from './client';

export const createItem = (input: CreateItemInput): Promise<ListItem> =>
    api.post<ListItem>('/items', input).then((r) => r.data);

export const updateItem = (id: number, input: UpdateItemInput): Promise<ListItem> =>
    api.patch<ListItem>(`/items/${id}`, input).then((r) => r.data);

export const deleteItem = (id: number): Promise<void> =>
    api.delete(`/items/${id}`).then(() => undefined);

export const reorderItem = (id: number, input: ReorderItemInput): Promise<ListItem> =>
    api.patch<ListItem>(`/items/${id}/order`, input).then((r) => r.data);
