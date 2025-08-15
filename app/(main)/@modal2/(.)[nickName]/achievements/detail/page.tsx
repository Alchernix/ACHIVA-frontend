// 모달로 겹쳐지는 페이지
import Modal from "@/components/Modal";
import Badge from "@/features/user/Badge";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  const dummy = Array(11).fill("_");
  return (
    <Modal title={<h2>성취 뱃지</h2>}>
      <div className="mt-8 w-lg flex justify-center">
        <div className="max-h-80 w-full grid grid-cols-3 gap-2 overflow-y-auto pb-5">
          {dummy.map((_, i) => (
            <Badge key={i} type="Gold" count={10} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
