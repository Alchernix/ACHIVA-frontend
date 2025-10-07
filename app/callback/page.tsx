// 인증 절차 후 돌아오는 콜백 페이지
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

export default function Page() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      const token = auth.user?.access_token ?? "";
      const idToken = auth.user?.id_token ?? "";

      fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, idToken }),
      }).then(() => {
        // 로그인/회원가입 완료 후 해당 경로로 리다이렉트
        const rawState = auth.user?.state;
        let from = "/";
        if (
          rawState &&
          typeof rawState === "object" &&
          "from" in rawState &&
          typeof rawState.from === "string"
        ) {
          from = rawState.from;
        }
        router.replace(from);
      });
    }
  }, [auth, router]);

  if (auth.error) {
    return <div>로그인 에러</div>;
  }

  return <div>로그인 처리 중</div>;
}
