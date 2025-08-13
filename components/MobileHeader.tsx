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
    <div className="relative bg-white w-full h-14 mb-5 flex items-center justify-center border-b border-b-[#cccccc] z-50">
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
