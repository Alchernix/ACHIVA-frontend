"use client";

import React from 'react';
import { HeartIcon } from '@/components/Icons';
import useGoalStore from '@/store/GoalStore';

const VisionCard: React.FC = () => {
  const { vision, handleHeartClick } = useGoalStore();
  return (
    <div className="bg-white p-6 rounded-[10px] border-[2.19px] border-[#E4E4E4]">
      <h2 className="text-xl font-bold mb-4 text-black">나의 꿈</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-[32px] leading-[39px]">💫</span>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-[18px] leading-[21px] text-black">{vision.vision}</p>
            <p className="text-[15px] leading-[18px] text-[#808080]">{vision.count.toLocaleString()}번째, 나를 위한 응원</p>
          </div>
        </div>
        <button onClick={() => handleHeartClick(vision.id, 'vision')} className="w-8 h-8 flex items-center justify-center flex-shrink-0">
          <HeartIcon />
        </button>
      </div>
    </div>
  );
};

export default VisionCard;
