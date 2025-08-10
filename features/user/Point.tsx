import { BronzeMedallion } from "@/components/Badges";

// 유저 프로필의 성취 포인트 응원 포인트 어쩌구
type PointSectionProps = {
  points: number;
  label: string;
};
export default function PointSection({ points, label }: PointSectionProps) {
  return (
    <div
      style={{
        boxShadow:
          "0px 0px 30px -10px rgba(0,0,0,0.1), 19px 51px 15px 0 rgba(65,42,41,0), 12px 33px 14px 0 rgba(65,42,41,0.01), 7px 19px 12px 0 rgba(65,42,41,0.03), 3px 8px 9px 0 rgba(65,42,41,0.04), 1px 2px 5px 0 rgba(65,42,41,0.05)",
      }}
      className="cursor-pointer py-4 px-6 sm:px-12 flex flex-col items-center gap-2 text-center"
    >
      <BronzeMedallion />
      <p className="bg-[#d0c6aa]/20 text-[#a59e8e] text-sm font-semibold py-1 rounded-md w-full">
        Bronze Certified
      </p>
      <div>
        <p className="font-semibold text-theme/70 text-sm">{label}</p>
        <p className="font-bold text-theme text-xl">{points}</p>
      </div>
    </div>
  );
}
