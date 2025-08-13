// 모달로 겹쳐지는 페이지
import Modal from "@/components/Modal";
import Achievements from "@/features/user/Achievements";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  return (
    <Modal>
      <div className="px-8 pt-20 pb-10 sm:w-2xl lg:w-4xl flex justify-center">
        <Achievements nickName={nickName} type="응원" />
      </div>
    </Modal>
  );
}
