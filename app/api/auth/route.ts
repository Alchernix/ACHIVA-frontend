import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

// 회원정보 수정 프록시 api
export async function PUT(req: NextRequest) {
  const { user } = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "미인증 유저" }, { status: 401 });
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user }),
  });
  console.log(user);
  //const { data } = await res.json();
  //console.log(data);
  const me = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const meData = await me.json();
  console.log(meData);
  revalidateTag("me");
  // revalidatePath("/[nickName]/layout");
  // revalidatePath("/[nickName]/page");
  return res;
}
