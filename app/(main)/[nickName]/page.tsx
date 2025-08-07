import { cookies } from "next/headers";
import { Profile } from "@/features/user/Profile";
import type { User } from "@/types/User";
import Footer from "@/components/Footer";
import PointSection from "@/features/user/Point";
import Posts from "@/features/user/Posts";

export default async function Page() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          cache: "no-store",
        },
      }
    );
    const { data } = await response.json();
    const user = data as User;
    return (
      <div className="w-full flex flex-col pt-15 px-5">
        <div className="mx-auto w-full max-w-160">
          <Profile user={user} />
          <div className="flex gap-5 my-10">
            <PointSection label="성취 포인트" points={27} />
            <PointSection label="응원 포인트" points={27} />
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
