import Link from "next/link";
import { TextLogo } from "@/components/Logo";
import { AppleIcon, GoogleIcon } from "@/components/Icons";
import Container from "@/features/auth/Container";
import LoginForm from "@/features/auth/LoginForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      <Container classes="h-130">
        <TextLogo />
        <LoginForm />
        <Span>비밀번호 찾기</Span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-theme-gray" />
            <Span>또는</Span>
            <hr className="flex-1 border-theme-gray" />
          </div>
          <div className="flex flex-col gap-2 w-full absolute bottom-10 sm:static">
            <div className="flex items-center gap-2">
              <hr className="flex-1 border-theme-gray" />
              <Span>또는</Span>
              <hr className="flex-1 border-theme-gray" />
            </div>
            <div className="flex justify-center gap-7">
              <div className="scale-75">
                <GoogleIcon />
              </div>
              <div className="scale-75">
                <AppleIcon />
              </div>
            </div>
            <Span>소셜 계정으로 ACHIVA에 로그인하세요</Span>
          </div>
        </Container>
        <Container classes="h-23 hidden sm:block">
          <p className="flex justify-center gap-2">
            <span className="font-light text-center text-black">
              계정이 없으신가요?
            </span>
            <Link
              href="/signup"
              className="font-semibold text-center text-theme"
            >
              가입하기
            </Link>
          </p>
        </Container>
      </div>
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
