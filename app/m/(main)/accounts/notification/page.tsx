import MobileHeader from "@/components/MobileHeader";
import Notifications from "@/features/user/Notifications";

export default function Page() {
  return (
    <div className="flex-1 w-full flex justify-center">
      <div className="w-full flex flex-col mb-5">
        <MobileHeader>응원함</MobileHeader>
        <div className="px-5">
          <Notifications />
        </div>
      </div>
    </div>
  );
}
