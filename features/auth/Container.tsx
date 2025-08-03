import { motion } from "motion/react";

type Props = {
  classes: string;
  children: React.ReactNode;
};
export default function Container({ classes, children }: Props) {
  return (
    <div
      className={`w-screen sm:w-90 ${classes} rounded-[15px] sm:border sm:border-theme px-10 py-7 flex flex-col items-center justify-evenly`}
    >
      {children}
    </div>
  );
}

// 회원가입 시 모바일 UI & 전환 애니메이션 위해 새로 만듦...
export function MobileContainer({ classes, children }: Props) {
  return (
    <div
      className={`w-screen sm:w-90 ${classes} shrink-0 rounded-[15px] sm:border sm:border-theme px-10 py-7 mt-15 sm:mt-0`}
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="w-full h-full flex flex-col items-center sm:justify-evenly"
      >
        {children}
      </motion.div>
    </div>
  );
}
