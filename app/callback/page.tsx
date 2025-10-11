// 인증 절차 후 돌아오는 콜백 페이지
"use client";

import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useAuth } from "react-oidc-context";

export default function Page() {
  const auth = useAuth();
  const router = useRouter();

  const handleAuth = useCallback(
    async function handleAuth() {
      const token = auth.user?.access_token ?? "";
      const idToken = auth.user?.id_token ?? "";

      // 쿠키에 따로 저장(로그인)
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, idToken }),
      });

      const response = await fetch("/api/members/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response.status === 428) {
        // 아직 회원가입 완료 안 되었을 경우, 마저 할 수 있게 함
        router.replace("/signup");
        return;
      }
      router.replace("/");
    },
    [auth.user, router]
  );

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      handleAuth();
    }
  }, [auth, router, handleAuth]);

  if (auth.error) {
    console.log(auth.error);
    return <div>로그인 에러</div>;
  }

  // 로딩이 너무 오래 걸림... 별도의 로딩 UI 보여줄 수 없을까
  return <Loading />;
}
