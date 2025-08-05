"use client";
import { useCurrentUserInfoStore } from "@/store/userStore";
export default function Home() {
  const user = useCurrentUserInfoStore.use.user();

  return (
    <div>
      <div>어서오세요 {user?.nickName}!</div>
    </div>
  );
}
