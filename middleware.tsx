import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(req: NextRequest) {
  const { device } = userAgent(req);
  const isMobile = device.type === "mobile" || device.type === "tablet";
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots")
  ) {
    return NextResponse.next();
  }
  const token = req.cookies.get("token")?.value;
  let isLoggedIn = false;

  if (token) {
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

      if (apiRes.ok) {
        isLoggedIn = true;
      }
    } catch (err) {
      console.error("로그인 체크 API 에러:", err);
    }
  }

  // -------------------------
  // 1. 로그인 안 된 유저는 "/"로 강제 리다이렉트
  // -------------------------
  if (
    !isLoggedIn &&
    pathname !== "/" &&
    pathname !== "/login" &&
    pathname !== "/signup"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // -------------------------
  // 2. "/" 경로 처리
  // -------------------------
  if (pathname === "/") {
    if (!isLoggedIn) {
      return NextResponse.rewrite(new URL("/onboarding", req.url));
    }

    if (isMobile) {
      return NextResponse.rewrite(new URL("/m/home", req.url));
    } else {
      return NextResponse.rewrite(new URL("/home", req.url));
    }
  }

  // -------------------------
  // 3. 모바일이면 모든 경로를 /m/... 로 rewrite
  // -------------------------
  if (isMobile) {
    const url = req.nextUrl.clone();
    url.pathname = `/m${pathname}`;
    const res = NextResponse.rewrite(url);

    res.headers.set(
      "Vary",
      "User-Agent, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Viewport-Width"
    );

    return res;
  }

  // -------------------------
  // 4. 데스크탑은 그대로 진행
  // -------------------------
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // 모든 경로 적용
};
