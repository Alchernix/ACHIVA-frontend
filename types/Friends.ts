// 서버에서 응답으로 받는
export type FriendData = {
  id: number;
  requesterId: string;
  receiverId: string;
  status: FriendStatus;
};

export type FriendStatus = "PENDING" | "ACCEPTED" | "REJECTED";
