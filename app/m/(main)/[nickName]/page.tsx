import { cookies } from "next/headers";
import MobileProfile from "@/features/user/Profile";
import type { User } from "@/types/User";
import Footer from "@/components/Footer";
import PointSection from "@/features/user/Point";
import Posts from "@/features/user/Posts";
import getAuthStatus from "@/lib/getAuthStatus";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  try {
    const { nickName } = await params; // 이 페이지 유저 닉네임
    const currentUser = (await getAuthStatus()).user; // 로그인 한 유저

    if (!currentUser) {
      redirect("/");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // 유저 데이터 가져오기
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api2/members/${nickName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    const { data } = await response.json();
    if (!data) {
      notFound();
    }

    const user = data as User;

    return (
      <div className="flex-1 w-full flex pb-22 flex-col px-5">
        <div className="flex-1 flex flex-col mx-auto w-full max-w-160">
          <MobileProfile user={user} currentUser={currentUser} />
          <div className="flex gap-5 my-5 sm:my-10">
            <Link href={`/${nickName}/achievements`} className="flex-1">
              <PointSection label="성취 포인트" points={27} />
            </Link>
            <Link href={`/${nickName}/supports`} className="flex-1">
              <PointSection label="응원 포인트" points={27} />
            </Link>
          </div>
          <div className="flex-1 flex flex-col">
            <Posts userId={user.id} />
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (err) {
    // 나중에 에러 처리, 없는 유저 처리 필요...
    console.error(err);
    notFound();
  }
}
