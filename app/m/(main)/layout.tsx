import getAuthStatus from "@/lib/getAuthStatus";
import AuthHydrator from "@/features/auth/AuthHydrator";
import MobileSidebar from "@/components/MobileSidebar";

export default async function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const auth = await getAuthStatus();
  switch (auth.status) {
    case "authenticated":
      return (
        <>
          <AuthHydrator user={auth.user} />
          <MobileSidebar user={auth.user} />
          <div className="min-h-dvh flex flex-col">{children}</div>
          {modal}
        </>
      );
    case "error":
    default:
      console.error("로그인 확인 에러", auth.error);
      return (
        <div>
          {children}
          {modal}
        </div>
      );
  }
}
