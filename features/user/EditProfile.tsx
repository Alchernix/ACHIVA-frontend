"use client";

import type { User } from "@/types/User";
import ProfileImg from "@/components/ProfileImg";
import { useState } from "react";

export default function EditProfile({ user }: { user: User }) {
  const [nickName, setNickName] = useState(user.nickName);
  const [nickNameError, setNickNameError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(""); // 나중에 유저 정보로 바꿔야함

  return (
    <form className="w-sm flex flex-col items-center gap-7">
      <h2 className="font-bold text-xl">프로필 수정</h2>
      <ProfileImg url={user.profileImageUrl} size={120} />
      <div className="w-full flex flex-col gap-3">
        <InputSection label="닉네임">
          <input
            className="py-2 px-4 w-full"
            type="text"
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
        </InputSection>
        <InputSection label="관심있는 성취 카테고리">
          <input
            className="py-2 px-4 w-full"
            type="text"
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
        </InputSection>
        <InputSection label="나를 소개하는 한 줄">
          <input
            className="py-2 px-4 w-full"
            type="text"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </InputSection>
      </div>
      <div></div>
    </form>
  );
}

function InputSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="font-bold text-theme mb-1">{label}</div>
      <div className="bg-[#f2f2f2] rounded-sm">{children}</div>
    </div>
  );
}
