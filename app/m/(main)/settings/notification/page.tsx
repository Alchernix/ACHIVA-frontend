import MobileHeader from "@/components/MobileHeader";
import Notification from "@/features/settings/Notification";

export default function Page() {
  return (
    <div className="h-dvh flex flex-col">
      <MobileHeader>알림</MobileHeader>
      <div className="px-5 pb-20 flex-1 flex flex-col">
        <Notification />
      </div>
    </div>
  );
}
