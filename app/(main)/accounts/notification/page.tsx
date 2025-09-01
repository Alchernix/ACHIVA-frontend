import Notifications from "@/features/user/Notifications";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-md">
        <h2 className="font-semibold text-xl text-theme my-5 w-full text-left">
          응원함
        </h2>
        <Notifications />
        <Footer />
      </div>
    </div>
  );
}
