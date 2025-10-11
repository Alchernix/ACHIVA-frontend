import { cookies } from "next/headers";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import crypto from "node:crypto";
import type { User } from "@/types/User";

type AuthResult = {
  status: string;
  user?: User;
  error?: any;
};

// 서버 컴포넌트에서만 호출하는 함수!!!
const getAuthStatus = cache(
  async function getAuthStatus(): Promise<AuthResult> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      if (!token) {
        return { status: "unauthenticated" };
      }

      // 유저별 캐시 키(토큰 해시 사용: 값 노출 방지)
      const key = crypto
        .createHash("sha256")
        .update(token)
        .digest("base64url")
        .slice(0, 16);

      const getMe = unstable_cache(
        async (t: string) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/me`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${t}`,
              },
            }
          );

          if (response.status === 401) {
            return { status: "unauthenticated" };
          }

          if (!response.ok) {
            throw new Error(`서버 에러 ${response.status}`);
          }
          const { data } = await response.json();
          return { status: "authenticated", user: data };
        },
        // 유저별 캐시 키
        ["me", key],
        { revalidate: 180, tags: ["me"] }
      );
      return await getMe(token);
    } catch (err) {
      // 네트워크 오류 등
      // 나중에 에러 페이지를 보여줘야...
      return { status: "error", error: err };
    }
  }
);

export default getAuthStatus;
