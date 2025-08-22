// 게시글 불러오기 프록시 api
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  // 나중에 id로 조회하도록 바꿔야...
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get("pageParam");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "미인증 유저" }, { status: 401 });
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles/my-articles?page=${pageParam}&size=9&sort=createdAt,DESC`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res;
}
