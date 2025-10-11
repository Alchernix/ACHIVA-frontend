import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, idToken } = await req.json();
    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // 전역 쿠키
      maxAge: 60 * 60, // 1시간
    });
    res.cookies.set({
      name: "idToken",
      value: idToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // 전역 쿠키
      maxAge: 60 * 60, // 1시간
    });
    return res;
  } catch (err) {
    // fetch 자체 실패, JSON 파싱 실패 등 예기치 못한 에러
    console.error("Login Route Error:", err);
    return NextResponse.json({ error: "Next.js 에러" }, { status: 500 });
  }
}
