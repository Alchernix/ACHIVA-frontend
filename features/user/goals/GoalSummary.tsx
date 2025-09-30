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
    <div className="flex w-[282px] h-[94px] items-center justify-start p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
      <div className="text-4xl mr-4">{icon}</div>
      
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-black">
          {value.toLocaleString()} {title}
        </h3>
        <p className="text-sm font-light text-gray-500">{description}</p>
      </div>
    </div>
  );
};

// 전체 영역
const GoalSummary: React.FC<ProfileSummaryProps> = ({ summaryData }) => {
  return (
    <div 
      className="flex justify-center items-center gap-x-2 p-4"
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