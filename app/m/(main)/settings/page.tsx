import Settings from "@/features/settings/Settings";
import MobileHeader from "@/components/MobileHeader";

export default function Page() {
  return (
    <div className="h-dvh flex flex-col">
      <MobileHeader>설정</MobileHeader>
      <div className="px-5 pb-20 flex-1 flex flex-col">
        <Settings />
      </div>
    </div>
  );
}
