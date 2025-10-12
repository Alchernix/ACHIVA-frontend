"use client";

import useGoalStore from "@/store/GoalStore";
import React, { useState, useRef } from "react";
import { CaretRightIcon, ThreeDotsIcon } from "@/components/Icons";
import TwoElementsButton from "@/components/TwoElementsButton";
import type { GoalItem } from "@/types/Goal";

const GoalArchiveModal = () => {
  const {
    isArchiveModalOpen,
    toggleArchiveModal,
    missions,
    mindsets,
    handleRestore,
    handlePermanentDelete,
  } = useGoalStore();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top?: number;
    bottom?: number;
    right: number;
  }>({ right: 0 });
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  if (!isArchiveModalOpen) return null;

  const archivedMissions = missions.filter((m) => m.isArchived);
  const archivedMindsets = mindsets.filter((m) => m.isArchived);

  const allArchivedItems: Array<
    GoalItem & { type: "mission" | "mindset"; emoji: string }
  > = [
    ...archivedMissions.map((m) => ({
      ...m,
      type: "mission" as const,
      emoji: "🎯",
    })),
    ...archivedMindsets.map((m) => ({
      ...m,
      type: "mindset" as const,
      emoji: "🍀",
    })),
  ];

  const toggleDropdown = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
      return;
    }

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const dropdownHeight = 70;

    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < dropdownHeight + 10) {
      setDropdownPosition({
        bottom: window.innerHeight - rect.top + 8,
        right: window.innerWidth - rect.right,
      });
    } else {
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setOpenDropdown(id);
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 
                  before:absolute before:inset-0 before:bg-black before:opacity-50"
      onClick={() => setOpenDropdown(null)}
    >
      <div
        className="bg-[#F9F9F9] rounded-[10px] w-full max-w-[440px] mx-4 shadow-xl relative px-6 py-8 flex flex-col gap-8"
        onClick={(e) => {
          e.stopPropagation();
          setOpenDropdown(null);
        }}
      >
        <div className="flex items-center gap-4 h-8">
          <button onClick={() => toggleArchiveModal(false)} className="w-8 h-8">
            <CaretRightIcon />
          </button>
          <h2 className="text-[20px] leading-6 font-bold text-black">
            나를 위한 응원 보관함
          </h2>
        </div>

        <div
          className="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allArchivedItems.length === 0 ? (
            <div className="text-center py-10 text-[#808080]">
              보관된 항목이 없습니다
            </div>
          ) : (
            allArchivedItems.map((item, index) => {
              return (
                <div
                  key={`${item.type}-${item.id}`}
                  className="relative bg-white rounded-[8.75px] p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-9 h-9 text-[36px] leading-[44px] flex items-center">
                      {item.emoji}
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-[18px] leading-[21px] text-black">
                        {item.text}
                      </p>
                      <p className="text-[15px] leading-[18px] text-[#808080]">
                        {item.count.toLocaleString()}번째, 나를 위한 응원
                      </p>
                    </div>
                  </div>

                  <button
                    ref={(el) => {
                      buttonRefs.current[`${item.type}-${item.id}`] = el;
                    }}
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(`${item.type}-${item.id}`, e);
                    }}
                  >
                    <ThreeDotsIcon />
                  </button>

                  {openDropdown === `${item.type}-${item.id}` && (
                    <div
                      className="fixed z-[100]"
                      style={{
                        top: dropdownPosition.top,
                        bottom: dropdownPosition.bottom,
                        right: dropdownPosition.right,
                      }}
                    >
                      <TwoElementsButton
                        firstButtonText="이어하기"
                        secondButtonText="지우기"
                        onFirstClick={() => {
                          handleRestore(item.id, item.type);
                          setOpenDropdown(null);
                        }}
                        onSecondClick={() => {
                          handlePermanentDelete(item.id, item.type);
                          setOpenDropdown(null);
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalArchiveModal;
