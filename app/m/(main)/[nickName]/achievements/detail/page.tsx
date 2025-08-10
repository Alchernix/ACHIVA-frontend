import MobileHeader from "@/components/MobileHeader";
import Badge from "@/features/user/Badge";

export default function Page() {
  const dummy = Array(21).fill("_");
  return (
    <>
      <MobileHeader>성취 뱃지</MobileHeader>
      <div className="w-full grid grid-cols-3 gap-2 pt-20 pb-5 px-5 ">
        {dummy.map((_, i) => (
          <Badge key={i} type="Gold" count={10} />
        ))}
      </div>
    </>
  );
}
