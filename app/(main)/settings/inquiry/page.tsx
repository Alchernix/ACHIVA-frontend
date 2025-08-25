import Footer from "@/components/Footer";
import Inquiry from "@/features/settings/Inquiry";

export default function Page() {
  return (
    <div className="h-dvh w-full flex flex-col px-6 pt-10">
      <h2 className="font-bold text-2xl mb-16">문의</h2>
      <div className="flex-1 flex flex-col justify-between">
        <Inquiry />
        <Footer />
      </div>
    </div>
  );
}
