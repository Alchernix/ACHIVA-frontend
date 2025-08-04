export type User = {
  email: string;
  password: string;
  nickName: string;
  profileImg?: string;
  birth?: Date;
  gender?: string;
  categories: string[];
};
