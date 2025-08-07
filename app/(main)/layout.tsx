import getAuthStatus from "@/lib/getAuthStatus";
import AuthHydrator from "@/features/auth/AuthHydrator";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

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
          <Sidebar />
          <div className="flex-col sm:ml-20 lg:ml-60">
            <div className="">{children}</div>
            {/* <Footer /> */}
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
