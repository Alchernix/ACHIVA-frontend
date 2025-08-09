import { cookies } from "next/headers";
import { cache } from "react";

// 서버 컴포넌트에서만 호출하는 함수!!!
const getAuthStatus = cache(async function getAuthStatus() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { status: "unauthenticated" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["me"] },
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
  } catch (err) {
    // 네트워크 오류 등
    // 나중에 에러 페이지를 보여줘야...
    return { status: "error", error: err };
  }
});

export default getAuthStatus;
