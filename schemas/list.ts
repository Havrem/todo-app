import z from "zod";
import { categorySchema } from "./category";

export const itemType = z.enum(['BULLET', 'CHECKED', 'NUMBERED', 'NONE']);

export const listItemSchema = z.object({
    id: z.number(),
    itemListId: z.number(),
    type: itemType,
    text: z.string(),
    completed: z.boolean(),
});

export type ListItem = z.infer<typeof listItemSchema>;
export type ItemType = z.infer<typeof itemType>;

export const listSchema = z.object({
    id: z.number(),
    title: z.string(),
    category: categorySchema,
    bookmarked: z.boolean(),
    items: z.array(listItemSchema),
});

export type List = z.infer<typeof listSchema>;

export const listSummarySchema = listSchema
  .omit({ items: true })

export type ListSummary = z.infer<typeof listSummarySchema>;

export type CreateItemInput = Pick<ListItem, 'type' | 'text' | 'completed' | 'itemListId'>;
export type UpdateItemInput = Partial<Pick<ListItem, 'text' | 'completed' | 'type'>>;

export type CreateListInput = { title: string; category: number };
export type UpdateListInput = Partial<{ title: string; category: number; bookmarked: boolean }>;

export type ReorderListInput = { previousId: number | null, nextId: number | null }
export type ReorderItemInput = { previousId: number | null, nextId: number | null }
