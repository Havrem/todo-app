import type { CreateItemInput, ListItem, UpdateItemInput } from '@/schemas/list';
import { api } from './client';

export const createItem = (input: CreateItemInput): Promise<ListItem> =>
    api.post<ListItem>('/items', input).then((r) => r.data);

export const updateItem = (id: number, input: UpdateItemInput): Promise<ListItem> =>
    api.patch<ListItem>(`/items/${id}`, input).then((r) => r.data);

export const deleteItem = (id: number): Promise<void> =>
    api.delete(`/items/${id}`).then(() => undefined);
