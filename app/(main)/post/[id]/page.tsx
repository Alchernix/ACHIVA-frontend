import { cookies } from "next/headers";
import type { PostRes } from "@/types/Post";
import HomePost from "@/features/home/Post";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  async function getPost() {
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

    if (postData.code === 2000) {
      notFound();
    }
    return postData;
  }

  async function getCheering() {
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
    return cheeringRes.json();
  }

  const [postData, cheeringData] = await Promise.all([
    getPost(),
    getCheering(),
  ]);

  const data: PostRes = {
    ...postData.data,
    cheerings: cheeringData.data.content,
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-xl p-5">
        <HomePost post={data} />
      </div>
    </div>
  );
}
