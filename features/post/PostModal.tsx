// 패딩 없음
// 모달 바깥 누르면 닫힘
"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useEffect } from "react";
// import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode; // 버튼 목록을 받음
};

export default function PostModal({ children }: ModalProps) {
  const router = useRouter();
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

  return (
    <div
      onClick={router.back}
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
    >
      <button className="absolute top-5 right-5">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.7074 18.2921C19.8004 18.385 19.8741 18.4953 19.9243 18.6167C19.9746 18.7381 20.0005 18.8682 20.0005 18.9996C20.0005 19.131 19.9746 19.2611 19.9243 19.3825C19.8741 19.5039 19.8004 19.6142 19.7074 19.7071C19.6145 19.8 19.5042 19.8737 19.3828 19.924C19.2614 19.9743 19.1313 20.0001 18.9999 20.0001C18.8686 20.0001 18.7384 19.9743 18.6171 19.924C18.4957 19.8737 18.3854 19.8 18.2924 19.7071L9.99995 11.4133L1.70745 19.7071C1.5198 19.8947 1.26531 20.0001 0.999946 20.0001C0.734582 20.0001 0.480086 19.8947 0.292446 19.7071C0.104805 19.5194 -0.000610346 19.2649 -0.000610352 18.9996C-0.000610357 18.7342 0.104805 18.4797 0.292446 18.2921L8.5862 9.99958L0.292446 1.70708C0.104805 1.51944 -0.000610352 1.26494 -0.000610352 0.999579C-0.000610352 0.734215 0.104805 0.47972 0.292446 0.292079C0.480086 0.104439 0.734582 -0.000976562 0.999946 -0.000976562C1.26531 -0.000976562 1.5198 0.104439 1.70745 0.292079L9.99995 8.58583L18.2924 0.292079C18.4801 0.104439 18.7346 -0.000976568 18.9999 -0.000976562C19.2653 -0.000976557 19.5198 0.104439 19.7074 0.292079C19.8951 0.47972 20.0005 0.734215 20.0005 0.999579C20.0005 1.26494 19.8951 1.51944 19.7074 1.70708L11.4137 9.99958L19.7074 18.2921Z"
            fill="white"
          />
        </svg>
      </button>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{
          type: "spring",
          stiffness: 170,
          damping: 15,
          mass: 0.8,
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-lg bg-white"
      >
        {children}
      </motion.div>
    </div>
  );
}
