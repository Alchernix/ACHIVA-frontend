import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname !== "/") return NextResponse.next();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.rewrite(new URL("/onboarding", req.url));
  }
  try {
    const res = await fetch(
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
    if (res.status === 401) {
      return NextResponse.rewrite(new URL("/onboarding", req.url));
    }
    if (!res.ok) {
      console.error("로그인 API 에러", res);
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL("/home", req.url));
  } catch (err) {
    // 네트워크 오류 등
    console.error("Fetch error in middleware:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/"],
};
