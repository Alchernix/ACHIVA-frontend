import Link from "next/link";
import { AppleIcon, GoogleIcon, BackIcon } from "@/components/Icons";
import Container from "@/features/auth/Container";
import LoginForm from "@/features/auth/LoginForm";

export default function Page() {
  return (
    <div className="h-full w-full flex flex-1 flex-col items-center justify-center">
      <div className="w-full h-14 absolute top-0 flex items-center justify-center border-b border-b-[#cccccc] sm:hidden">
        <div className="absolute top left-4 scale-80">
          <BackIcon />
        </div>
        <p className="font-semibold">이메일로 로그인</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Container classes="h-130">
          <h1 className="w-[362px] text-4xl font-bold text-center text-theme mb-15 sm:mb-0">
            ACHIVA
          </h1>
          <LoginForm />
          <div className="mt-5 sm:mt-0">
            <Span>비밀번호 찾기</Span>
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
