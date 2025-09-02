"use client";
import Link from "next/link";
import type { User } from "@/types/User";
import { usePathname } from "next/navigation";
import { TextLogo, Logo } from "./Logo";
import {
  HomeIcon,
  PostIcon,
  SearchIcon,
  NotificationIcon,
  SidebarSettingIcon,
} from "./Icons";
import { motion } from "motion/react";
import ProfileImg from "./ProfileImg";

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  let selected;
  if (pathname === "/") {
    selected = "홈";
  } else if (pathname.startsWith("/settings")) {
    selected = "설정";
  } else if (pathname === "/post/create") {
    selected = "글쓰기";
  } else if (pathname === "/accounts/notification") {
    selected = "응원함";
  } else {
    selected = "프로필";
  }

  const isNavFolded = pathname === "/accounts/notification";

  return (
    <motion.nav
      layoutScroll
      className={`text-theme z-10 h-dvh fixed bottom-0 top-0 flex flex-col items-center w-auto lg:w-60 ${
        isNavFolded ? "!w-auto" : ""
      } py-8 border-r border-r-[#d9d9d9] bg-white`}
    >
      <div
        className={`mb-15 w-full h-[39.29px] flex px-6 justify-start lg:hidden ${
          isNavFolded ? "!block" : ""
        }`}
      >
        <Link href="/" className="h-full flex items-end">
          <Logo />
        </Link>
      </div>
      <div
        className={`mb-15 w-full justify-start px-6 hidden lg:flex ${
          isNavFolded ? "!hidden" : ""
        }`}
      >
        <Link href="/">
          <TextLogo />
        </Link>
      </div>
      <ul className="flex-1 flex flex-col w-full justify-around gap-5">
        <Link href="/">
          <ListItem
            isNavFolded={isNavFolded}
            label="홈"
            icon={<HomeIcon fill={selected === "홈"} />}
            selected={selected === "홈"}
          />
        </Link>
        <Link href="/search" scroll={false}>
          <ListItem
            isNavFolded={isNavFolded}
            label="검색"
            icon={<SearchIcon fill={selected === "검색"} />}
            selected={selected === "검색"}
          />
        </Link>
        <Link href="/post/create" scroll={false}>
          <ListItem
            isNavFolded={isNavFolded}
            label="글쓰기"
            icon={<PostIcon fill={selected === "글쓰기"} />}
            selected={selected === "글쓰기"}
          />
        </Link>
        <Link href="/accounts/notification" scroll={false}>
          <ListItem
            isNavFolded={isNavFolded}
            label="응원함"
            icon={<NotificationIcon fill={selected === "응원함"} />}
            selected={selected === "응원함"}
          />
        </Link>
        <Link href={`/${user.nickName}`}>
          <ListItem
            isNavFolded={isNavFolded}
            label="프로필"
            icon={<ProfileImg size={32} url={user.profileImageUrl} />}
            selected={selected === "프로필"}
          />
        </Link>

        <Link href={`/settings/accounts/password`} className="mt-auto">
          <ListItem
            isNavFolded={isNavFolded}
            label="설정"
            icon={<SidebarSettingIcon fill={selected === "설정"} />}
            selected={selected === "설정"}
          />
        </Link>
      </ul>
    </motion.nav>
  );
}

type ListItemProps = {
  isNavFolded: boolean;
  label: string;
  icon: React.ReactNode;
  selected: boolean;
};

function ListItem({ isNavFolded, label, icon, selected }: ListItemProps) {
  return (
    <li
      key={label}
      className={`relative flex items-center gap-3 px-6 py-1.5 cursor-pointer`}
    >
      <div
        className={`${label === "글쓰기" ? "bg-theme/15 rounded-full" : ""}`}
      >
        {icon}
      </div>

      <span
        className={`hidden lg:inline ${isNavFolded ? "!hidden" : ""} text-lg ${
          selected ? "font-bold" : ""
        }`}
      >
        {label}
      </span>
      {selected && (
        <motion.div
          layoutId="navBar"
          className="absolute inset-0 top-0 right-0 border-r-3 border-r-theme"
        />
      )}
    </li>
  );
}
