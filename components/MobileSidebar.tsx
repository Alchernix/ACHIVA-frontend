"use client";
import Link from "next/link";
import type { User } from "@/types/User";
import { usePathname } from "next/navigation";
import { TextLogo } from "./Logo";
import {
  HomeIcon,
  GoalIcon,
  FeedIcon,
  SideBarHeartIcon,
  MyPageIcon,
} from "./Icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Drawer from "./Drawer";
import Notifications from "@/features/user/Notifications";

export default function Sidebar({ user }: { user: User }) {
  const [openedDrawer, setOpenedDrawer] = useState<"응원" | null>(
    null
  );
  const [isClosing, setIsClosing] = useState(false);

  // flickering 제거 위한 코드
  const handleCloseDrawer = () => {
    setIsClosing(true);
    setOpenedDrawer(null);
  };

  const handleExitComplete = () => {
    setIsClosing(false);
  };

  const drawerContent = (
      <Drawer title="응원" onClose={handleCloseDrawer}>
        <Notifications />
      </Drawer>
    );

  const pathname = usePathname();
  
  let selected;
  if (openedDrawer === "응원" || isClosing) {
    selected = "응원";
  } else if (pathname === `/${user.nickName}`) {
    selected = "홈";
  } else if (pathname.startsWith(`/${user.nickName}/goals`)) {
    selected = "목표";
  } else if (pathname.startsWith('/settings')) {
    selected = "MY";
  // 현재는 피드가 기본화면에 묶여 있어서 이렇게 처리했는데
  // 나중에 기능 추가되면 아마 다른 페이지로 분리될 거 같아서 그때 다시 수정해야할듯?
  } else {
    selected = "피드";
  }

  const isInvisible =
    /^\/[^/]+\/achievements$/.test(pathname) || // /[nickName]/achievements
    /^\/[^/]+\/friends$/.test(pathname) || // /[nickName]/friends
    /^\/[^/]+\/achievements\/detail$/.test(pathname) || // /[nickName]/achievements/detail
    /^\/[^/]+\/supports$/.test(pathname) || // /[nickName]/supports
    /^\/[^/]+\/supports\/detail$/.test(pathname) || // /[nickName]/supports/detail
    pathname === "/post/create" ||
    pathname.startsWith("/settings") ||
    pathname === "/accounts/edit" ||
    pathname.startsWith("/post");

  if (isInvisible) {
    return null; // 렌더링 안 함
  }

  return (
    <>
      <motion.nav
        layoutScroll
        className="text-theme w-full shadow-[0px_-5px_15px_0_rgba(0,0,0,0.05)] h-auto fixed bottom-0 items-center bg-white z-50"
      >
        <ul className="flex w-full justify-around px-[7px] py-[19px]">
          <Link href={`/${user.nickName}`}>
            <ListItem
              label="홈"
              icon={<HomeIcon fill={selected === "홈"} />}
              selected={selected === "홈"}
            />
          </Link>
          <Link href={`/${user.nickName}/goals`}>
            <ListItem
              label="목표"
              icon={<GoalIcon fill={selected === "목표"} />}
              selected={selected === "목표"}
            />
          </Link>
          <Link href="/">
            <ListItem
              label="피드"
              icon={<FeedIcon fill={selected === "피드"} />}
              selected={selected === "피드"}
            />
          </Link>
          <button onClick={() => setOpenedDrawer("응원")}>
            <ListItem
              label="응원"
              icon={<SideBarHeartIcon fill={selected === "응원"} />}
              selected={selected === "응원"}
            />
          </button>
          <Link href={`/settings/accounts/password`}>
            <ListItem
              label="MY"
              icon={<MyPageIcon fill={selected === "MY"} />}
              selected={selected === "MY"}
            />
          </Link>
        </ul>
      </motion.nav>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {openedDrawer && drawerContent}
      </AnimatePresence>
    </>
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
      className="relative flex flex-col items-center gap-1 cursor-pointer w-8"
    >
      {selected && (
        <motion.div
          layoutId="mobileNavBar"
          className="absolute -top-[19px] left-0 right-0 h-[3px] bg-theme rounded-b-sm"
        />
      )}
      <div className="w-8 h-8 flex items-center justify-center">
        {icon}
      </div>
      <span
        className={`text-[15px] leading-[18px] whitespace-nowrap ${
          selected ? "font-semibold" : "font-light"
        }`}
      >
        {label}
      </span>
    </li>
  );
}
