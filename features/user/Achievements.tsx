import {
  SummarySection,
  BadgeSection,
  PointSection,
} from "./AchievementComponents";

type Props = {
  nickName: string;
  type: "성취" | "응원";
};

export default function Achievements({ nickName, type }: Props) {
  return (
    <div className="flex gap-5 w-full">
      <h2 className="absolute top-8 left-8 text-lg text-[#808080] flex items-center gap-1.5">
        <span className="font-semibold text-2xl text-black">{nickName}</span>
        님의 {type}
        기록
      </h2>
      <div className="flex-1 flex flex-col gap-5">
        <SummarySection type={type} />
        <BadgeSection type={type} />
      </div>
      <div className="flex-1">
        <PointSection type={type} />
      </div>
    </div>
  );
}
