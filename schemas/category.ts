import z from "zod";

export const categorySchema = z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
});

export const createCategorySchema = categorySchema
    .omit({ id: true })
    .extend({
        name: z.string().nonempty('Required'),
        icon: z.string().nonempty('Pick an icon'),
    });


export type Category = z.infer<typeof categorySchema>;

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = Partial<CreateCategoryInput>;
