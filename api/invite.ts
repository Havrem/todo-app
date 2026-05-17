import type { Invite, InviteEmailInput } from '@/schemas/invite';
import { api } from './client';

export const getInvites = (): Promise<Invite[]> =>
    api.get<Invite[]>('/invites').then((r) => r.data);

export const inviteToList = (listId: number, input: InviteEmailInput): Promise<Invite> =>
    api.post<Invite>(`/item-lists/${listId}/invites`, input).then((r) => r.data);

export const acceptInvite = (id: number): Promise<void> =>
    api.post(`/invites/${id}/accept`).then(() => undefined);

export const declineInvite = (id: number): Promise<void> =>
    api.post(`/invites/${id}/decline`).then(() => undefined);
