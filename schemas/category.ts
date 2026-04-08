import z from "zod";

export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

export type CreateCategoryInput = Pick<Category, 'name' | 'icon'>;
export type UpdateCategoryInput = Partial<CreateCategoryInput>;
