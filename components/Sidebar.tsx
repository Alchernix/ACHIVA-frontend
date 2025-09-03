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
import { AnimatePresence, motion } from "motion/react";
import ProfileImg from "./ProfileImg";
import { useState } from "react";
import Drawer from "./Drawer";
import Notifications from "@/features/user/Notifications";

export default function Sidebar({ user }: { user: User }) {
  const [openedDrawer, setOpenedDrawer] = useState<"검색" | "응원함" | null>(
    null
  );

  const drawerContent =
    openedDrawer === "검색" ? (
      <Drawer title="검색" onClose={() => setOpenedDrawer(null)}>
        <div className="w-full h-full flex items-center justify-center text-[#808080]">
          아직 준비중인 기능이에요.
        </div>
      </Drawer>
    ) : (
      <Drawer title="응원함" onClose={() => setOpenedDrawer(null)}>
        <Notifications />
      </Drawer>
    );

  const pathname = usePathname();
  let selected;
  if (openedDrawer === "응원함") {
    selected = "응원함";
  } else if (openedDrawer === "검색") {
    selected = "검색";
  } else if (pathname === "/") {
    selected = "홈";
  } else if (pathname.startsWith("/settings")) {
    selected = "설정";
  } else if (pathname === "/post/create") {
    selected = "글쓰기";
  } else {
    selected = "프로필";
  }

  return (
    <>
      <motion.nav
        layoutScroll
        className={`text-theme z-10 h-dvh fixed bottom-0 top-0 flex flex-col items-center w-auto lg:w-60 ${
          openedDrawer ? "!w-auto" : ""
        } py-8 border-r border-r-[#d9d9d9] bg-white`}
      >
        <div
          className={`mb-15 w-full h-[39.29px] flex px-6 justify-start lg:hidden ${
            openedDrawer ? "!block" : ""
          }`}
        >
          <Link href="/" className="h-full flex items-end">
            <Logo />
          </Link>
        </div>
        <div
          className={`mb-15 w-full justify-start px-6 hidden lg:flex ${
            openedDrawer ? "!hidden" : ""
          }`}
        >
          <Link href="/">
            <TextLogo />
          </Link>
        </div>
        <ul className="flex-1 flex flex-col w-full justify-around gap-5">
          <Link href="/">
            <ListItem
              isNavFolded={!!openedDrawer}
              label="홈"
              icon={<HomeIcon fill={selected === "홈"} />}
              selected={selected === "홈"}
            />
          </Link>
          <button onClick={() => setOpenedDrawer("검색")}>
            <ListItem
              isNavFolded={!!openedDrawer}
              label="검색"
              icon={<SearchIcon fill={selected === "검색"} />}
              selected={selected === "검색"}
            />
          </button>
          <Link href="/post/create" scroll={false}>
            <ListItem
              isNavFolded={!!openedDrawer}
              label="글쓰기"
              icon={<PostIcon fill={selected === "글쓰기"} />}
              selected={selected === "글쓰기"}
            />
          </Link>
          <button onClick={() => setOpenedDrawer("응원함")}>
            <ListItem
              isNavFolded={!!openedDrawer}
              label="응원함"
              icon={<NotificationIcon fill={selected === "응원함"} />}
              selected={selected === "응원함"}
            />
          </button>
          <Link href={`/${user.nickName}`}>
            <ListItem
              isNavFolded={!!openedDrawer}
              label="프로필"
              icon={<ProfileImg size={32} url={user.profileImageUrl} />}
              selected={selected === "프로필"}
            />
          </Link>

          <Link href={`/settings/accounts/password`} className="mt-auto">
            <ListItem
              isNavFolded={!!openedDrawer}
              label="설정"
              icon={<SidebarSettingIcon fill={selected === "설정"} />}
              selected={selected === "설정"}
            />
          </Link>
        </ul>
      </motion.nav>
      <AnimatePresence>{openedDrawer && drawerContent}</AnimatePresence>
    </>
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
