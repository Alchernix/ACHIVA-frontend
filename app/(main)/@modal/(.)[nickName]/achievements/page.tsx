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
    <Modal
      title={
        <h1 className="text-lg text-[#808080] flex items-center gap-1.5">
          <span className="font-semibold text-2xl text-black">{nickName}</span>
          <span className="font-normal">님의 성취기록</span>
        </h1>
      }
    >
      <div className="mt-5 mx-3 mb-5 sm:w-xl lg:w-3xl flex justify-center">
        <Achievements nickName={nickName} type="성취" />
      </div>
    </Modal>
  );
}
