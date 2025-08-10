// 모달로 겹쳐지는 페이지
export const dynamic = "force-dynamic";
import Modal from "@/components/Modal";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  return (
    <Modal>
      <div className="px-8 pt-20 pb-10 sm:w-2xl lg:w-4xl flex justify-center">
        <div>test</div>
      </div>
    </Modal>
  );
}
