import { ButtonHTMLAttributes } from "react";
import { LoadingIcon } from "@/components/Icons";

type NextStepButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function NextStepButton({
  children,
  isLoading = false,
  ...props
}: NextStepButtonProps) {
  return (
    <button
      className="w-full h-11 flex items-center justify-center bg-theme text-white rounded-sm font-medium text-lg py-2 disabled:bg-[#f2f2f2] disabled:text-[#b3b3b3]"
      {...props}
    >
      {isLoading ? <LoadingIcon /> : children}
    </button>
  );
}
