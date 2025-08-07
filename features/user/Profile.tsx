import type { User } from "@/types/User";
import ProfileImg from "@/components/ProfileImg";
import { BellIcon, FollowerIcon, SettingIcon } from "@/components/Icons";

// PC전용
export function Profile({ user }: { user: User }) {
  return (
    <div className="w-full hidden sm:flex gap-12">
      <ProfileImg url={user.profileImageUrl!} size={160} />
      <div className="flex-1 flex flex-col items-start justify-center gap-3">
        <div className="w-full flex items-center gap-10">
          <h1 className="font-semibold text-2xl">{user.nickName}</h1>
          <button className="bg-theme rounded-sm text-white font-semibold text-sm px-2.5 py-1.5">
            프로필 수정
          </button>
          <div className="flex gap-4 items-center">
            <BellIcon />
            <FollowerIcon />
            <SettingIcon />
          </div>
        </div>
        <p className="text-[#7F7F7F]">나를 소개하는 한 줄을 적었을 때</p>
        <div className="flex flex-col gap-1.5">
          <p className="font-bold">성취 카테고리</p>
          <div className="flex gap-2">
            {user.categories.map((category) => (
              <div
                key={category}
                className="rounded-sm w-auto font-semibold text-theme text-sm px-2.5 py-0.5 bg-theme/15"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
