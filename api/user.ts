import { ChangePasswordInput, User } from "@/schemas/user";
import { api } from "./client";

export const getUser = (): Promise<User> =>
    api.get<User>('/users/profile').then((r) => r.data);

export const changePassword = (input: ChangePasswordInput): Promise<void> =>
    api.patch('/users/password', input).then(() => undefined);

export const deleteAccount = (): Promise<void> =>
    api.delete('/users/me').then(() => undefined);
