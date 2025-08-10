import getAuthStatus from "@/lib/getAuthStatus";
import AuthHydrator from "@/features/auth/AuthHydrator";
import MobileSidebar from "@/components/MobileSidebar";

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
          <MobileSidebar user={auth.user} />
          <div>{children}</div>
        </>
      );
    case "unauthenticated":
      // 로그인되지 않았을 시, 사이드바 띄우지 않고, 본문에 마진 적용 x!!
      return <div>{children}</div>;
    case "error":
    default:
      console.error("로그인 확인 에러", auth.error);
      return <div>{children}</div>;
  }
}
