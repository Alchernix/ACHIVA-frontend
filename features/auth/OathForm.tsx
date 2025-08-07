import { NextStepButton } from "./Buttons";
import { useSignupInfoStore } from "@/store/SignupStore";
import { format } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OathForm() {
  const user = useSignupInfoStore.use.user();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSignUp() {
    setIsLoading(true);
    const payload = {
      email: user.email,
      password: user.password,
      confirmPassword: user.password, // 어차피 클라이언트에서 검증하니 필요없음
      nickName: user.nickName,
      profileImageUrl:
        "https://achiva-s3-bucket.s3.ap-northeast-2.amazonaws.com/70350cda-00e1-475b-aa63-a27388f65cdb",
      birth: format(user.birth!, "yyyy-MM-dd"),
      // gender: "male", // 임시
      // region: "Seoul", // 임시
      categories: user.categories,
      // 임시 기본 프로필
    };
    // console.log(JSON.stringify(payload));
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
      <div>서약서 들어갈 곳</div>
      <NextStepButton isLoading={isLoading} onClick={handleSignUp}>
        완료
      </NextStepButton>
    </div>
  );
}
