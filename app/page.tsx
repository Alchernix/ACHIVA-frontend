import Onboarding from "@/components/Onboarding";
import AuthHydrator from "@/features/auth/AuthHydrator";
import Home from "@/features/home/Home";
import { cookies } from "next/headers";

// 로그인 상태와 유저정보 반환하는 함수 - 나중에 최적화좀 하자.....
async function getAuthStatus() {
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
          cache: "no-store",
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
  } catch (err) {
    // 네트워크 오류 등
    // 나중에 에러 페이지를 보여줘야...
    return { status: "error", error: err };
  }
}

export default async function Page() {
  const auth = await getAuthStatus();
  switch (auth.status) {
    case "authenticated":
      return (
        <>
          <AuthHydrator user={auth.user} />
          <Home />
        </>
      );
    case "unauthenticated":
      return <Onboarding />;
    case "error":
    default:
      console.error("로그인 확인 에러", auth.error);
      return <Onboarding />;
  }
}
