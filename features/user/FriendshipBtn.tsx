"use client";

import { FriendStatus, FriendData } from "@/types/Friends";
import { useState } from "react";

type Props = {
  userId: number;
  friendStatus: FriendData[];
};

export default function FriendShipBtn({ userId, friendStatus }: Props) {
  const data = friendStatus.findLast((friend) => friend.receiverId === userId);
  const initialState = {
    // 해당 페이지의 유저가 나의 친구인가?
    // rejected거나 undefined일 경우 친구 아님
    status: data?.status,
    id: data?.id, // 친구신청 아이디
  };

  // 친구신청 버튼 클릭 시
  const [friendStatusState, setFriendStatusState] = useState(initialState);
  console.log(friendStatusState);
  // const [optimisticFriendStatus, setOptimisticFriendStatus] = useOptimistic(
  //   initialState,
  //   (state) => {
  //     let nextStatus: FriendStatus | undefined;
  //     // let nextId = state.id;
  //     if (state.status === "REJECTED" || state.status === undefined) {
  //       // 현재 친구가 아니고 친구신청도 안 보냈으면
  //       nextStatus = "PENDING";
  //     } else if (state.status === "PENDING") {
  //       // 친구신청 취소 API 나오면 취소하도록 해야함
  //       // nextStatus = undefined;
  //       // nextId = undefined
  //     }
  //     return { status: nextStatus, id: undefined };
  //   }
  // );

  let label;

  switch (friendStatusState.status) {
    case "ACCEPTED":
      label = "내 친구";
      break;
    case "PENDING":
      label = "수락 대기 중";
      break;
    default:
      label = "친구 신청";
  }

  return (
    <button
      onClick={async () => {
        if (
          friendStatusState.status === "REJECTED" ||
          friendStatusState.status === undefined
        ) {
          setFriendStatusState((prev) => ({ ...prev, status: "PENDING" }));
          const response = await fetch(`/api/friendships`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
            }),
          });
          const data = await response.json();
          setFriendStatusState((prev) => ({ ...prev, id: data.id }));
          // 왜 id가 안담기냐.... 나중에 삭제API 나오면 해결하자
        } else if (friendStatusState.status === "PENDING") {
          // 친구신청 취소 API 나오면 취소하도록 해야함
        }
      }}
      className="self-start bg-theme rounded-sm text-white font-semibold text-sm px-2.5 py-1.5 mt-2 sm:mt-0"
    >
      {label}
    </button>
  );
}
