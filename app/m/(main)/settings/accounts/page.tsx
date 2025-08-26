import MobileHeader from "@/components/MobileHeader";
import Accounts from "@/features/settings/Accounts";

export default function Page() {
  return (
    <div className="h-dvh flex flex-col">
      <MobileHeader>계정 관리</MobileHeader>
      <div className="px-5 pb-20 flex-1 flex flex-col">
        <Accounts />
      </div>
    </div>
  );
}
