"use client";
import { useCurrentUserInfoStore } from "@/store/userStore";
export default function Home() {
  const user = useCurrentUserInfoStore.use.user();

  return <div>{user?.nickName}의 프로필</div>;
}
