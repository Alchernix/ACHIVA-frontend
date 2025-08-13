export const dynamic = "force-dynamic";
import getAuthStatus from "@/lib/getAuthStatus";

export default async function Home() {
  const auth = await getAuthStatus();

  return <div>어서오세요 {auth.user.nickName}!</div>;
}
