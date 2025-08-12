"use client";

import { z } from "zod";
import type { User } from "@/types/User";
import ProfileImg from "@/components/ProfileImg";
import { useState, useRef, useEffect } from "react";
import { UserSchema } from "../auth/schima";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import { PencilIcon, XIcon } from "@/components/Icons";

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
  const [isEditing, setIsEditing] = useState({
    nickName: false,
    category: false,
    bio: false,
  });
  const allCategories = [
    "공부",
    "운동",
    "커리어",
    "독서",
    "자기계발",
    "취미",
    "투자",
    "루틴",
    "마인드셋",
  ];
  const [categories, setCategories] = useState(user.categories);
  const remainingCategories = allCategories.filter(
    (category) => !categories.includes(category)
  );
  const categoryError =
    categories.length <= 0 || categories.length > 5
      ? "카테고리는 1개 이상 5개 이하로 선택할 수 있습니다"
      : "";
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const [bio, setBio] = useState(user.description);

  // 카테고리 인풋 용도
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!categoryRef.current?.contains(e.target as Node)) {
        setIsEditing((prev) => ({ ...prev, category: false }));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      className="w-sm flex flex-col items-center gap-6"
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const res = await fetch("/api/auth", {
            method: "PUT",
            body: JSON.stringify({
              user: {
                ...user,
                nickName,
                profileImageUrl,
                categories,
                description: bio,
              },
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            console.log(res);
            throw new Error("프로필 이미지 수정 중 에러");
          }
        } catch (err) {
          console.log(err);
          alert(
            "네트워크 혹은 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
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
          <div
            className={`absolute right-5 top-4 cursor-pointer ${
              isEditing.nickName ? "hidden" : ""
            }`}
          >
            <PencilIcon />
          </div>
          <input
            className="py-2 px-4 w-full h-full"
            type="text"
            value={nickName}
            onClick={() =>
              setIsEditing((prev) => ({ ...prev, nickName: true }))
            }
            onChange={(e) => {
              setNickNameError("");
              setIsNickNameOk(false);
              setNickName(e.target.value);
            }}
            onBlur={() => {
              setIsEditing((prev) => ({ ...prev, nickName: false }));
              handleNickNameBlur();
              if (nickName !== user.nickName) {
                handleCheckNickName();
              }
            }}
          />
        </InputSection>
        {!isEditing && nickNameError && (
          <p className="font-light text-theme-red">{nickNameError}</p>
        )}
        <InputSection label="나를 소개하는 한 줄">
          <div
            className={`absolute right-5 top-4 cursor-pointer ${
              isEditing.bio ? "hidden" : ""
            }`}
          >
            <PencilIcon />
          </div>
          <input
            className="py-2 px-4 w-full h-full"
            type="text"
            value={bio || ""}
            onClick={() => setIsEditing((prev) => ({ ...prev, bio: true }))}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            onBlur={() => setIsEditing((prev) => ({ ...prev, bio: false }))}
          />
        </InputSection>
        <InputSection label="관심있는 성취 카테고리">
          <div
            className={`absolute right-5 top-4 cursor-pointer ${
              isEditing.category ? "hidden" : ""
            }`}
          >
            <PencilIcon />
          </div>
          <div
            ref={categoryRef}
            className={`py-2 px-4 w-full h-auto flex flex-wrap gap-1.5 cursor-pointer ${
              isEditing.category ? "border-2 border-theme rounded-sm" : ""
            }`}
            onClick={() => {
              setIsEditing((prev) => ({ ...prev, category: true }));
            }}
          >
            {categories.map((category) => (
              <div
                onClick={() => {
                  setCategories(categories.filter((c) => c !== category));
                }}
                className="bg-theme rounded-full py-1 px-3 text-white flex gap-1 items-center"
                key={category}
              >
                {category}
                {isEditing.category && <XIcon />}
              </div>
            ))}
            {isEditing.category &&
              remainingCategories.map((category) => (
                <div
                  onClick={() => setCategories((prev) => [...prev, category])}
                  className="rounded-full py-1 px-3 bg-white text-theme border border-[#d9d9d9]"
                  key={category}
                >
                  {category}
                </div>
              ))}
          </div>
        </InputSection>
        {!isEditing.category && categoryError && (
          <p className="font-light text-theme-red">{categoryError}</p>
        )}
      </div>
      <button
        className="bg-theme rounded-md w-full py-2 font-bold text-white disabled:bg-[#e6e6e6] disabled:text-[#a6a6a6]"
        disabled={
          isEditing.nickName ||
          isEditing.category ||
          isEditing.bio ||
          !!nickNameError ||
          !isNickNameOk ||
          !!categoryError ||
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
      <div className="bg-[#f2f2f2] rounded-sm min-h-12 relative flex items-center">
        {children}
      </div>
    </div>
  );
}
