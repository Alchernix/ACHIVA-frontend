import { BronzeMedallion } from "@/components/Badges";
import Badge from "./Badge";
import { EnergyIcon } from "@/components/Icons";

type SummarySectionProps = {
  type: "성취" | "응원";
};

export function SummarySection({ type }: SummarySectionProps) {
  return (
    <div className="flex items-center gap-7">
      <div
        className="flex flex-col py-4 items-center w-48 gap-2"
        style={{
          boxShadow:
            "0 0 15px -10px rgba(0, 0, 0, 0.10), 19px 51px 15px 0 rgba(65, 42, 41, 0.00), 12px 33px 14px 0 rgba(65, 42, 41, 0.01), 7px 19px 12px 0 rgba(65, 42, 41, 0.03), 3px 8px 9px 0 rgba(65, 42, 41, 0.04), 1px 2px 5px 0 rgba(65, 42, 41, 0.05)",
        }}
      >
        <BronzeMedallion />
        <p className="bg-[#d0c6aa]/20 text-[#a59e8e] text-sm font-semibold py-1 rounded-md">
          Bronze Certified
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-2xl text-theme/70">{type} 포인트</p>
        <p className="font-extrabold text-4xl">27</p>
      </div>
    </div>
  );
}

type BadgeSectionProps = {
  type: "성취" | "응원";
};

export function BadgeSection({ type }: BadgeSectionProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <p className="font-bold text-xl">{type} 뱃지</p>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-[#808080]">더보기</p>
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M10.8303 8.49731L6.14282 13.1848C6.01073 13.3169 5.83158 13.3911 5.64477 13.3911C5.45797 13.3911 5.27882 13.3169 5.14673 13.1848C5.01464 13.0527 4.94043 12.8736 4.94043 12.6868C4.94043 12.5 5.01464 12.3208 5.14673 12.1887L9.33677 7.99985L5.1479 3.80981C5.0825 3.74441 5.03061 3.66676 4.99522 3.58131C4.95982 3.49585 4.9416 3.40426 4.9416 3.31177C4.9416 3.21927 4.95982 3.12768 4.99522 3.04223C5.03061 2.95677 5.0825 2.87912 5.1479 2.81372C5.2133 2.74832 5.29095 2.69643 5.37641 2.66104C5.46186 2.62564 5.55345 2.60742 5.64595 2.60742C5.73844 2.60742 5.83003 2.62564 5.91549 2.66104C6.00094 2.69643 6.07859 2.74832 6.14399 2.81372L10.8315 7.50122C10.897 7.56662 10.9489 7.6443 10.9843 7.72981C11.0197 7.81532 11.0378 7.90697 11.0377 7.99951C11.0376 8.09205 11.0192 8.18366 10.9836 8.26908C10.9481 8.35451 10.8959 8.43207 10.8303 8.49731Z"
              fill="#808080"
            />
          </svg>
        </div>
      </div>
      <div className="flex gap-2">
        <Badge type="Gold" count={24} />
        <Badge type="Silver" count={18} />
        <Badge type="Bronze" count={24} />
      </div>
    </div>
  );
}

type PointSectionProps = {
  type: "성취" | "응원";
};

