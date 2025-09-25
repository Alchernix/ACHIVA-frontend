import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import type { User } from "@/types/User";
import type { FriendData } from "@/types/Friends";

// 친구 목록 가져오기 + 캐시
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nickName = searchParams.get("nickName");
  const userCache = new Map<number, User | undefined>();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  async function getFriends() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api2/friendships/${nickName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return (await res.json()).data as FriendData[]; // 친구신청 목록 배열
  }

  async function getUser() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api2/members/${nickName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return (await res.json()).data as User; // 해당 페이지의 유저 id를 얻기 위해....
  }

  const [friends, user] = await Promise.all([getFriends(), getUser()]);

  await Promise.all(
    friends.map(async (friend) => {
      const id =
        user.id === friend.receiverId ? friend.requesterId : friend.receiverId;
      if (!userCache.has(id)) {
        userCache.set(id, undefined);
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userJson = await userRes.json();
        userCache.set(id, userJson.data);
        return userJson;
      }
    })
  );

  const response = {
    friends,
    user,
    userCache: Object.fromEntries(userCache),
  };

  return Response.json(response);
}

// 친구신청
export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "미인증 유저" }, { status: 401 });
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/friendships`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        recieverId: userId,
      }),
    }
  );

  revalidateTag("friends");
  return res;
}
