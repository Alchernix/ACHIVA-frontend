// 카테고리별 게시글 불러오기 프록시 api
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const pageParam = searchParams.get("pageParam");
  const userId = searchParams.get("id");
  const sort = searchParams.get("sort");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "미인증 유저" }, { status: 401 });
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/${userId}/categories/${category}/articles?page=${pageParam}&size=9&sort=createdAt,${sort}`,
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
