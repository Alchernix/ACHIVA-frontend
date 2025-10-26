"use client";

import React from "react";
import { HeartIcon } from "@/components/Icons";
import useGoalStore from "@/store/GoalStore";

const MobileVisionCard: React.FC = () => {
  const { vision, handleHeartClick } = useGoalStore();

  // 보관된 항목은 표시하지 않음
  if (vision.isArchived) return null;

  return (
    <div className="bg-white px-6 py-6 rounded-[8.75px] w-full">
      <h2 className="text-[20px] font-bold leading-6 mb-4 text-black">
        나의 꿈
      </h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="w-9 h-9 text-[32px] flex items-center">💫</span>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-[18px] leading-[21px] text-black">
              {vision.text}
            </p>
            <p className="text-[15px] leading-[18px] text-[#808080]">
              {vision.count.toLocaleString()}번째, 나를 위한 응원
            </p>
          </div>
        </div>
        <button
          onClick={() => handleHeartClick(vision.id, "vision")}
          className="w-8 h-8 flex items-center justify-center flex-shrink-0"
        >
          <HeartIcon />
        </button>
      </div>
    </div>
  );
};

export default MobileVisionCard;
