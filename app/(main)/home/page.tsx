export const dynamic = "force-dynamic";
import getAuthStatus from "@/lib/getAuthStatus";
import LogoutBtn from "@/components/LogoutBtn";

export default async function Home() {
  const auth = await getAuthStatus();

  return (
    <div>
      어서오세요 {auth.user.nickName}! <LogoutBtn />
    </div>
  );
}
