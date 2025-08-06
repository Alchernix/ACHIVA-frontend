import Link from "next/link";
import Container from "@/features/auth/Container";
import { MobileContainer } from "@/features/auth/Container";
import { TextLogo } from "@/components/Logo";
import SignupForm from "@/features/auth/SignupForm";
import EmailValidationForm from "./EmailValidation";
import Terms from "./Terms";
import CategoryForm from "./CategoryForm";
import BirthdayForm from "./BirthdayForm";
import MobileHeader from "./MobileHeader";
import OathForm from "./OathForm";

export function BasicInfo() {
  return (
    <>
      <MobileHeader>회원가입</MobileHeader>
      <MobileContainer motionKey="BasicInfo" classes="min-h-135">
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
        <Container classes="h-20">
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
        </Container>
      </div>
    </>
  );
}

export function EmailValidation() {
  return (
    <>
      <MobileHeader>회원가입</MobileHeader>
      <MobileContainer motionKey="EmailValidation" classes="h-151">
        <div className="hidden sm:block mb-15">
          <TextLogo />
        </div>
        <div className="w-full flex flex-col gap-7">
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
      <MobileContainer motionKey="ToS" classes="min-h-151">
        <div className="hidden sm:block mb-10">
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
      <MobileContainer motionKey="Category" classes="h-151">
        <div className="hidden sm:block mb-10">
          <TextLogo />
        </div>
        <CategoryForm />
      </MobileContainer>
    </>
  );
}

export function Birthday() {
  return (
    <>
      <MobileHeader>회원가입</MobileHeader>
      <MobileContainer motionKey="Birthday" classes="h-151">
        <div className="hidden sm:block mb-10">
          <TextLogo />
        </div>
        <BirthdayForm />
      </MobileContainer>
    </>
  );
}

export function Oath() {
  return (
    <>
      <MobileHeader>회원가입</MobileHeader>
      <MobileContainer motionKey="Oath" classes="h-151">
        <div className="hidden sm:block">
          <TextLogo />
        </div>
        <OathForm />
      </MobileContainer>
    </>
  );
}
