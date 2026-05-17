import z from "zod";
import { categorySchema } from "./category";

export const itemType = z.enum(['BULLET', 'CHECKED', 'NUMBERED', 'NONE']);
export const listType = z.enum(['GROCERY', 'RECIPES', 'GENERAL']);

export const listItemSchema = z.object({
    id: z.number(),
    itemListId: z.number(),
    sectionId: z.number().nullable(),
    type: itemType,
    text: z.string(),
    completed: z.boolean(),
});

export const listSectionSchema = z.object({
    id: z.number(),
    itemListId: z.number(),
    text: z.string(),
});

export type ListItem = z.infer<typeof listItemSchema>;
export type ListSection = z.infer<typeof listSectionSchema>;
export type ItemType = z.infer<typeof itemType>;
export type ListType = z.infer<typeof listType>;

export const listSchema = z.object({
    id: z.number(),
    title: z.string(),
    category: categorySchema,
    type: listType,
    bookmarked: z.boolean(),
    sections: z.array(listSectionSchema),
    items: z.array(listItemSchema),
});

export type List = z.infer<typeof listSchema>;

export const listSummarySchema = listSchema
  .omit({ items: true })

export type ListSummary = z.infer<typeof listSummarySchema>;

export type CreateItemInput = Pick<ListItem, 'type' | 'text' | 'completed' | 'itemListId'> & { sectionId?: number | null };
export type UpdateItemInput = Partial<Pick<ListItem, 'text' | 'completed' | 'type'>>;

export type CreateListSectionInput = Pick<ListSection, 'text'>;
export type UpdateListSectionInput = Partial<Pick<ListSection, 'text'>>;
export type ReorderListSectionInput = { previousId: number | null, nextId: number | null };

export type CreateListInput = { title: string; category: number; type: ListType };
export type UpdateListInput = Partial<{ title: string; category: number; type: ListType; bookmarked: boolean }>;
export type ImportItemsInput = { sourceListId: number };

export type ReorderListInput = { previousId: number | null, nextId: number | null }
export type ReorderItemInput = { previousId: number | null, nextId: number | null, sectionId: number | null }
