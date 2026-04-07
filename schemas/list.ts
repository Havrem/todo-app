import z from "zod";

export const listSchema = z.object({
    title: z.string(),
});

export type List = z.infer<typeof listSchema>;