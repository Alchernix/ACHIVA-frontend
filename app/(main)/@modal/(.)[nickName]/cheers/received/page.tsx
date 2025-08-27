import Modal from "@/components/Modal";
import CheersTitle from "@/features/user/CheersTitle";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ nickName: string }>;
}) {
  const { nickName } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api2/members/${nickName}}`,
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
  const cheersData = await cheersRes.json();
  console.log(cheersData);
  return (
    <Modal title={<CheersTitle nickname={nickName} />}>
      <div className="w-sm"></div>
    </Modal>
  );
}
