"use client";
// 아래에서 올라오는 모달
import { useRouter } from "next/navigation";
import { CloseIcon } from "./Icons";
import { motion } from "motion/react";
import { useEffect } from "react";
// import { createPortal } from "react-dom";

type ModalProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  onClose?: (() => void) | undefined;
};

export default function MobileModal({
  title = null,
  children,
  onClose = undefined,
}: ModalProps) {
  useEffect(() => {
    // 현재 스크롤바 너비 계산
    const sbw = window.innerWidth - document.documentElement.clientWidth;

    // 기존 스타일 백업
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // 스크롤 잠금 + 우측 패딩 보정
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  const router = useRouter();
  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/50">
      <motion.div
        layout
        initial={{
          y: typeof window !== "undefined" ? window.innerHeight : 100,
        }}
        animate={{ y: 0 }}
        exit={{ y: typeof window !== "undefined" ? window.innerHeight : 100 }}
        transition={{
          duration: 0.3,
          ease: "easeOut", // 스르륵 올라오게
        }}
        className="relative rounded-t-lg bg-white p-8 flex flex-col"
      >
        <div className="flex items-center justify-center relative w-full">
          <div className="font-bold text-xl w-full">{title}</div>
          <button
            onClick={onClose ?? router.back}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </motion.div>
    </div>
  );
}
