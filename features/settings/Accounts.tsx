"use client";

import {
  SettingPasswordIcon,
  SettingBirthdayIcon,
  SettingNextIcon,
} from "@/components/Icons";
import Link from "next/link";
import { handleLogout } from "./handleLogout";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import ModalWithoutCloseBtn from "@/components/ModalWithoutCloseBtn";
// 생년월일 표시 안되게
export default function Accounts() {
  const pathname = usePathname();

  const icons = [SettingPasswordIcon, SettingBirthdayIcon];
  const labels = ["비밀번호 재설정", "생년월일"];
  const links = ["password", "birthday"];

  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col text-theme">
      <ul className="flex flex-col gap-5">
        {labels.slice(0, 1).map((label, i) => {
          const Icon = icons[i];
          return (
            <Link key={label} href={`/settings/accounts/${links[i]}`}>
              <li
                className={`flex items-center gap-5 sm:px-2.5 py-1.5 rounded-md ${
                  pathname === "/settings/accounts/password"
                    ? "bg-[#E6E6E6]"
                    : ""
                }`}
              >
                <Icon />
                <p className="font-semibold text-lg">{label}</p>
                <div className="ml-auto">
                  <SettingNextIcon />
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <button
        onClick={() => setIsCloseModalOpen(true)}
        className="mt-auto font-semibold text-lg text-center text-[#DF171B]"
      >
        계정 삭제하기
      </button>
      {isCloseModalOpen && (
        <ModalWithoutCloseBtn
          title={<p className="w-xs">정말 계정을 삭제하시겠습니까?</p>}
          onClose={() => setIsCloseModalOpen(false)}
        >
          <li className="py-2 cursor-pointer text-[#DF171B] font-semibold">
            <form action={handleLogout}>
              <button onClick={async () => {
              await fetch("/api/auth", { method: "DELETE" });
            }}>삭제</button>
            </form>
          </li>
          <li
            className="py-2 cursor-pointer"
            onClick={() => setIsCloseModalOpen(false)}
          >
            취소
          </li>
        </ModalWithoutCloseBtn>
      )}
    </div>
  );
}
