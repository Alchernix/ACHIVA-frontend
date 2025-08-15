// 모달로 겹쳐지는 페이지
import Modal from "@/components/Modal";
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
    <Modal title={<h1>친구 목록</h1>}>
      <div className="mt-8 w-lg overflow-y-auto h-130">
        <Suspense fallback={<FriendsSkeleton />}>
          <Friends nickName={nickName} />
        </Suspense>
      </div>
    </Modal>
  );
}
