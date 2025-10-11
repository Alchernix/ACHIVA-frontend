import { notFound, redirect } from "next/navigation";
import getAuthStatus from "@/lib/getAuthStatus";
import useGoalStore from "@/store/GoalStore";
import GoalWrapper from "@/features/user/goals/GoalWrapper";

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

  return <GoalWrapper initialData={processedInitialData} />;
}
