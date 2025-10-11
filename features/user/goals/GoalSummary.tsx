import { CaretLeftIcon } from "@/components/Icons";

type GoalSummaryProps = {
  icon: string;
  value: number;
  title: string;
  description: string;
};

type ProfileSummaryProps = {
  summaryData: {
    letters: number;
    count: number;
    points: number;
  };
};

// 개별 정보 카드
const GoalSummaryCard: React.FC<GoalSummaryProps> = ({ icon, value, title, description }) => {
  return (
    <div className="flex justify-center items-center w-full max-w-[844px] min-h-[88px] bg-white border border-[#E4E4E4] rounded-[10px] py-4 px-4 sm:px-6">
      <div className="flex justify-between items-center w-full gap-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className={`font-semibold font-['Urbanist'] leading-[130%] text-2xl sm:text-3xl`}>
            {icon}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-['Pretendard'] font-semibold text-base sm:text-lg text-black"> 
              {value.toLocaleString()} {title}
            </h3>
            <p className="font-['Pretendard'] font-light text-sm sm:text-[15px] text-[#808080]">
              {description}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
            <CaretLeftIcon />
        </div>
      </div>
    </div>
  );
};

// 전체 영역
const GoalSummary: React.FC<ProfileSummaryProps> = ({ summaryData }) => {
  return (
    <div 
      className="flex flex-col justify-center items-center gap-4 mb-auto px-4 sm:px-6"
    >
      <GoalSummaryCard
        icon="📚"
        value={summaryData.letters}
        title="글자"
        description="올해 쌓아올린 나의 성취 기록"
      />
      <GoalSummaryCard
        icon="🎯"
        value={summaryData.count}
        title="횟수"
        description="올해 쌓아올린 나의 목표 기록"
      />
      <GoalSummaryCard
        icon="💖"
        value={summaryData.points}
        title="포인트"
        description="올해 쌓아올린 나의 응원 기록"
      />
    </div>
  );
};

export default GoalSummary;