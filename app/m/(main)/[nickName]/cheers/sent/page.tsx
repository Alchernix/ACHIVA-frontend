import CheersTitle from "@/features/user/CheersTitle";
import { auth } from "@/auth";
import type { CheerPoint } from "@/types/responses";
import Cheers from "@/features/user/Cheers";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  const session = await auth();
  const token = session?.access_token;

  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api2/members/${nickName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const userId = (await userRes.json()).data.id;
  const cheersRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/${userId}/cheerings/sending-category-stats`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const cheersData: CheerPoint[] = (await cheersRes.json()).data;
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full px-5">
        <CheersTitle nickname={nickName} />
        <div className="mt-15 mb-7">
          <Cheers type="보낸" cheers={cheersData} />
        </div>
      </div>
    </div>
  );
}
