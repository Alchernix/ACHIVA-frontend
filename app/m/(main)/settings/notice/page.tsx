import MobileHeader from "@/components/MobileHeader";
import Notice from "@/features/settings/Notice";

export default function Page() {
  return (
    <div className="h-dvh flex flex-col">
      <MobileHeader>공지</MobileHeader>
      <div className="px-5 pb-20 flex-1 flex flex-col">
        <Notice />
      </div>
    </div>
  );
}
