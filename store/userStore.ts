"use client";
// 현재 로그인 중인 유저 정보를 저장
import { create } from "zustand";
import createSelectors from "./createSelectors";
import type { User } from "@/types/User";

type CurrentUserState = {
  user: User | null;
  setUser: (updates: User) => void;
  resetUser: () => void;
};

const useCurrentUserStoreBase = create<CurrentUserState>((set) => ({
  user: null,
  setUser: (updates) =>
    set((state) => ({
      user: { ...updates },
    })),
  resetUser: () =>
    set({
      user: null,
    }),
}));

export const useCurrentUserInfoStore = createSelectors(useCurrentUserStoreBase);
