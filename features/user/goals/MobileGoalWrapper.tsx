"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileMissionCard from "@/features/user/goals/MobileMissionCard";
import MobileMindsetCard from "@/features/user/goals/MobileMindsetCard";
import MobileVisionCard from "@/features/user/goals/MobileVisionCard";
import { GoalEditIcon, GoalArchiveIcon } from "@/components/Icons";
import useGoalStore from "@/store/GoalStore";
import { useCurrentUserInfoStore } from "@/store/userStore";
import type { Mission, Mindset, Vision } from "@/types/Goal";

interface MobileGoalWrapperProps {
  initialData: {
    vision: Vision;
    missions: Mission[];
    mindsets: Mindset[];
  };
}

const MobileGoalWrapper: React.FC<MobileGoalWrapperProps> = ({
  initialData,
}) => {
  const router = useRouter();
  const { setInitialData } = useGoalStore();
  const user = useCurrentUserInfoStore.use.user();

  useEffect(() => {
    setInitialData(initialData);
  }, [initialData, setInitialData]);

  const handleEditClick = () => {
    router.push(`/${user?.nickName}/goals/edit`);
  };

  const handleArchiveClick = () => {
    router.push(`/${user?.nickName}/goals/archive`);
  };

  return (
    <div className="min-h-dvh bg-[#F9F9F9] pb-[104px]">
      {/* Header */}
      <div className="px-[19px] pt-[20px] pb-[16px] flex justify-between items-center">
        <h1 className="text-[34px] font-bold leading-[41px] text-[#412A2A]">
          ACHIVA
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleArchiveClick}
            className="w-6 h-6 flex items-center justify-center text-[#412A2A] hover:opacity-70"
          >
            <GoalArchiveIcon />
          </button>
          <button
            onClick={handleEditClick}
            className="w-6 h-6 flex items-center justify-center text-[#412A2A] hover:opacity-70"
          >
            <GoalEditIcon />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-[19px] space-y-4">
        <MobileVisionCard />
        <MobileMissionCard />
        <MobileMindsetCard />
      </div>
    </div>
  );
};

export default MobileGoalWrapper;
