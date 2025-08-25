import Footer from "@/components/Footer";
import Private from "@/features/settings/Private";

export default function Page() {
  return (
    <div className="h-dvh w-full flex flex-col px-6 pt-10">
      <h2 className="font-bold text-2xl mb-16">개인정보 보호</h2>
      <div className="flex-1 flex flex-col justify-between">
        <Private />
        <Footer />
      </div>
    </div>
  );
}
