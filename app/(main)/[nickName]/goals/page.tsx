import { redirect } from "next/navigation";
import Link from "next/link";
import getAuthStatus from "@/lib/getAuthStatus";
import GoalSummary from "@/features/user/goals/GoalSummary";
import Footer from "@/components/Footer";
import Banner from "@/features/event/Banner";

export default async function GoalsPage({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const currentUserData = await getAuthStatus();
  const currentUser = currentUserData.user; // 로그인 한 유저
  if (!currentUser) {
    redirect("/");
  }

  const { nickName } = await params; // 이 페이지 유저 닉네임
  const isOwner = currentUser.nickName === nickName; // 본인 아닐 때 어디까지 조회 가능? -> 나중에 물어봐야함

  // 나중에 API로 받아와야 함
  const mySummaryData = {
    letters: 20,
    count: 125,
    points: 1700,
  };

  return (
    <div className="w-full flex-1 flex">
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 flex justify-center items-end">
          <div className="w-full max-w-[844px]">
            {/* 나중에 책 관련 추가될 부분 */}
            <Link href={`/${nickName}/goals/detail`}>
              <GoalSummary summaryData={mySummaryData} />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
      <div className="bg-[#fafafa] w-60 hidden md:flex justify-center">
        <Banner />
      </div>
    </div>
  );
}
