import Link from "next/link";
import { MobileContainer } from "@/features/auth/Container";
import { TextLogo } from "@/components/Logo";
import SignupForm from "@/features/auth/SignupForm";
import EmailValidationForm from "./EmailValidation";
import { useSignupInfoStore } from "@/store/SignupStore";
import Terms from "./Terms";
import CategoryForm from "./CategoryForm";
import MobileHeader from "./MobileHeader";

export function BasicInfo() {
  return (
    <>
      <MobileHeader>회원가입</MobileHeader>
      <MobileContainer classes="min-h-135">
        <div className="hidden sm:block">
          <TextLogo />
        </div>
        <div className="w-full text-left sm:hidden mb-5">
          <p className="font-semibold text-lg">회원정보를 입력해주세요.</p>
          {/* <p className="font-light text-sm text-theme-gray">
            가입을 위해 약관에 동의가 필요합니다
          </p> */}
        </div>
        <SignupForm />
      </MobileContainer>
      <div className="hidden sm:flex">
        <MobileContainer classes="h-20">
          <p className="flex justify-center gap-2">
            <span className="font-light text-center text-black">
              계정이 있으신가요?
            </span>
            <Link
              href="/login"
              className="font-semibold text-center text-theme"
            >
              로그인
            </Link>
          </p>
        </MobileContainer>
      </div>
    </>
  );
}

export function EmailValidation() {
  const user = useSignupInfoStore.use.user();

  return (
    <>
      <MobileHeader>회원가입</MobileHeader>
      <MobileContainer classes="h-151">
        <div className="hidden sm:block">
          <TextLogo />
        </div>
        <div className="w-full flex flex-col gap-7">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold break-keep">
              <span className="font-bold">{user.email}</span>으로 인증번호를
              보냈습니다
            </p>
            <p className="font-light text-theme-gray text-sm">
              이메일로 전송된 인증번호를 입력해주세요.
            </p>
          </div>
          <EmailValidationForm />
        </div>
      </MobileContainer>
    </>
  );
}

export function ToS() {
  return (
    <>
      <MobileHeader>회원가입</MobileHeader>
      <MobileContainer classes="min-h-151">
        <div className="hidden sm:block mb-5">
          <TextLogo />
        </div>
        <Terms />
      </MobileContainer>
    </>
  );
}

export function Category() {
  return (
    <>
      <MobileHeader>회원가입</MobileHeader>
      <MobileContainer classes="h-151">
        <div className="hidden sm:block">
          <TextLogo />
        </div>
        <CategoryForm />
      </MobileContainer>
    </>
  );
}
