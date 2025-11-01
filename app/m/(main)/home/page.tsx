"use client";
// 나중에 중복로직 수정하자...!!!
import Footer from "@/components/Footer";
import HomeSection1 from "@/features/home/Section1";
import HomeSection2 from "@/features/home/Section2";
import GoalStatsCards from "@/features/home/GoalStatsCards";
import { CaretRightIcon } from "@/components/Icons";

export default function Page() {
  const handleWriteStory = () => {
    // TODO: 글 작성 페이지로 이동하는 로직 추가
    console.log("오늘의 이야기 작성 클릭됨");
  };

  return (
    <div className="w-full flex-1 flex flex-col pb-22">
      <div className="flex-1 flex flex-col gap-5 w-full px-4">
        {/* 목표 관련 정보 카드들 */}
        <div className="pt-4">
          <GoalStatsCards />
        </div>

        {/* 오늘의 이야기 작성 버튼 */}
        <button
          onClick={handleWriteStory}
          className="bg-[#8B4513] text-white rounded-lg px-6 py-4 flex items-center justify-center gap-2 font-medium hover:opacity-80 transition-opacity"
        >
          오늘의 이야기 작성
          <CaretRightIcon />
        </button>

        <HomeSection1 />
        <HomeSection2 />
      </div>
      <Footer />
    </div>
  );
}
