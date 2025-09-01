"use client";

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

export default function Modal({
  title = null,
  children,
  onClose = undefined,
}: ModalProps) {
  useEffect(() => {
    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY || window.pageYOffset || 0;

    // 스크롤바 너비 계산(레이아웃 점프 방지)
    const sbw = window.innerWidth - document.documentElement.clientWidth;

    // 기존 스타일 백업
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      paddingRight: document.body.style.paddingRight,
    };

    // 가장 안전한 스크롤 락: body를 fixed로 고정하고 top에 음수 오프셋 적용
    document.body.style.overflow = "hidden"; // 일부 브라우저에서 필요
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;

    return () => {
      // 스타일 복원
      document.body.style.overflow = prev.overflow;
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.width = prev.width;
      document.body.style.paddingRight = prev.paddingRight;

      // 스크롤 위치 복구
      const y = scrollY; // 또는 parseInt(prev.top || "0") * -1
      window.scrollTo(0, y);
    };
  }, []);

  const router = useRouter();
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
      <motion.div
        layout
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{
          type: "spring",
          stiffness: 170,
          damping: 15,
          mass: 0.8,
        }}
        className="relative rounded-lg bg-white p-8 flex flex-col"
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
