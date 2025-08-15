"use client";
import Link from "next/link";
import type { User } from "@/types/User";
import { usePathname } from "next/navigation";
import { TextLogo } from "./Logo";
import { HomeIcon, SearchIcon, PostIcon, NotificationIcon } from "./Icons";
import { motion } from "motion/react";
import { useState } from "react";
import ProfileImg from "./ProfileImg";

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();

  const initialSelectedMenu = pathname === "/" ? "홈" : "프로필"; // 나중에 바꿔야함
  const [selectedMenu, setSelectedMenu] = useState(initialSelectedMenu);

  const isInvisible =
    /^\/[^/]+\/achievements$/.test(pathname) || // /[nickName]/achievements
    /^\/[^/]+\/friends$/.test(pathname) || // /[nickName]/friends
    /^\/[^/]+\/achievements\/detail$/.test(pathname) || // /[nickName]/achievements/detail
    /^\/[^/]+\/supports$/.test(pathname) || // /[nickName]/supports
    /^\/[^/]+\/supports\/detail$/.test(pathname) || // /[nickName]/supports/detail
    pathname === "/settings" ||
    pathname === "/accounts/edit";

  if (isInvisible) {
    return null; // 렌더링 안 함
  }

  return (
    <nav className="text-theme w-full shadow-[0px_-5px_15px_0_rgba(0,0,0,0.05)] h-auto fixed bottom-0 items-center lg:w-60 py-5 bg-white z-10">
      <div className="hidden mb-15 lg:hidden">
        <Link href="/">
          <h1 className="text-4xl font-bold text-center text-theme">A</h1>
        </Link>
      </div>
      <div className="mb-15 hidden lg:block">
        <Link href="/">
          <TextLogo />
        </Link>
      </div>
      <ul className="flex w-full justify-around ">
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
            icon={<ProfileImg size={32} url={user.profileImageUrl} />}
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
      className={`relative flex items-center gap-3 px-6 cursor-pointer`}
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
          className="absolute inset-0 -top-5 border-t-3 border-t-theme"
        />
      )}
    </li>
  );
}
