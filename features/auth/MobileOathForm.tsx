"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { NextStepButton } from "./Buttons";
import { format } from "date-fns";
import "swiper/css";
import { useState } from "react";
import { useSignupInfoStore } from "@/store/SignupStore";
import { titles, contents } from "./Oath";
import { defaultProfileImg } from "../user/defaultProfileImg";

export default function MobileOathForm() {
  const user = useSignupInfoStore.use.user();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  async function handleSignUp() {
    setIsLoading(true);
    const payload = {
      email: user.email,
      password: user.password,
      confirmPassword: user.password, // 어차피 클라이언트에서 검증하니 필요없음
      nickName: user.nickName,
      profileImageUrl: defaultProfileImg,
      birth: format(user.birth!, "yyyy-MM-dd"),
      categories: user.categories,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("회원가입 중 서버 에러");
      }
      // 회원가입 후 자동 로그인
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 쿠키 저장
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      if (loginResponse.ok) {
        window.location.href = "/"; // 미들웨어 실행(서버 요청)
      } else {
        throw new Error("로그인 중 서버 에러");
      }
    } catch (err) {
      console.error(err);
      alert(
        "네트워크 혹은 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    }
    setIsLoading(false);
  }
  return (
    <div className="w-full text-center">
      <div className="w-full text-left">
        <p className="font-semibold text-lg">Achiva 문화에 참여해요</p>
        <p className="font-light text-sm text-theme-gray">
          게시물을 오른쪽으로 넘겨 다음 내용을 볼 수 있어요
        </p>
      </div>
      <div className="relative mt-10">
        <div className="absolute top-0 -left-10 w-screen">
          <div className="z-10 text-white absolute top-3.5 right-3.5 text-sm sm:text-xs bg-black/35 rounded-full w-12 sm:w-11 text-center py-1">
            {currentPage}/4
          </div>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            resistanceRatio={0} // ✅ 끝에서 드래그해도 안 밀림
            onSlideChange={(swiper) => setCurrentPage(swiper.activeIndex + 1)}
          >
            {titles.map((title, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-5 relative aspect-square w-full text-left text-white bg-[#A6736F] px-5 pt-15">
                  <h2 className="font-semibold text-3xl">{title}</h2>
                  <pre className="font-[inherit]">{contents[i]}</pre>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="px-10 mt-15">
            <NextStepButton
              disabled={currentPage !== 4}
              isLoading={isLoading}
              onClick={handleSignUp}
            >
              동의하고 시작하기
            </NextStepButton>
          </div>
        </div>
      </div>
    </div>
  );
}
