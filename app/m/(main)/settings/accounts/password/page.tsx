import MobileHeader from "@/components/MobileHeader";
import ResetPassword from "@/features/settings/ResetPassword";

export default function Page() {
  return (
    <div className="h-dvh flex flex-col">
      <MobileHeader>비밀번호 재설정</MobileHeader>
      <div className="px-5 pb-20 flex-1 flex flex-col">
        <ResetPassword />
      </div>
    </div>
  );
}
