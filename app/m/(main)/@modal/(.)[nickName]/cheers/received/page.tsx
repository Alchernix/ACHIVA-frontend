import MobileModal from "@/components/MobileModal";
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
  const token = session?.accessToken;

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
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/members/${userId}/cheerings/receiving-category-stats`,
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
    <MobileModal title={<CheersTitle nickname={nickName} />}>
      <div className="mt-15 mb-7">
        <Cheers type="받은" cheers={cheersData} />
      </div>
    </MobileModal>
  );
}
