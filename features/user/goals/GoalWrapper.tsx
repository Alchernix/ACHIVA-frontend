"use client";

import React, { useEffect } from 'react';
import MissionCard from '@/features/user/goals/MissionCard';
import MindsetCard from '@/features/user/goals/MindsetCard';
import VisionCard from '@/features/user/goals/VisionCard';
import Footer from '@/components/Footer';
import GoalEditModal from '@/features/user/goals/GoalEditModal';
import { GoalEditIcon } from '@/components/Icons';
import useGoalStore from '@/store/GoalStore';
import type { Mission, Mindset, Vision } from '@/types/Goal';

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
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6 relative">
      <button 
        onClick={() => toggleModal(true)}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-1 z-10"
      >
        <GoalEditIcon />
      </button>

      <VisionCard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MissionCard />
        <MindsetCard />
      </div>

      <Footer />
      <GoalEditModal />
    </div>
  );
};

export default GoalWrapper;