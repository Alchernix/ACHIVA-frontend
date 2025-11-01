"use client";

import { CaretRightIcon } from "@/components/Icons";

interface GoalStatsCardProps {
  icon: React.ReactNode;
  mainText: string;
  subtitle: string;
  onClick?: () => void;
}

function GoalStatsCard({
  icon,
  mainText,
  subtitle,
  onClick,
}: GoalStatsCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onClick}
    >
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-lg text-gray-900">{mainText}</div>
        <div className="text-sm text-gray-600">{subtitle}</div>
      </div>
      <CaretRightIcon />
    </div>
  );
}

export default function GoalStatsCards() {
  const handleCardClick = () => {
    // TODO: 목표 페이지로 이동하는 로직 추가
    console.log("목표 카드 클릭됨");
  };

  return (
    <div className="flex flex-col gap-3">
      <GoalStatsCard
        icon="📚⭐"
        mainText="000 글자"
        subtitle="올해 쌓아올린 성취 기록"
        onClick={handleCardClick}
      />
      <GoalStatsCard
        icon="🎯"
        mainText="000 횟수"
        subtitle="올해 나에게 건넨 응원"
        onClick={handleCardClick}
      />
      <GoalStatsCard
        icon="💖"
        mainText="000 포인트"
        subtitle="올해 사람들과 나눈 응원"
        onClick={handleCardClick}
      />
    </div>
  );
}
