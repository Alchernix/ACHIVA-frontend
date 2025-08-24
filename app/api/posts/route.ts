// 게시글 작성 프록시 api
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { DraftPost } from "@/types/Post";

export async function PUT(req: NextRequest) {
  const { post } = await req.json();
  const draft = post as DraftPost;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "미인증 유저" }, { status: 401 });
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        photoUrl: draft.titleImageUrl,
        title: draft.title,
        category: draft.category,
        question: draft.pages!.map(({ subtitle, content }) => ({
          question: subtitle ?? "",
          content,
        })),
        backgroundColor: draft.backgroundColor
      }),
    }
  );
  return res;
}
