"use client";
import Link from "next/link";
import type { User } from "@/types/User";
import { usePathname } from "next/navigation";
import { TextLogo } from "./Logo";
import { HomeIcon, PostIcon, SidebarSettingIcon } from "./Icons";
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
  } else {
    selected = "프로필";
  }

  return (
    <motion.nav
      layoutScroll
      className="text-theme z-10 w-screen shadow-[0px_-5px_15px_0_rgba(0,0,0,0.05)] sm:shadow-none h-auto sm:w-auto sm:h-dvh fixed bottom-0 sm:top-0 flex sm:flex-col items-center lg:w-60 py-5 sm:py-8 sm:border-r sm:border-r-[#d9d9d9] bg-white"
    >
      <div className="hidden sm:block mb-15 lg:hidden">
        <Link href="/">
          <h1 className="text-4xl font-bold text-center text-theme">A</h1>
        </Link>
      </div>
      <div className="mb-15 w-full items-start px-6 hidden lg:flex">
        <Link href="/">
          <TextLogo />
        </Link>
      </div>
      <ul className="flex-1 flex sm:flex-col w-full justify-around sm:gap-5">
        <Link href="/">
          <ListItem
            label="홈"
            icon={<HomeIcon fill={selected === "홈"} />}
            selected={selected === "홈"}
          />
        </Link>
        <Link href="/post/create">
          <ListItem
            label="글쓰기"
            icon={<PostIcon fill={selected === "글쓰기"} />}
            selected={selected === "글쓰기"}
          />
        </Link>
        <Link href={`/${user.nickName}`}>
          <ListItem
            label="프로필"
            icon={<ProfileImg size={32} url={user.profileImageUrl} />}
            selected={selected === "프로필"}
          />
        </Link>

        <Link href={`/settings/accounts/password`} className="mt-auto">
          <ListItem
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
  label: string;
  icon: React.ReactNode;
  selected: boolean;
};

function ListItem({ label, icon, selected }: ListItemProps) {
  return (
    <li
      key={label}
      className={`relative flex items-center gap-3 px-6 sm:py-1.5 cursor-pointer`}
    >
      <div
        className={`${label === "글쓰기" ? "bg-theme/15 rounded-full" : ""}`}
      >
        {icon}
      </div>

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
