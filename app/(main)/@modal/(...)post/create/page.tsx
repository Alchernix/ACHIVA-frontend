// 모달로 겹쳐지는 페이지
import Modal from "@/components/Modal";
import getAuthStatus from "@/lib/getAuthStatus";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = (await getAuthStatus()).user;
  if (!user) {
    redirect("/");
  }
  return (
    <Modal title={<h1>test</h1>}>
      <div className="sm:w-2xl lg:w-3xl flex justify-center">
        <div>Create</div>
      </div>
    </Modal>
  );
}
