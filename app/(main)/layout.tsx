import getAuthStatus from "@/lib/getAuthStatus";
import AuthHydrator from "@/features/auth/AuthHydrator";
import Sidebar from "@/components/Sidebar";

export default async function Layout({
  children,
  modal,
  modal2,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  modal2: React.ReactNode;
}>) {
  const auth = await getAuthStatus();
  switch (auth.status) {
    case "authenticated":
      return (
        <>
          <AuthHydrator user={auth.user} />
          <Sidebar user={auth.user} />
          <div className="flex flex-col sm:ml-20 lg:ml-60 min-h-dvh">
            {children}
            {/* <Footer /> */}
          </div>
          {modal}
          {modal2}
        </>
      );
    case "unauthenticated":
      // 로그인되지 않았을 시, 사이드바 띄우지 않고, 본문에 마진 적용 x!!
      return (
        <div>
          {children}
          {modal}
          {modal2}
        </div>
      );
    case "error":
    default:
      console.error("로그인 확인 에러", auth.error);
      return (
        <div>
          {children}
          {modal}
          {modal2}
        </div>
      );
  }
}
