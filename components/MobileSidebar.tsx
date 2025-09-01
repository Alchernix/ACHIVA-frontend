"use client";
import Link from "next/link";
import type { User } from "@/types/User";
import { usePathname } from "next/navigation";
import { TextLogo } from "./Logo";
import { HomeIcon, PostIcon } from "./Icons";
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

  const isInvisible =
    /^\/[^/]+\/achievements$/.test(pathname) || // /[nickName]/achievements
    /^\/[^/]+\/friends$/.test(pathname) || // /[nickName]/friends
    /^\/[^/]+\/achievements\/detail$/.test(pathname) || // /[nickName]/achievements/detail
    /^\/[^/]+\/supports$/.test(pathname) || // /[nickName]/supports
    /^\/[^/]+\/supports\/detail$/.test(pathname) || // /[nickName]/supports/detail
    pathname === "/post/create" ||
    pathname.startsWith("/settings") ||
    pathname === "/accounts/edit";

  if (isInvisible) {
    return null; // 렌더링 안 함
  }

  return (
    <motion.nav
      layoutScroll
      className="text-theme w-full shadow-[0px_-5px_15px_0_rgba(0,0,0,0.05)] h-auto fixed bottom-0 items-center lg:w-60 py-5 bg-white z-50"
    >
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
            icon={<HomeIcon fill={selected === "홈"} />}
            selected={selected === "홈"}
          />
        </Link>
        {/* <ListItem
          label="검색"
          icon={<SearchIcon fill={selected === "검색"} />}
          selected={selected === "검색"}
        /> */}
        <Link href="/post/create">
          <ListItem
            label="글쓰기"
            icon={<PostIcon fill={selected === "글쓰기"} />}
            selected={selected === "글쓰기"}
          />
        </Link>
        {/* <ListItem
          label="응원함"
          icon={<NotificationIcon fill={selected === "응원함"} />}
          selected={selected === "응원함"}
        /> */}
        {/* 임시방편.... 나중에 user가 늦게 로딩되는 문제 해결 필요 */}
        <Link href={`/${user?.nickName ?? ""}`}>
          <ListItem
            label="프로필"
            icon={<ProfileImg size={32} url={user.profileImageUrl} />}
            selected={selected === "프로필"}
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
      className={`relative flex items-center gap-3 px-6 cursor-pointer`}
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
          className="absolute inset-0 -top-5 border-t-3 border-t-theme"
        />
      )}
    </li>
  );
}
