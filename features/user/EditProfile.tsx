"use client";

import { z } from "zod";
import type { User } from "@/types/User";
import ProfileImg from "@/components/ProfileImg";
import { useState } from "react";
import { UserSchema } from "../auth/schima";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

type Props = {
  user: User;
};

export default function EditProfile({ user }: Props) {
  const router = useRouter();
  const [profileImageUrl, setProfileImageUrl] = useState(user.profileImageUrl);
  const [nickName, setNickName] = useState(user.nickName);
  const [isNickNameOk, setIsNickNameOk] = useState(true);
  const [isNickNameCheckLoading, setIsNickNameCheckLoding] = useState(false);
  const [nickNameError, setNickNameError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(""); // 나중에 유저 정보로 바꿔야함

  async function handleCheckNickName() {
    setIsNickNameCheckLoding(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/check-nickname?nickname=${nickName}`
      );
      if (response.ok) {
        const { data } = await response.json();
        const isAvailable = data.available;
        if (isAvailable) {
          setIsNickNameOk(true);
        } else {
          setNickNameError("이미 사용 중인 닉네임입니다.");
        }
      } else if (response.status === 400) {
        setNickNameError("이미 사용 중인 닉네임입니다.");
      } else {
        throw new Error("닉네임 중복 체크 중 서버 에러");
      }
    } catch (err) {
      console.error(err);
      alert(
        "네트워크 혹은 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setIsNickNameCheckLoding(false);
    }
  }

  function handleNickNameBlur() {
    const schema = UserSchema.pick({ nickName: true });
    const payload = { nickName };
    const result = schema.safeParse(payload);
    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setNickNameError(fieldErrors.nickName?.[0] || "");
    } else {
      setNickNameError("");
    }
  }

  return (
    <form
      className="w-sm flex flex-col items-center gap-7"
      onSubmit={async (e) => {
        e.preventDefault();
        if (profileImageUrl !== user.profileImageUrl) {
          try {
            const res = await fetch("/api/members/confirm-upload", {
              method: "PUT",
              body: JSON.stringify({ url: profileImageUrl }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!res.ok) {
              throw new Error("프로필 이미지 수정 중 에러");
            }
          } catch (err) {
            console.log(err);
            alert(
              "네트워크 혹은 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
          }
        }
        // router.refresh();
        // router.back();
        window.location.href = `/${nickName}`;
      }}
    >
      <h2 className="font-bold text-xl hidden sm:block">프로필 수정</h2>
      <div className="relative w-auto h-auto">
        <ProfileImg url={profileImageUrl} size={120} />
        <ImageUploader setProfileImageUrl={setProfileImageUrl} />
      </div>

      <div tabIndex={-1}></div>
      <div className="w-full flex flex-col gap-3">
        <InputSection label="닉네임">
          <input
            className="py-2 px-4 w-full"
            type="text"
            value={nickName}
            onChange={(e) => {
              setIsEditing(true);
              setNickNameError("");
              setIsNickNameOk(false);
              setNickName(e.target.value);
            }}
            onBlur={() => {
              setIsEditing(false);
              handleNickNameBlur();
              if (nickName !== user.nickName) {
                handleCheckNickName();
              }
            }}
          />
        </InputSection>
        {!isEditing && (
          <p className="font-light text-theme-red">{nickNameError}</p>
        )}
        <InputSection label="관심있는 성취 카테고리">
          <input className="py-2 px-4 w-full" type="text" />
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
      <button
        className="bg-theme rounded-md w-full py-2 font-bold text-white disabled:bg-[#e6e6e6] disabled:text-[#a6a6a6]"
        disabled={
          isEditing ||
          !!nickNameError ||
          !isNickNameOk ||
          isNickNameCheckLoading
        }
      >
        제출
      </button>
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
