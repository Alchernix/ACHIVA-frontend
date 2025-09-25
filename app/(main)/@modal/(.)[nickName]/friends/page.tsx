// 모달로 겹쳐지는 페이지
import Modal from "@/components/Modal";
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
    <Modal title={<h1 className="text-center">친구</h1>}>
      <div className="mt-8 w-md overflow-y-auto h-130">
        <Friends
          nickName={nickName}
          isMe={currentUser?.nickName === nickName}
        />
      </div>
    </Modal>
  );
}
