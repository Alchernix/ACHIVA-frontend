import MobileHeader from "@/components/MobileHeader";
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
      <MobileHeader>프로필 수정</MobileHeader>
      <div className="w-full h-dvh flex justify-center pt-25 px-5">
        <EditProfile user={user} />
      </div>
    </>
  );
}
