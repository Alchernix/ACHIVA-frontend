// 모달로 겹쳐지는 페이지
export const dynamic = "force-dynamic";
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
    <Modal>
      <div className="py-10 sm:w-2xl lg:w-3xl flex justify-center">
        <EditProfile user={user} />
      </div>
    </Modal>
  );
}
