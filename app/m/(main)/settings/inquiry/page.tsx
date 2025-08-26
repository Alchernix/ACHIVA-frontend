import MobileHeader from "@/components/MobileHeader";
import Inquiry from "@/features/settings/Inquiry";

export default function Page() {
  return (
    <div className="h-dvh flex flex-col">
      <MobileHeader>문의</MobileHeader>
      <div className="px-5 pb-20 flex-1 flex flex-col">
        <Inquiry />
      </div>
    </div>
  );
}
