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
  description?: string;
  createdAt?: string;
};
