"use client";
export default function LogoutBtn() {
  return (
    <button
      className="font-semibold text-lg"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        // 왜 signoutRedirect로 깔끔하게 해결이 안되는거임
        const domain =
          "https://ap-northeast-2mmvclnrmp.auth.ap-northeast-2.amazoncognito.com";
        const clientId = "a3kaacto97fom3ved1bjivbiu";
        const logoutUri = `${window.location.origin}/`;
        window.location.href = `${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
          logoutUri
        )}`;
      }}
    >
      로그아웃
    </button>
  );
}
