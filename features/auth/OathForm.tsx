import { NextStepButton } from "./Buttons";
import { useSignupInfoStore } from "@/store/SignupStore";
import { format } from "date-fns";
import { useState } from "react";
import Oath from "./Oath";
import { SignupBackIcon, SignupNextIcon } from "@/components/Icons";
import { defaultProfileImg } from "../user/defaultProfileImg";

export default function OathForm() {
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
      <div className="relative mt-4 mb-7">
        <Oath currentPage={currentPage} />
        <div
          className={`absolute top-1/2 -translate-y-1/2 -left-8 cursor-pointer ${
            currentPage === 1 ? "hidden" : ""
          }`}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <SignupBackIcon />
        </div>
        <div
          className={`absolute top-1/2 -translate-y-1/2 -right-8 cursor-pointer ${
            currentPage === 4 ? "hidden" : ""
          }`}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <SignupNextIcon />
        </div>
      </div>
      <div className="select-none">
        <NextStepButton
          disabled={currentPage !== 4}
          isLoading={isLoading}
          onClick={handleSignUp}
        >
          동의하고 시작하기
        </NextStepButton>
      </div>
    </div>
  );
}
