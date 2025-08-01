import { z } from "zod";

export const UserSchema = z.object({
  email: z.email({ message: "유효하지 않은 이메일입니다." }),
  password: z.string().min(8),
});
