"use client";
// border + padding + 가운데 정렬 까지만!!
import { motion } from "motion/react";

type Props = {
  classes: string;
  children: React.ReactNode;
};
export default function Container({ classes, children }: Props) {
  return (
    <div
      className={`w-screen sm:w-90 ${classes} rounded-[15px] sm:border sm:border-theme px-10 py-7 flex items-center justify-center`}
    >
      {children}
    </div>
  );
}

type Props2 = {
  motionKey: string;
  classes: string;
  children: React.ReactNode;
};

// 회원가입 시 모바일 UI & 전환 애니메이션 위해 새로 만듦...
export function MobileContainer({ motionKey, classes, children }: Props2) {
  return (
    <div
      className={`w-screen sm:w-90 ${classes} rounded-[15px] sm:border sm:border-theme px-10 py-7 flex items-center justify-center`}
    >
      <motion.div
        initial={
          motionKey !== "BasicInfo"
            ? {
                opacity: 0,
              }
            : false
        }
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="w-full h-full flex flex-col items-center sm:justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
