"use client";

import React from "react";
import { HeartIcon } from "@/components/Icons";
import useGoalStore from "@/store/GoalStore";

const MobileMissionCard: React.FC = () => {
  const { missions, handleHeartClick } = useGoalStore();

  // 보관되지 않은 항목만 필터링
  const activeMissions = missions.filter((mission) => !mission.isArchived);

  if (activeMissions.length === 0) return null;

  return (
    <div className="bg-white px-6 py-6 rounded-[8.75px] w-full">
      <h2 className="text-[20px] font-bold leading-6 mb-4 text-black">
        나의 미션
      </h2>
      <ul className="space-y-6">
        {activeMissions.map((mission) => (
          <li key={mission.id} className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="w-9 h-9 text-[36px] flex items-center">🎯</span>
              <div className="flex flex-col gap-1">
                <p className="font-medium text-[18px] leading-[21px] text-black">
                  {mission.text}
                </p>
                <p className="text-[15px] leading-[18px] text-[#808080]">
                  {mission.count.toLocaleString()}번째, 나를 위한 응원
                </p>
              </div>
            </div>
            <button
              onClick={() => handleHeartClick(mission.id, "mission")}
              className="w-8 h-8 flex items-center justify-center flex-shrink-0"
            >
              <HeartIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMissionCard;

