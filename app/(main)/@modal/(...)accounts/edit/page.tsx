// 모달로 겹쳐지는 페이지
import Modal from "@/components/Modal";
import EditProfile from "@/features/user/EditProfile";
import getAuthStatus from "@/lib/getAuthStatus";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = (await getAuthStatus()).user;
  if (!user) {
    redirect("/");
  }
  return (
    <Modal title={<h1 className="text-center">프로필 수정</h1>}>
      <div className="my-7 sm:w-2xl lg:w-3xl flex justify-center">
        <EditProfile user={user} />
      </div>
    </Modal>
  );
}
