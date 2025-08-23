import { ButtonHTMLAttributes } from "react";

type NextStepButtonProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function NextStepButton({ children, ...props }: NextStepButtonProps) {
  return (
    <button
      className="w-full h-11 flex items-center justify-center bg-theme text-white rounded-sm font-medium text-lg py-2 disabled:bg-[#f2f2f2] disabled:text-[#b3b3b3]"
      {...props}
    >
      {children}
    </button>
  );
}
