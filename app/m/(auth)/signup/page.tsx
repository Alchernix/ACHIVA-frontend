"use client";

import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { useSignupStepStore } from "@/store/SignupStore";
import Link from "next/link";
import MobileHeader from "@/components/MobileHeader";
import Container from "@/features/auth/Container";
import { TextLogo } from "@/components/Logo";
import SignupForm from "@/features/auth/SignupForm";
import EmailValidationForm from "@/features/auth/EmailValidation";
import Terms from "@/features/auth/Terms";
import CategoryForm from "@/features/auth/CategoryForm";
import BirthdayForm from "@/features/auth/BirthdayForm";
import MobileOathForm from "@/features/auth/MobileOathForm";

export default function Page() {
  const currentStep = useSignupStepStore.use.currentStep();
  let containerHeight = "h-151";
  let content;
  switch (currentStep) {
    case 0: // 기본정보
      containerHeight = "min-h-135";
      content = (
        <>
          <div className="hidden sm:block mb-5">
            <TextLogo />
          </div>
          <div className="w-full text-left sm:hidden mb-5">
            <p className="font-semibold text-lg">회원정보를 입력해주세요.</p>
            {/* <p className="font-light text-sm text-theme-gray">
                    가입을 위해 약관에 동의가 필요합니다
                  </p> */}
          </div>
          <SignupForm />
        </>
      );
      break;
    case 1: // 이메일 인증
      content = (
        <>
          <div className="hidden sm:block mb-15">
            <TextLogo />
          </div>
          <div className="w-full flex flex-col gap-7">
            <EmailValidationForm />
          </div>
        </>
      );
      break;
    case 2: // 약관
      containerHeight = "h-auto";
      content = (
        <>
          <div className="hidden sm:block mb-10">
            <TextLogo />
          </div>
          <Terms />
        </>
      );
      break;
    case 3: // 카테고리
      content = (
        <>
          <div className="hidden sm:block mb-10">
            <TextLogo />
          </div>
          <CategoryForm />
        </>
      );
      break;
    case 4: // 생일
      content = (
        <>
          <div className="hidden sm:block mb-10">
            <TextLogo />
          </div>
          <BirthdayForm />
        </>
      );
      break;
    case 5: // 서약서
      content = (
        <>
          <div className="hidden sm:block">
            <TextLogo />
          </div>
          <MobileOathForm />
        </>
      );
  }

  return (
    <div className="overflow-x-hidden w-full min-h-dvh flex flex-col gap-3 items-center pt-15 sm:pt-0 justify-start sm:justify-center">
      <div className="w-full fixed top-0 left-0">
        <MobileHeader>회원가입</MobileHeader>
      </div>
      <Container classes={containerHeight}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={
              currentStep !== 0
                ? {
                    opacity: 0,
                  }
                : false
            }
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="w-full h-full flex flex-col items-center sm:justify-center"
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </Container>
      {currentStep === 0 && (
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
      )}
    </div>
  );
}
