import { cookies } from "next/headers";
import MobileProfile, { Profile } from "@/features/user/Profile";
import type { User } from "@/types/User";
import Footer from "@/components/Footer";
import PointSection from "@/features/user/Point";
import Posts from "@/features/user/Posts";
import getAuthStatus from "@/lib/getAuthStatus";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  try {
    const { nickName } = await params; // 이 페이지 유저 닉네임
    const currentUser = (await getAuthStatus()).user; // 로그인 한 유저
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    // 나중에 멤버 가져오는 api 나오면 바꿔야...
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["me"],
        },
      }
    );
    const { data } = await response.json();
    const user = data as User;
    return (
      <div className="w-full flex flex-col pb-22 sm:pb-0 sm:pt-15 px-5">
        <div className="mx-auto w-full max-w-160">
          <Profile user={user} currentUser={currentUser} />
          <MobileProfile user={user} currentUser={currentUser} />
          <div className="flex gap-5 my-5 sm:my-10">
            <Link href={`/${nickName}/achievements`} className="flex-1">
              <PointSection label="성취 포인트" points={27} />
            </Link>
            <Link href={`/supports`} className="flex-1">
              <PointSection label="응원 포인트" points={27} />
            </Link>
          </div>
          <Posts postsCnt={12} />
        </div>
        <Footer />
      </div>
    );
  } catch (err) {
    // 나중에 에러 처리, 없는 유저 처리 필요...
    console.error(err);
    return <div>Error</div>;
  }
}
