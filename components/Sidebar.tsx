"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TextLogo } from "./Logo";
import { HomeIcon, SearchIcon, PostIcon, NotificationIcon } from "./Icons";
import { motion } from "motion/react";
import { useState } from "react";
import { useCurrentUserInfoStore } from "@/store/userStore";
import ProfileImg from "./ProfileImg";

export default function Sidebar() {
  const user = useCurrentUserInfoStore.use.user();
  const pathname = usePathname();
  const initialSelectedMenu = pathname === "/" ? "홈" : "프로필"; // 나중에 바꿔야함
  const [selectedMenu, setSelectedMenu] = useState(initialSelectedMenu);

  return (
    <nav className="w-screen shadow-[0_-4px_6px_-3px_rgba(0,0,0,0.1)] sm:shadow-none h-auto sm:w-auto sm:h-dvh fixed bottom-0 sm:top-0 flex sm:flex-col items-center lg:w-60 py-5 sm:py-8 sm:border-r sm:border-r-[#d9d9d9]">
      <div className="hidden sm:block mb-15 lg:hidden">
        <Link href="/">
          <h1 className="text-4xl font-bold text-center text-theme">A</h1>
        </Link>
      </div>
      <div className="mb-15 hidden lg:block">
        <Link href="/">
          <TextLogo />
        </Link>
      </div>
      <ul className="flex sm:flex-col w-full justify-around sm:gap-5">
        <Link href="/">
          <ListItem
            label="홈"
            icon={<HomeIcon fill={selectedMenu === "홈"} />}
            selected={selectedMenu === "홈"}
            onClick={() => setSelectedMenu("홈")}
          />
        </Link>
        <ListItem
          label="검색"
          icon={<SearchIcon fill={selectedMenu === "검색"} />}
          selected={selectedMenu === "검색"}
          onClick={() => setSelectedMenu("검색")}
        />
        <ListItem
          label="글쓰기"
          icon={<PostIcon fill={selectedMenu === "글쓰기"} />}
          selected={selectedMenu === "글쓰기"}
          onClick={() => setSelectedMenu("글쓰기")}
        />
        <ListItem
          label="응원함"
          icon={<NotificationIcon fill={selectedMenu === "응원함"} />}
          selected={selectedMenu === "응원함"}
          onClick={() => setSelectedMenu("응원함")}
        />
        {/* 임시방편.... 나중에 user가 늦게 로딩되는 문제 해결 필요 */}
        <Link href={`/${user?.nickName ?? ""}`}>
          <ListItem
            label="프로필"
            icon={
              <ProfileImg
                size={32}
                url={
                  user?.profileImageUrl ??
                  "https://achiva-s3-bucket.s3.ap-northeast-2.amazonaws.com/70350cda-00e1-475b-aa63-a27388f65cdb"
                }
              />
            }
            selected={selectedMenu === "프로필"}
            onClick={() => setSelectedMenu("프로필")}
          />
        </Link>
      </ul>
    </nav>
  );
}

type ListItemProps = {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
};

function ListItem({ label, icon, selected, onClick }: ListItemProps) {
  return (
    <li
      key={label}
      className={`relative flex items-center gap-3 px-6 sm:py-1.5 cursor-pointer`}
      onClick={onClick}
    >
      {icon}
      <span
        className={`hidden lg:inline text-lg ${selected ? "font-bold" : ""}`}
      >
        {label}
      </span>
      {selected && (
        <motion.div
          layoutId="navBar"
          className="absolute inset-0 -top-5 sm:top-0 sm:right-0 border-t-3 border-t-theme sm:border-t-0 sm:border-r-3 sm:border-r-theme"
        />
      )}
    </li>
  );
}
