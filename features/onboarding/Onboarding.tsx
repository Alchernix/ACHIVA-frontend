"use client";

import { useSignupInfoStore, useSignupStepStore } from "@/store/SignupStore";
import { handleSignIn } from "./handleSignIn";
import { TextLogoWhite } from "@/components/Logo";

export default function Onboarding() {
  const resetStep = useSignupStepStore.use.resetStep();
  const resetUser = useSignupInfoStore.use.resetUser();

  return (
    <div className="h-dvh bg-theme flex flex-col items-center p-10">
      <div className="my-auto">
        <h1 className="w-[196px] h-[55px] text-4xl font-bold flex justify-center text-white">
          <TextLogoWhite />
        </h1>
        <div className="w-[196px] h-[65px] text-xl font-thin text-center text-white">
          <p>성취를 나누고 응원하는</p>
          <p>새로운 공간</p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-[359px] relative gap-5">
        <form action={handleSignIn}>
          <button
            onClick={async () => {
              resetStep();
              resetUser();
            }}
            className="flex-grow-0 flex-shrink-0 w-[359px] h-[46px]"
          >
            <div className="flex justify-center items-center w-[359px] h-[46px] px-[63px] py-2.5 rounded-[5px] bg-white/90">
              <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-center text-theme">
                회원가입
              </p>
            </div>
          </button>
        </form>

        <div className="self-stretch flex-grow-0 flex-shrink-0 w-[359px] h-[23px] text-base text-center flex justify-center items-center gap-2">
          <span className=" text-sm text-center text-white/50">
            이미 계정이 있나요?
          </span>
          <form action={handleSignIn}>
            <button>
              <span className=" h-[23px] text-sm font-bold text-center text-white">
                로그인
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
