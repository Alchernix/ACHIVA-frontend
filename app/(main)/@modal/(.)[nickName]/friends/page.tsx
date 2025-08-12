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
    <Modal>
      <div className="px-8 pt-20 pb-10 w-xl flex justify-center">
        <h2 className="absolute top-8 left-8 font-bold text-xl">친구 목록</h2>
        <div className="w-full overflow-y-auto h-130">
          <Suspense fallback={<FriendsSkeleton />}>
            <Friends nickName={nickName} />
          </Suspense>
        </div>
      </div>
    </Modal>
  );
}
