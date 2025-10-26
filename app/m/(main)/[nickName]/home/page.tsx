import { redirect } from "next/navigation";
import Link from "next/link";
import getAuthStatus from "@/lib/getAuthStatus";
import GoalSummary from "@/features/user/goals/GoalSummary";
import { CaretRight24pxIcon } from "@/components/Icons";

export default async function MobileHomePageRoute({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const currentUserData = await getAuthStatus();
  const currentUser = currentUserData.user;
  if (!currentUser) {
    redirect("/");
  }

  const { nickName } = await params;
  const isOwner = currentUser.nickName === nickName;

  const mySummaryData = {
    letters: 20,
    count: 125,
    points: 1700,
  };

  return (
    <div className="min-h-dvh bg-white pt-14 pb-[104px] flex flex-col">
      <div className="flex-1" />

      <GoalSummary summaryData={mySummaryData} />

      <div className="h-6" />

      <div className="flex justify-center pb-[22px]">
        <Link
          href="/post/create"
          className="flex flex-row justify-center items-center gap-1 w-[272px] h-14 px-12 py-4 bg-[#412A2A] rounded-[64px]"
        >
          <span className="font-['Pretendard'] font-semibold text-xl leading-6 text-white text-center">
            오늘의 이야기 작성
          </span>
          <CaretRight24pxIcon />
        </Link>
      </div>
    </div>
  );
}
