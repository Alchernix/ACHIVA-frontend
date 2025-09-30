import React from "react";
import { HeartIcon } from "@/components/Icons";

type Mission = { 
  id: number; 
  text: string; 
  count: number; 
};

type MissionCardProps = {
  missions: Mission[];
  onHeartClick: (id: number) => void; // API 연결 필요
};

const MissionCard: React.FC<MissionCardProps> = ({ missions, onHeartClick }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">나의 미션</h2>
      <ul className="space-y-4">
        {missions.map(mission => (
          <li key={mission.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              <div>
                <p className="font-medium text-black">{mission.text}</p>
                <p className="text-xs text-gray-500">{mission.count.toLocaleString()}번째 쌓이는 중</p>
              </div>
            </div>
            <button onClick={() => onHeartClick(mission.id)} className="p-2">
              <HeartIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionCard;