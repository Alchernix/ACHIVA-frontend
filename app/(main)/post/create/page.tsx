// 나중에 모달로만 접근 가능하도록 할 예정
// 처음 카테고리별 글 작성횟수 + 유저 정보만 불러오는 서버 컴포넌트
import getAuthStatus from "@/lib/getAuthStatus";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = (await getAuthStatus()).user;
  if (!user) {
    redirect("/");
  }

  return null;
}
