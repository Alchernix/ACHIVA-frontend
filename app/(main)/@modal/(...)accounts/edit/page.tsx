// 모달로 겹쳐지는 페이지
export const dynamic = "force-dynamic";
import MobileHeader from "@/components/MobileHeader";
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
    <>
      <div className="fixed inset-0 bg-white flex items-center justify-center sm:hidden w-full h-dvh z-10 px-5">
        <MobileHeader>프로필 수정</MobileHeader>
        <EditProfile user={user} />
      </div>
      <div className="hidden sm:block">
        <Modal>
          <div className="py-10 sm:w-2xl lg:w-3xl flex justify-center">
            <EditProfile user={user} />
          </div>
        </Modal>
      </div>
    </>
  );
}
