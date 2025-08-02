import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function NextStepButton({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full font-medium text-white bg-theme rounded-sm px-3 py-1.5 disabled:bg-[#e6e6e6] disabled:text-[#a6a6a6]"
    >
      {children}
    </button>
  );
}
