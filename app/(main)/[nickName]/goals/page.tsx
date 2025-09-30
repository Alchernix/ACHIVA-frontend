"use client";

import React, { useState } from 'react';
import MissionCard from '@/features/user/goals/MissionCard';
import MindsetCard from '@/features/user/goals/MindsetCard';
import VisionCard from '@/features/user/goals/VisionCard';
import Footer from '@/components/Footer';
import GoalEditModal from '@/features/user/goals/GoalEditModal';
import { GoalEditIcon } from '@/components/Icons';
import { Mission, Mindset, Vision, ModalData } from '@/types/Goal';

// 테스트용 미션 하드코딩 -> 나중에 API 연결
const initialVision: Vision = {
    vision: "살아가다보면 뭐가 있겠지",
    text: "엄청난 사람이 되어 있을걸"
};

const initialMissions: Mission[] = [
  { id: 1, text: '국어 공부한 날', count: 10 },
  { id: 2, text: '수학 공부', count: 5 },
  { id: 3, text: '영어 공부', count: 22 },
];

const initialMindsets: Mindset[] = [
  { id: 101, text: '아 공부하기 싫다', count: 150 },
  { id: 102, text: '수업 듣기 싫다', count: 99 },
  { id: 103, text: '과제하기 싫다', count: 180 },
];


// Onclick 시 애니메이션 추가? 나중에 디자인 나오면
// 백엔드 통신 시 Debouncing 적용 등 고려
const GoalDetailClient: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visionData, setVisionData] = useState<Vision>(initialVision);
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [mindsets, setMindsets] = useState<Mindset[]>(initialMindsets);

  // 하트 눌렀을 때
  const handleHeartClick = (id: number, type: 'mission' | 'mindset') => {
    if (type === 'mission') {
      setMissions(currentMissions =>
        currentMissions.map(mission =>
          mission.id === id ? { ...mission, count: mission.count + 1 } : mission
        )
      );
    } else {
      setMindsets(currentMindsets =>
        currentMindsets.map(mindset =>
          mindset.id === id ? { ...mindset, count: mindset.count + 1 } : mindset
        )
      );
    }
  };

  // 모달에서 뭔가 수정했을 때
  const handleSaveChanges = (updatedData: ModalData) => {
    setVisionData({ vision: updatedData.vision, text: updatedData.text });
    
    setMissions(updatedData.missions.map(m => {
        const originalMission = missions.find(orig => orig.id === m.id);
        return {
            ...m,
            count: originalMission?.count ?? 0,
        };
    }));

    setMindsets(updatedData.mindsets.map(m => {
        const originalMindset = mindsets.find(orig => orig.id === m.id);
        return {
            ...m,
            count: originalMindset?.count ?? 0,
        };
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6 relative">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-1 z-10"
      >
        <GoalEditIcon />
      </button>

      <VisionCard
        vision={visionData.vision}
        text={visionData.text} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MissionCard missions={missions} onHeartClick={(id) => {handleHeartClick(id, 'mission')}} />
        <MindsetCard mindsets={mindsets} onHeartClick={(id) => {handleHeartClick(id, 'mindset')}} />
      </div>

      <Footer />

      <GoalEditModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={{ ...visionData, missions, mindsets }}
        onSave={handleSaveChanges}
      />  
    </div>
  );
};

export default GoalDetailClient;