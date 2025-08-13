import MobileHeader from "@/components/MobileHeader";
import Friends from "@/features/user/Friends";
import { Suspense } from "react";
import FriendsSkeleton from "@/features/user/FriendsSkeleton";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  return (
    <>
      <MobileHeader>친구 목록</MobileHeader>
      <div className="px-5">
        <Suspense fallback={<FriendsSkeleton />}>
          <Friends nickName={nickName} />
        </Suspense>
      </div>
    </>
  );
}
