import MobileHeader from "@/components/MobileHeader";
import { cookies } from "next/headers";
import type { PostRes } from "@/types/Post";
import HomePost from "@/features/home/Post";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const postRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const postData = await postRes.json();
  const cheeringRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles/${id}/cheerings`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const cheeringData = await cheeringRes.json();
  const data: PostRes = {
    ...postData.data,
    cheerings: cheeringData.data.content,
  };

  return (
    <div className="flex-1 flex flex-col">
      <MobileHeader>게시물</MobileHeader>
      <div className="flex-1 flex pb-22 items-center">
        <HomePost post={data} />
      </div>
    </div>
  );
}
