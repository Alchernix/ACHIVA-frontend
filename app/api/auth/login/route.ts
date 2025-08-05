import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.status == 400) {
      return NextResponse.json(
        { error: "아이디 또는 비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }
    if (!response.ok) {
      return NextResponse.json(
        { error: "로그인 중 서버 에러" },
        { status: response.status }
      );
    }

    const token = response.headers.get("authorization") ?? "";
    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // 전역 쿠키
      maxAge: 60 * 60 * 24 * 7, // 7일
    });
    return res;
  } catch (err) {
    // fetch 자체 실패, JSON 파싱 실패 등 예기치 못한 에러
    console.error("Login Route Error:", err);
    return NextResponse.json({ error: "Next.js 에러" }, { status: 500 });
  }
}