export function PointSection({ type }: PointSectionProps) {
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="font-bold text-xl">{type} 포인트</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M13.1455 17.375C13.1455 17.5975 13.0795 17.815 12.9559 18C12.8323 18.185 12.6566 18.3292 12.451 18.4144C12.2455 18.4995 12.0193 18.5218 11.801 18.4784C11.5828 18.435 11.3824 18.3278 11.225 18.1705C11.0677 18.0132 10.9605 17.8127 10.9171 17.5945C10.8737 17.3762 10.896 17.15 10.9811 16.9445C11.0663 16.7389 11.2105 16.5632 11.3955 16.4396C11.5805 16.316 11.798 16.25 12.0205 16.25C12.3189 16.25 12.605 16.3685 12.816 16.5795C13.027 16.7905 13.1455 17.0766 13.1455 17.375ZM12.0205 7.25C9.95239 7.25 8.27051 8.76406 8.27051 10.625V11C8.27051 11.1989 8.34953 11.3897 8.49018 11.5303C8.63083 11.671 8.8216 11.75 9.02051 11.75C9.21942 11.75 9.41019 11.671 9.55084 11.5303C9.69149 11.3897 9.77051 11.1989 9.77051 11V10.625C9.77051 9.59375 10.7802 8.75 12.0205 8.75C13.2608 8.75 14.2705 9.59375 14.2705 10.625C14.2705 11.6562 13.2608 12.5 12.0205 12.5C11.8216 12.5 11.6308 12.579 11.4902 12.7197C11.3495 12.8603 11.2705 13.0511 11.2705 13.25V14C11.2705 14.1989 11.3495 14.3897 11.4902 14.5303C11.6308 14.671 11.8216 14.75 12.0205 14.75C12.2194 14.75 12.4102 14.671 12.5508 14.5303C12.6915 14.3897 12.7705 14.1989 12.7705 14V13.9325C14.4805 13.6184 15.7705 12.2544 15.7705 10.625C15.7705 8.76406 14.0886 7.25 12.0205 7.25ZM21.7705 12.5C21.7705 14.4284 21.1987 16.3134 20.1273 17.9168C19.056 19.5202 17.5333 20.7699 15.7517 21.5078C13.9701 22.2458 12.0097 22.4389 10.1184 22.0627C8.22707 21.6865 6.48978 20.7579 5.12622 19.3943C3.76266 18.0307 2.83406 16.2934 2.45786 14.4021C2.08165 12.5108 2.27473 10.5504 3.01269 8.76884C3.75064 6.98726 5.00032 5.46451 6.6037 4.39317C8.20708 3.32183 10.0921 2.75 12.0205 2.75C14.6055 2.75273 17.0839 3.78084 18.9118 5.60872C20.7397 7.43661 21.7678 9.91498 21.7705 12.5ZM20.2705 12.5C20.2705 10.8683 19.7867 9.27325 18.8801 7.91655C17.9736 6.55984 16.6851 5.50242 15.1777 4.87799C13.6702 4.25357 12.0114 4.09019 10.411 4.40852C8.81067 4.72685 7.34066 5.51259 6.18688 6.66637C5.0331 7.82015 4.24736 9.29016 3.92903 10.8905C3.61071 12.4908 3.77408 14.1496 4.39851 15.6571C5.02293 17.1646 6.08035 18.4531 7.43706 19.3596C8.79376 20.2661 10.3888 20.75 12.0205 20.75C14.2078 20.7475 16.3048 19.8775 17.8514 18.3309C19.398 16.7843 20.268 14.6873 20.2705 12.5Z"
            fill="#808080"
          />
        </svg>
      </div>
      <div
        style={{
          boxShadow:
            "0 0 14.962px -9.974px rgba(0, 0, 0, 0.10), 18.951px 50.87px 14.962px 0 rgba(65, 42, 41, 0.00), 11.969px 32.916px 13.964px 0 rgba(65, 42, 41, 0.01), 6.982px 18.951px 11.969px 0 rgba(65, 42, 41, 0.03), 2.992px 7.98px 8.977px 0 rgba(65, 42, 41, 0.04), 0.997px 1.995px 4.987px 0 rgba(65, 42, 41, 0.05)",
        }}
        className="px-7 py-8 flex-1 flex flex-col justify-center gap-6"
      >
        <div className="flex items-center gap-6">
          <EnergyIcon />
          <p className="font-bold text-lg text-theme">성취 게시물 점수</p>
          <p className="ml-auto text-theme font-semibold">20 points</p>
        </div>
        <div className="flex items-center gap-6">
          <EnergyIcon />
          <p className="font-bold text-lg text-theme">성취 게시물 점수</p>
          <p className="ml-auto text-theme font-semibold">20 points</p>
        </div>
        <div className="flex items-center gap-6">
          <EnergyIcon />
          <p className="font-bold text-lg text-theme">성취 게시물 점수</p>
          <p className="ml-auto text-theme font-semibold">20 points</p>
        </div>
      </div>
    </div>
  );
}
