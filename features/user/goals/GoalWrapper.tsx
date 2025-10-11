"use client";

import React, { useEffect } from "react";
import MissionCard from "@/features/user/goals/MissionCard";
import MindsetCard from "@/features/user/goals/MindsetCard";
import VisionCard from "@/features/user/goals/VisionCard";
import Footer from "@/components/Footer";
import GoalEditModal from "@/features/user/goals/GoalEditModal";
import { GoalEditIcon, GoalArchiveIcon } from "@/components/Icons";
import useGoalStore from "@/store/GoalStore";
import type { Mission, Mindset, Vision } from "@/types/Goal";

interface GoalWrapperProps {
  initialData: {
    vision: Vision;
    missions: Mission[];
    mindsets: Mindset[];
  };
}

const GoalWrapper: React.FC<GoalWrapperProps> = ({ initialData }) => {
  const { setInitialData, toggleModal } = useGoalStore();

  useEffect(() => {
    setInitialData(initialData);
  }, [initialData, setInitialData]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-4">
      <div className="flex justify-end items-center gap-4">
        <button
          onClick={() => toggleModal(true)}
          className="w-6 h-6 flex items-center justify-center text-[#412A2A] hover:opacity-70"
        >
          <GoalArchiveIcon />
        </button>
        <button
          onClick={() => toggleModal(true)}
          className="w-6 h-6 flex items-center justify-center text-[#412A2A] hover:opacity-70"
        >
          <GoalEditIcon />
        </button>
      </div>

      <VisionCard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MissionCard />
        <MindsetCard />
      </div>

      <Footer />
      <GoalEditModal />
    </div>
  );
};

export default GoalWrapper;
