// 홈 게시글 최신 카테고리 글 불러오기 프록시 api
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const memberId = searchParams.get("id");
  const pageParam = searchParams.get("pageParam");

  const session = await auth();
  const token = session?.accessToken;

  if (!token) {
    return NextResponse.json({ error: "미인증 유저" }, { status: 401 });
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/${memberId}/feed?page=${pageParam}&size=3&sort=createdAt,DESC`,
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
