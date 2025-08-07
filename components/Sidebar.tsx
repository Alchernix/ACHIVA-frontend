"use client";
import Link from "next/link";
import { TextLogo } from "./Logo";
import { HomeIcon, SearchIcon, PostIcon, NotificationIcon } from "./Icons";
import { motion } from "motion/react";
import { useState } from "react";
import { useCurrentUserInfoStore } from "@/store/userStore";
import ProfileImg from "./ProfileImg";

export default function Sidebar() {
  const user = useCurrentUserInfoStore.use.user();
  const [selectedMenu, setSelectedMenu] = useState("홈");
  const MENU_ITEMS = [
    { label: "홈", Icon: HomeIcon },
    { label: "검색", Icon: SearchIcon },
    { label: "글쓰기", Icon: PostIcon },
    { label: "응원함", Icon: NotificationIcon },
    { label: "프로필", Icon: ProfileImg },
  ];
  return (
    <nav className="h-dvh fixed hidden sm:block lg:w-60 py-8 border-r border-r-[#d9d9d9]">
      <div className="mb-15 lg:hidden">
        <Link href="/">
          <h1 className="text-4xl font-bold text-center text-theme">A</h1>
        </Link>
      </div>
      <div className="mb-15 hidden lg:block">
        <Link href="/">
          <TextLogo />
        </Link>
      </div>
      <ul className="flex flex-col gap-8">
        {MENU_ITEMS.map(({ label, Icon }) => {
          const selected = selectedMenu === label;
          return (
            <li
              key={label}
              className={`relative flex items-center gap-3 px-6 cursor-pointer`}
              onClick={() => setSelectedMenu(label)}
            >
              {label !== "프로필" ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Icon fill={selected} />
              ) : (
                <ProfileImg
                  size={32}
                  url={
                    user?.profileImageUrl ??
                    "https://achiva-s3-bucket.s3.ap-northeast-2.amazonaws.com/70350cda-00e1-475b-aa63-a27388f65cdb"
                  }
                />
              )}
              <span
                className={`hidden lg:inline text-lg ${
                  selected ? "font-bold" : ""
                }`}
              >
                {label}
              </span>
              {selected && (
                <motion.div
                  layoutId="navBar"
                  className="absolute inset-0 right-0 border-r-3 border-r-theme"
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
