"use client";

import Link from "next/link";
import { useSignupInfoStore, useSignupStepStore } from "@/store/SignupStore";

type SocialLoginBtn = {
  icon: React.ReactNode;
  content: string;
};

export function SocialLoginBtn({ icon, content }: SocialLoginBtn) {
  return (
    <button className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-[46px] gap-2.5 px-[93px] py-2.5 rounded-[5px] border border-white/50">
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative opacity-[0.85]">
        <div className="scale-90">{icon}</div>
        <p className="flex-grow-0 flex-shrink-0 w-[139px] h-[25px] font-light text-center text-white">
          {content}
        </p>
      </div>
    </button>
  );
}

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
      <div className="flex justify-center items-center w-[359px] h-[46px] absolute left-0 top-28 gap-2.5 px-[63px] py-2.5 rounded-[5px] bg-white/90">
        <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-center text-theme">
          회원가입
        </p>
      </div>
    </Link>
  );
}
