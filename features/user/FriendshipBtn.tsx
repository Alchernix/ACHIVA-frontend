"use client";

export default function FriendShipBtn({ userId }: { userId: number }) {
  return (
    <button
      onClick={async () => {
        await fetch(`/api/friendships`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        });
      }}
      className="self-start bg-theme rounded-sm text-white font-semibold text-sm px-2.5 py-1.5 mt-2 sm:mt-0"
    >
      친구 신청
    </button>
  );
}
