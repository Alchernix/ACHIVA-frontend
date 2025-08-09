import EditProfile from "@/features/user/EditProfile";
import getAuthStatus from "@/lib/getAuthStatus";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = (await getAuthStatus()).user;
  if (!user) {
    redirect("/");
  }
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <EditProfile user={user} />
    </div>
  );
}
