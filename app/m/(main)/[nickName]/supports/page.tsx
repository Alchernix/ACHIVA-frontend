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
      <MobileHeader>응원기록</MobileHeader>
      <div className="pt-20 px-5">
        <MobileAchievements nickName={nickName} type="응원" />
      </div>
    </>
  );
}
