import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

// 이미지 수정 프록시 api
export async function PUT(req: NextRequest) {
  const { url } = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "미인증 유저" }, { status: 401 });
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/confirm-upload`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url }),
    }
  );
  revalidateTag("me");
  // revalidatePath("/[nickName]/layout");
  // revalidatePath("/[nickName]/page");
  return res;
}
