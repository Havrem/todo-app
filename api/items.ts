import type { CreateItemInput, ListItem, UpdateItemInput } from '@/schemas/list';
import { api } from './client';

export const createItem = (listId: string, input: CreateItemInput): Promise<ListItem> =>
    api.post<ListItem>(`/lists/${listId}/items`, input).then((r) => r.data);

export const updateItem = (id: string, input: UpdateItemInput): Promise<ListItem> =>
    api.patch<ListItem>(`/items/${id}`, input).then((r) => r.data);

export const deleteItem = (id: string): Promise<void> =>
    api.delete(`/items/${id}`).then(() => undefined);
