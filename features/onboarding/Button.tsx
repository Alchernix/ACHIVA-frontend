"use client";

import Link from "next/link";
import { useSignupInfoStore, useSignupStepStore } from "@/store/SignupStore";

export function SignupButton() {
  const resetStep = useSignupStepStore.use.resetStep();
  const resetUser = useSignupInfoStore.use.resetUser();
  return (
    <Link
      onClick={() => {
        resetStep();
        resetUser();
      }}
      href="/signup"
      className="flex-grow-0 flex-shrink-0 w-[359px] h-[46px]"
    >
      <div className="flex justify-center items-center w-[359px] h-[46px] px-[63px] py-2.5 rounded-[5px] bg-white/90">
        <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-center text-theme">
          회원가입
        </p>
      </div>
    </Link>
  );
}
