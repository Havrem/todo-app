import z from "zod";

export const categoryType = z.enum(['GROCERY', 'RECIPES', 'GENERAL']);
export const categoryKind = z.enum(['USER', 'SHARED']);

export const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    icon: z.string(),
    type: categoryType,
    kind: categoryKind,
});

export const createCategorySchema = categorySchema
    .omit({ id: true, kind: true })
    .extend({
        name: z.string().nonempty('Required'),
        icon: z.string().nonempty('Pick an icon'),
    });

export const updateCategorySchema = categorySchema
    .omit({ id: true, kind: true })
    .extend({
        name: z.string().nonempty('Required'),
        icon: z.string().nonempty('Pick an icon'),
    });


export type Category = z.infer<typeof categorySchema>;
export type CategoryType = z.infer<typeof categoryType>;
export type CategoryKind = z.infer<typeof categoryKind>;

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;
export type UpdateCategoryInput = Partial<CreateCategoryInput>;
