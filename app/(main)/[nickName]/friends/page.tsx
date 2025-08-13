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
    <div className="flex justify-center">
      <div className="w-xl py-10">
        <h2 className="font-bold text-xl pb-5">친구 목록</h2>
        <Suspense fallback={<FriendsSkeleton />}>
          <Friends nickName={nickName} />
        </Suspense>
      </div>
    </div>
  );
}
