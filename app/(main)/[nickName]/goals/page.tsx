import { notFound, redirect } from "next/navigation";
import getAuthStatus from "@/lib/getAuthStatus";
import useGoalStore from "@/store/GoalStore";
import GoalWrapper from "@/features/user/goals/GoalWrapper";
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
  const isOwner = currentUser.nickName === nickName; // Goal 클릭 가능여부 확인용

  if (!isOwner) {
    redirect(`/${nickName}`);
  }

  const initialData = useGoalStore.getState();

  if (!initialData) {
    notFound();
  }

  const processedInitialData = {
    vision: initialData.vision,
    missions: initialData.missions,
    mindsets: initialData.mindsets,
  };

  return (
    <div className="w-full flex-1 flex">
      <div className="flex-1 flex flex-col justify-between">
        <GoalWrapper initialData={processedInitialData} />
      </div>
      <div className="bg-[#fafafa] w-60 hidden md:flex justify-center">
        <Banner />
      </div>
    </div>
  );
}
