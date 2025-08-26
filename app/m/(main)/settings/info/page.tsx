import MobileHeader from "@/components/MobileHeader";
import Info from "@/features/settings/Info";

export default function Page() {
  return (
    <div className="h-dvh flex flex-col">
      <MobileHeader>정보</MobileHeader>
      <div className="px-5 pb-20 flex-1 flex flex-col min-h-0">
        <Info />
      </div>
    </div>
  );
}
