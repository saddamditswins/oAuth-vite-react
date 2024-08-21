import { AppConstants, getLS } from "@/lib/utils";
import { IAuthToken } from "@/types/auth";
import { IUser } from "@/types/user";
import { create } from "zustand";

type UserState = {
  user: IUser | null;
  token: string | null;
  setUser: (u: IUser) => void;
  setToken: (u: string) => void;
};

export const useUser = create<UserState>((set) => ({
  user: null,
  token: getLS<IAuthToken>(AppConstants.auth_token)?.token || "",
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}));
