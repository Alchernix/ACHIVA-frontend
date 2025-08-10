import {
  SummarySection,
  BadgeSection,
  PointSection,
} from "./AchievementComponents";

type Props = {
  nickName: string;
  type: "성취" | "응원";
};

export default function MobileAchievements({ nickName, type }: Props) {
  return (
    <>
      <div>
        <h2 className="text-lg text-[#808080] flex items-center gap-1.5 mb-5">
          <span className="font-semibold text-2xl text-black">{nickName}</span>
          님의 {type}
          기록
        </h2>
        <div className="flex flex-col gap-7">
          <SummarySection type={type} />
          <BadgeSection type={type} nickName={nickName} />
          <PointSection type={type} />
        </div>
      </div>
    </>
  );
}
