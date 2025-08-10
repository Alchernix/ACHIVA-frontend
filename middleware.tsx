import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(req: NextRequest) {
  const { device } = userAgent(req);
  const isMobile = device.type === "mobile" || device.type === "tablet";
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots")
  ) {
    return NextResponse.next();
  }

  // -------------------------
  // 1. 홈(/) → 온보딩/홈 분기 (모바일·데스크탑 공통)
  // -------------------------
  if (pathname === "/") {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.rewrite(new URL("/onboarding", req.url));
    }

    try {
      const apiRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (apiRes.status === 401) {
        return NextResponse.rewrite(new URL("/onboarding", req.url));
      }
      if (!apiRes.ok) {
        console.error("로그인 API 에러", apiRes.status);
        return NextResponse.next();
      }

      return NextResponse.rewrite(new URL("/home", req.url));
    } catch (err) {
      console.error("Fetch error in middleware:", err);
      return NextResponse.next();
    }
  }

  // -------------------------
  // 2. 모바일이면 모든 경로를 /m/...로 rewrite
  // -------------------------
  if (isMobile) {
    const url = req.nextUrl.clone();
    url.pathname = `/m${pathname}`;
    const res = NextResponse.rewrite(url);

    // 캐시 안전
    res.headers.set(
      "Vary",
      "User-Agent, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Viewport-Width"
    );

    return res;
  }

  // -------------------------
  // 3. 데스크탑은 그대로 진행
  // -------------------------
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // 모든 경로에 대해 실행
};
