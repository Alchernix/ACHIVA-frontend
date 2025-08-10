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
  // useEffect(() => {
  //   const prev = document.body.style.overflow;
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = prev;
  //   };
  // }, []);

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
