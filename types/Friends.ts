// 서버에서 응답으로 받는
export type FriendData = {
  id: number;
  requesterId: number;
  receiverId: number;
  status: FriendStatus;
};

export type FriendStatus = "PENDING" | "ACCEPTED" | "REJECTED";
