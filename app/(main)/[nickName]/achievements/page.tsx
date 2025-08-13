import Achievements from "@/features/user/Achievements";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  return (
    <div className="flex h-dvh justify-center items-center">
      <div className=" sm:w-2xl lg:w-4xl flex justify-center">
        <Achievements nickName={nickName} type="성취" />
      </div>
    </div>
  );
}
