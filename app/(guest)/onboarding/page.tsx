import Link from "next/link";
import { SignupButton } from "@/features/onboarding/Button";

export default function Page() {
  return (
    <div className="h-dvh bg-theme flex flex-col items-center p-10">
      <div className="my-auto">
        <h1 className="w-[196px] h-[55px] text-4xl font-bold text-center text-white">
          ACHIVA
        </h1>
        <div className="w-[196px] h-[65px] text-xl font-thin text-center text-white">
          <p>성취를 나누고 응원하는</p>
          <p>새로운 공간</p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center w-[359px] relative gap-5">
        <SignupButton />
        <p className="self-stretch flex-grow-0 flex-shrink-0 w-[359px] h-[23px] text-base text-center flex justify-center items-center gap-2">
          <span className=" text-sm text-center text-white/50">
            이미 계정이 있나요?
          </span>
          <Link href="/login">
            <span className=" h-[23px] text-sm font-bold text-center text-white">
              로그인
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
