import Link from "next/link";
import Container from "@/features/auth/Container";
import { TextLogo } from "@/components/Logo";
import SignupForm from "@/features/auth/SignupForm";
import EmailValidationForm from "./EmailValidation";
import { useSignupInfoStore } from "@/store/SignupStore";

export function BasicInfo() {
  return (
    <>
      <Container classes="h-135">
        <TextLogo />
        <SignupForm />
      </Container>
      <Container classes="h-20">
        <p className="text-center flex gap-2">
          <span className="font-light text-center text-black">
            계정이 있으신가요?
          </span>
          <Link href="/login" className="font-semibold text-center text-theme">
            로그인
          </Link>
        </p>
      </Container>
    </>
  );
}

export function EmailValidation() {
  const user = useSignupInfoStore.use.user();

  return (
    <Container classes="h-151">
      <TextLogo />
      <div className="w-full flex flex-col gap-7">
        <div className="flex flex-col gap-1 text-center">
          <p className="text-xl break-keep">
            <span className="font-bold">{user.email}</span>으로 인증번호를
            보냈습니다
          </p>
          <p className="font-light text-theme-gray text-sm">
            이메일로 전송된 인증번호를 입력해주세요.
          </p>
        </div>
        <EmailValidationForm />
      </div>
    </Container>
  );
}
