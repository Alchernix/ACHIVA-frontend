"use client";
export default function LogoutBtn() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/";
      }}
    >
      로그아웃(임시)
    </button>
  );
}
