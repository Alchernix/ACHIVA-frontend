"use client";
// 모바일용 헤더 - 모바일에서만 보임

import { useRouter } from "next/navigation";
import { BackIcon } from "@/components/Icons";

export default function MobileHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="bg-white w-screen h-14 fixed top-0 left-0 flex items-center justify-center border-b border-b-[#cccccc] sm:hidden z-50">
      <div
        className="absolute top left-4 scale-80 hover:cursor-pointer"
        onClick={router.back}
      >
        <BackIcon />
      </div>
      <p className="font-semibold">{children}</p>
    </div>
  );
}
