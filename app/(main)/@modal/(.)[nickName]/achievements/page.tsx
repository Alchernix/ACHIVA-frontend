// 모달로 겹쳐지는 페이지
export const dynamic = "force-dynamic";
import MobileHeader from "@/components/MobileHeader";
import Modal from "@/components/Modal";
import Achievements from "@/features/user/Achievements";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  console.log(nickName);
  return (
    <>
      <div className="fixed inset-0 bg-white flex items-center justify-center sm:hidden w-full h-dvh z-10 px-5">
        <MobileHeader>프로필 수정</MobileHeader>
        Test
      </div>
      <div className="hidden sm:block">
        <Modal>
          <div className="px-8 pt-20 pb-10 sm:w-2xl lg:w-4xl flex justify-center">
            <Achievements nickName={nickName} type="성취" />
          </div>
        </Modal>
      </div>
    </>
  );
}
