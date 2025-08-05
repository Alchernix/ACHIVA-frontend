"use client";
import { useCurrentUserInfoStore } from "@/store/userStore";
import type { User } from "@/types/User";
export default function AuthHydrator({ user }: { user: User }) {
  const setUser = useCurrentUserInfoStore.use.setUser();
  setUser(user);
  return null;
}
