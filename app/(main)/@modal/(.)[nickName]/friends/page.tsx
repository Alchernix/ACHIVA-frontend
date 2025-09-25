// 모달로 겹쳐지는 페이지
import Modal from "@/components/Modal";
import Friends from "@/features/friends/Friends";
import { Suspense } from "react";
import FriendsSkeleton from "@/features/friends/FriendsSkeleton";
import { getFriends } from "@/lib/getFriends";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  const { friends, user, userCache } = await getFriends(nickName);

  return (
    <Modal title={<h1 className="text-center">친구</h1>}>
      <div className="mt-8 w-md overflow-y-auto h-130">
        <Suspense fallback={<FriendsSkeleton />}>
          <Friends friends={friends} user={user} userCache={userCache} />
        </Suspense>
      </div>
    </Modal>
  );
}
