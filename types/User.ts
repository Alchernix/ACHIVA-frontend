// 회원가입 시에만 쓰이는...
export type SignupUser = {
  email: string;
  password: string;
  nickName: string;
  profileImg?: string;
  birth?: Date;
  gender?: string;
  categories: string[];
};

// 서버에서 응답으로 받는 유저 정보
export type User = {
  id: number;
  email: string;
  nickName: string;
  birth: string;
  gender: string;
  region: string;
  categories: string[];
  profileImageUrl: string;
  role?: string;
  description: string;
  createdAt: string;
};
