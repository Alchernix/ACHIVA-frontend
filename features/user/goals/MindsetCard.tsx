"use client";

import React from 'react';
import { HeartIcon } from '@/components/Icons';
import useGoalStore from '@/store/GoalStore';

const MindsetCard: React.FC = () => {
  const { mindsets, handleHeartClick } = useGoalStore();

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">마음가짐</h2>
      <ul className="space-y-4">
        {mindsets.map(mindset => (
          <li key={mindset.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🍀</span>
              <div>
                <p className="font-medium text-black">{mindset.text}</p>
                <p className="text-xs text-gray-500">{mindset.count.toLocaleString()}번째 쌓이는 중</p>
              </div>
            </div>
            <button onClick={() => handleHeartClick(mindset.id, 'mindset')} className="p-2">
              <HeartIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MindsetCard;