import { User } from "@/schemas/user";
import { api } from "./client";

export const getUser = (): Promise<User> => api.get<User>('/users/profile').then((r) => r.data);