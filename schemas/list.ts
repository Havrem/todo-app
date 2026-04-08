import z from "zod";

export const itemType = z.enum(['bullet', 'check', 'numbered', 'none']);

export const listItemSchema = z.object({
    id: z.string(),
    type: itemType,
    text: z.string(),
    isDone: z.boolean().nullable()
});

export type ListItem = z.infer<typeof listItemSchema>;

export const listSchema = z.object({
    id: z.string(),
    title: z.string(),
    categoryId: z.string(),
    bookmarked: z.boolean(),
    items: z.array(listItemSchema)
});

export type List = z.infer<typeof listSchema>;

export const listSummarySchema = listSchema
  .omit({ items: true })

export type ListSummary = z.infer<typeof listSummarySchema>;

export type CreateItemInput = Pick<ListItem, 'type' | 'text'>;
export type UpdateItemInput = Partial<Pick<ListItem, 'text' | 'isDone'>>;

export type CreateListInput = Pick<List, 'title' | 'categoryId'>;
export type UpdateListInput = Partial<Pick<List, 'title' | 'categoryId' | 'bookmarked'>>;