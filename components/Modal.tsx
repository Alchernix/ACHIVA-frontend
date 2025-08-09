"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon } from "./Icons";
// import { createPortal } from "react-dom";

// 패딩 없음... 모달과 닫기 버튼만 띄움...
export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // 뒷배경 스크롤 막기
    return () => {
      document.body.style.overflow = original; // 원상복구
    };
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <div>
      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg"
        onClose={onDismiss}
      >
        {children}
        <button onClick={onDismiss} className="absolute top-5 right-5">
          <CloseIcon />
        </button>
      </dialog>
    </div>
  );
}
