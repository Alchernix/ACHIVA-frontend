"use client";
import type { User } from "@/types/User";
import { useCurrentUserInfoStore } from "@/store/userStore";
export function ProfileBtn({ user }: { user: User }) {
  const currentUser = useCurrentUserInfoStore.use.user();
  if (currentUser?.nickName === user.nickName) {
    return (
      <button className="bg-theme rounded-sm text-white font-semibold text-sm px-2.5 py-1.5">
        프로필 수정
      </button>
    );
  } else {
    return (
      <button className="bg-theme rounded-sm text-white font-semibold text-sm px-2.5 py-1.5">
        친구 신청
      </button>
    );
  }
}
