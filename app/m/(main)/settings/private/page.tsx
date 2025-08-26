import MobileHeader from "@/components/MobileHeader";
import Private from "@/features/settings/Private";

export default function Page() {
  return (
    <div className="h-dvh flex flex-col">
      <MobileHeader>개인정보 보호</MobileHeader>
      <div className="px-5 pb-20 flex-1 flex flex-col">
        <Private />
      </div>
    </div>
  );
}
