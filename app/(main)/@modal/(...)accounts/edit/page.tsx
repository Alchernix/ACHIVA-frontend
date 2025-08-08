// 모달로 겹쳐지는 페이지
import Modal from "@/components/Modal";
import EditProfile from "@/features/user/EditProfile";
import getAuthStatus from "@/lib/getAuthStatus";

export default async function Page() {
  const user = (await getAuthStatus()).user; // 없으면 리다이렉트 필요
  return (
    <Modal>
      <div className="py-10 sm:w-2xl lg:w-3xl flex justify-center">
        <EditProfile user={user} />
      </div>
    </Modal>
  );
}
