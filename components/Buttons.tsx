// 나중에 중복코드 합치자...
import { ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";

type ButtonProps = {
  isSelected: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function CategoryButton({
  isSelected,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`relative px-5 py-1 text-lg rounded-sm font-semibold overflow-hidden border ${
        isSelected
          ? "border-transparent text-white"
          : "text-theme border-[#d9d9d9]"
      }`}
    >
      <span className="relative z-10">{children}</span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 border text-white bg-theme border-theme rounded-sm"
        ></motion.div>
      )}
    </button>
  );
}
