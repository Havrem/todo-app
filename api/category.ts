import type { Category, CreateCategoryInput, UpdateCategoryInput } from '@/schemas/category';
import { api } from './client';

export const getCategories = (): Promise<Category[]> =>
    api.get<Category[]>('/categories').then((r) => r.data);

export const createCategory = (input: CreateCategoryInput): Promise<Category> =>
    api.post<Category>('/categories', input).then((r) => r.data);

export const updateCategory = (id: string, input: UpdateCategoryInput): Promise<Category> =>
    api.patch<Category>(`/categories/${id}`, input).then((r) => r.data);

export const deleteCategory = (id: string): Promise<void> =>
    api.delete(`/categories/${id}`).then(() => undefined);
