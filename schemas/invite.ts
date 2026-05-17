import z from "zod";

export const inviteSchema = z.object({
    id: z.number(),
    listId: z.number(),
    listTitle: z.string(),
    inviterEmail: z.string(),
});

export type Invite = z.infer<typeof inviteSchema>;

export const inviteEmailSchema = z.object({
    email: z.email('Invalid email'),
});

export type InviteEmailInput = z.infer<typeof inviteEmailSchema>;
