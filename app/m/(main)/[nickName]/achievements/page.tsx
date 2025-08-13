import MobileHeader from "@/components/MobileHeader";
import MobileAchievements from "@/features/user/MobileAchievements";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  return (
    <>
      <MobileHeader>성취기록</MobileHeader>
      <div className="px-5">
        <MobileAchievements nickName={nickName} type="성취" />
      </div>
    </>
  );
}
