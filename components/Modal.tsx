"use client";

import { useRouter } from "next/navigation";
import { CloseIcon } from "./Icons";
import { motion } from "motion/react";
import { useEffect } from "react";
// import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
};

// 패딩 없음... 모달과 닫기 버튼만 띄움...
export default function Modal({ children }: ModalProps) {
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
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="relative rounded-lg bg-white"
      >
        {children}
        <button onClick={router.back} className="absolute top-8 right-8">
          <CloseIcon />
        </button>
      </motion.div>
    </div>
  );
}
