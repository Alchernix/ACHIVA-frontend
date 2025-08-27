import Link from "next/link";
import { TextLogo } from "@/components/Logo";
import Container from "@/features/auth/Container";
import LoginForm from "@/features/auth/LoginForm";
import MobileHeader from "@/components/MobileHeader";

export default function Page() {
  return (
    <div className="w-full h-full items-center justify-center flex flex-col gap-3">
      <div className="w-full fixed top-0 left-0">
        <MobileHeader>로그인</MobileHeader>
      </div>
      <Container classes="h-130">
        <div className="flex flex-col w-full items-center">
          <div className="mb-15 sm:mb-7">
            <TextLogo />
          </div>
          <LoginForm />
          {/* <div className="flex gap-3 mt-5 mb-25 sm:my-7">
            <Span>비밀번호를 잊으셨나요?</Span>
            <span className="text-sm font-medium">비밀번호 찾기</span>
          </div> */}
        </div>
      </Container>
      <Container classes="h-23 hidden sm:flex">
        <p className="text-center flex gap-2">
          <span className="font-light text-center text-black">
            계정이 없으신가요?
          </span>
          <Link href="/signup" className="font-semibold text-center text-theme">
            가입하기
          </Link>
        </p>
      </Container>
    </div>
  );
}

function Span({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-center font-light text-sm text-black">
      {children}
    </span>
  );
}
