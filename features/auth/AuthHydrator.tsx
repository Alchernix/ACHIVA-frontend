"use client";
import { useEffect } from "react";
import { useCurrentUserInfoStore } from "@/store/userStore";
import type { User } from "@/types/User";

export default function AuthHydrator({ user }: { user: User }) {
  const setUser = useCurrentUserInfoStore.use.setUser();
  useEffect(() => {
    setUser(user);
  }, [user, setUser]);
  return null;
}
