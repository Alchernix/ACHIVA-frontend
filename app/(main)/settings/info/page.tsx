import Footer from "@/components/Footer";
import Info from "@/features/settings/Info";

export default function Page() {
  return (
    <div className="h-dvh w-full flex flex-col px-6 pt-10">
      <h2 className="font-bold text-2xl mb-16">정보</h2>
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <Info />
        <Footer />
      </div>
    </div>
  );
}
