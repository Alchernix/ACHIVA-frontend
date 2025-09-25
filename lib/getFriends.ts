"use server";
import { cookies } from "next/headers";
import type { User } from "@/types/User";
import type { FriendData } from "@/types/Friends";

export async function getFriends(nickName: string) {
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
    return (await res.json()).data as User; // 해당 페이지의 유저
  }

  // 이게 최선인가.... 나중에 더 좋은 api가 나오면 바꾸자.......
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

  return { friends, user, userCache };
}
