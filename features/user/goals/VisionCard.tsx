"use client";

import React from 'react';
import useGoalStore from '@/store/GoalStore';

const VisionCard: React.FC = () => {
  const { vision } = useGoalStore();
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">나의 비전</h2>
      <div className="flex items-center">
          <span className="text-4xl mr-4">💫</span>
          <div>
              <p className="font-medium text-black">{vision.vision}</p>
              <p className="text-sm text-gray-500">{vision.text}</p>
          </div>
      </div>
    </div>
  );
};

export default VisionCard;
