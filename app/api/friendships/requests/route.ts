// 받은 친구 신청 목록 조회
import { cookies } from "next/headers";
import type { User } from "@/types/User";
import type { FriendData } from "@/types/Friends";

// 목록 가져오기 + 캐시
export async function GET() {
  const userCache = new Map<number, User | undefined>();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  async function getFriends() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/friendships/requests`,
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

  const friends = await getFriends();

  await Promise.all(
    friends.map(async (friend) => {
      const id = friend.requesterId;
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
    userCache: Object.fromEntries(userCache),
  };

  return Response.json(response);
}
