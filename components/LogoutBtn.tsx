"use client";
export default function LogoutBtn() {
  return (
    <button
      className="font-semibold text-lg"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/";
      }}
    >
      로그아웃
    </button>
  );
}
