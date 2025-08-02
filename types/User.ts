export type User = {
  email: string;
  password: string;
  nickname: string;
  profileImg?: string;
  birth?: Date;
  gender?: string;
  categories: string[];
};
