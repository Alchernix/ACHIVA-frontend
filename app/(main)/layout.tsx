import getAuthStatus from "@/lib/getAuthStatus";
import AuthHydrator from "@/features/auth/AuthHydrator";
import Sidebar from "@/components/Sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuthStatus();
  switch (auth.status) {
    case "authenticated":
      return (
        <>
          <AuthHydrator user={auth.user} />
          <div className="flex">
            <Sidebar />
            <div className="sm:ml-20 lg:ml-60">{children}</div>
          </div>
        </>
      );
    case "unauthenticated":
      return <div>{children}</div>;
    case "error":
    default:
      console.error("로그인 확인 에러", auth.error);
      return <div>{children}</div>;
  }
}
