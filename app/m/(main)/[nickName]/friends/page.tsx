import MobileHeader from "@/components/MobileHeader";
import Friends from "@/features/friends/Friends";
import getAuthStatus from "@/lib/getAuthStatus";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  const currentUser = (await getAuthStatus()).user;

  return (
    <div className="flex-1 flex flex-col">
      <MobileHeader>친구</MobileHeader>
      <div className="flex-1 flex flex-col px-5 pb-5">
        <Friends
          nickName={nickName}
          isMe={currentUser?.nickName === nickName}
        />
      </div>
    </div>
  );
}
