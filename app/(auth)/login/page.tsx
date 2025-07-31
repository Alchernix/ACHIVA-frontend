"use client";

import { useState } from "react";
import Link from "next/link";
import { AppleIcon, GoogleIcon } from "@/components/Icons";
import Container from "@/features/auth/Container";

export default function Page() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <Container classes="h-130">
        <h1 className="w-[362px] text-4xl font-bold text-center text-theme">
          ACHIVA
        </h1>
        <form className="flex flex-col gap-2.5 w-full">
          <Input
            placeholder="이메일 입력"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Input
            placeholder="비밀번호 입력"
            type="password"
            value={pwd}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPwd(e.target.value)
            }
          />
          <button
            className="text-white bg-theme rounded-[5px] px-3 py-1.5 disabled:bg-theme-gray"
            disabled={!email || !pwd}
          >
            로그인
          </button>
        </form>
        <Span>비밀번호 찾기</Span>
        <div className="flex flex-col gap-2">
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
      <Container classes="h-23">
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
  return <span className="font-light text-sm text-black">{children}</span>;
}

function Input({ ...props }) {
  return (
    <input
      className="text-sm w-full border border-theme-gray rounded-[5px] px-3 py-1.5 placeholder:text-theme-gray placeholder:font-light"
      {...props}
    />
  );
}
