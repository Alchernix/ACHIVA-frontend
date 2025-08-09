import getAuthStatus from "@/lib/getAuthStatus";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = (await getAuthStatus()).user;
  if (!user) {
    redirect("/");
  }
  return <div>Edit {user.nickName}</div>;
}
