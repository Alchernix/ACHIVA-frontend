"use client";
import { useCurrentUserInfoStore } from "@/store/userStore";
import Sidebar from "@/components/Sidebar";
export default function Home() {
  const user = useCurrentUserInfoStore.use.user();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">어서오세요 {user?.nickName}!</div>
    </div>
  );
}
