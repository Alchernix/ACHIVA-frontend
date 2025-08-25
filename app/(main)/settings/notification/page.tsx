import Footer from "@/components/Footer";
import Notification from "@/features/settings/Notification";

export default function Page() {
  return (
    <div className="h-dvh w-full flex flex-col px-6 pt-10">
      <h2 className="font-bold text-2xl mb-16">알림</h2>
      <div className="flex-1 flex flex-col justify-between">
        <Notification />
        <Footer />
      </div>
    </div>
  );
}
