import Drawer from "@/components/Drawer";
import Notifications from "@/features/user/Notifications";

export default function Page() {
  return (
    <Drawer title="응원함" path="/accounts/notification">
      <Notifications />
    </Drawer>
  );
}
