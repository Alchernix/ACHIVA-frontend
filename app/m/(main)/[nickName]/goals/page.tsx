import { notFound, redirect } from "next/navigation";
import getAuthStatus from "@/lib/getAuthStatus";
import useGoalStore from "@/store/GoalStore";
import MobileGoalWrapper from "@/features/user/goals/MobileGoalWrapper";

export default async function MobileGoalsPage({
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

  return <MobileGoalWrapper initialData={processedInitialData} />;
}
