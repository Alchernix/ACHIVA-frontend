"use client";

import useGoalStore from "@/store/GoalStore";
import React, { useState, useEffect } from "react";
import { CaretRightIcon, ThreeDotsIcon } from "@/components/Icons";
import TwoElementsButton from "@/components/TwoElementsButton";
import type { Mission, Mindset, Vision, ModalData } from "@/types/Goal";

type PendingAction = {
  type: "archive" | "delete";
  itemType: "vision" | "mission" | "mindset";
  id: number;
};

const GoalEditModal = () => {
  const {
    isModalOpen,
    toggleModal,
    vision,
    missions,
    mindsets,
    handleSaveChanges,
    handleArchive,
  } = useGoalStore();

  // 렌더 방지용 임시저장
  const [data, setData] = useState<ModalData>({
    vision,
    missions: missions.filter((m) => !m.isArchived),
    mindsets: mindsets.filter((m) => !m.isArchived),
  });

  // 백엔드 연결 대비 Queue
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);

  // 드롭다운 상태 관리
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Modal 열리면 갱신
  useEffect(() => {
    if (isModalOpen) {
      setData({
        vision,
        missions: missions.filter((m) => !m.isArchived),
        mindsets: mindsets.filter((m) => !m.isArchived),
      });
      setPendingActions([]);
      setOpenDropdown(null);
    }
  }, [isModalOpen, vision, missions, mindsets]);

  if (!isModalOpen) return null;

  // 일반 입력 계열 - 비전
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      vision: { ...prev.vision, text: e.target.value },
    }));
  };

  // 리스트 입력 계열
  const handleListItemChange = (
    index: number,
    value: string,
    type: "missions" | "mindsets"
  ) => {
    const newList = [...data[type]];
    newList[index] = { ...newList[index], text: value };
    setData((prev) => ({ ...prev, [type]: newList }));
  };

  // 추가 관련
  const addNewItem = (type: "missions" | "mindsets") => {
    const newItem = { id: Date.now(), text: "", count: 0, isArchived: false };
    setData((prev) => ({ ...prev, [type]: [...prev[type], newItem] }));
  };

  // 드롭다운 토글
  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // 보관함 이동
  const queueArchive = (
    type: "missions" | "mindsets",
    id: number
  ) => {
    // UI에서 우선 제거
    const newList = data[type].filter((item) => item.id !== id);
    setData((prev) => ({ ...prev, [type]: newList }));
    
    setPendingActions((prev) => [
      ...prev,
      {
        type: "archive",
        itemType: type === "missions" ? "mission" : "mindset",
        id,
      },
    ]);
    setOpenDropdown(null);
  };

  // 삭제
  const queueDelete = (type: "missions" | "mindsets", id: number) => {
    // UI에서 우선 제거
    const newList = data[type].filter((item) => item.id !== id);
    setData((prev) => ({ ...prev, [type]: newList }));
    setPendingActions((prev) => [
      ...prev,
      {
        type: "delete",
        itemType: type === "missions" ? "mission" : "mindset",
        id,
      },
    ]);
    setOpenDropdown(null);
  };

  const handleSave = () => {
    const cleanedData = { ...data };
    cleanedData.missions = data.missions.filter(
      (mission) => mission.text.trim() !== ""
    );
    cleanedData.mindsets = data.mindsets.filter(
      (mindset) => mindset.text.trim() !== ""
    );
    handleSaveChanges(cleanedData);

    // Queue 실행
    pendingActions.forEach((action) => {
      if (action.type === "archive") {
        handleArchive(action.id, action.itemType);
      }
    });

    toggleModal(false);
  };

  // 하는 동작은 다 비슷하고 디자인도 똑같은데 통합?
  // 일단 나중에 미션이랑 마음가짐 처리 로직 달라질 수 있어서 대충 따로 해놓음
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
        <div className="flex justify-between items-center h-[41px]">
          <button
            onClick={() => {
              toggleModal(false);
            }}
            className="w-8 h-8"
          >
            <CaretRightIcon />
          </button>
          <button
            onClick={handleSave}
            className="bg-[#412A2A] text-white font-semibold px-[15px] py-[10px] rounded-[5px] text-[18px] leading-[21px] h-[41px] w-20 flex items-center justify-center"
          >
            저장
          </button>
        </div>

        <div
          className="flex flex-col gap-6 max-h-[calc(100vh-200px)] overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex flex-col gap-2">
            <label className="text-[14px] leading-[17px] font-semibold text-[#808080]">
              나의 꿈
            </label>
            <div className="relative bg-white rounded-[5px] h-[52px] flex items-center px-4">
              <input
                type="text"
                value={data.vision.text}
                onChange={(e) => handleChange(e)}
                className="w-full bg-transparent outline-none text-[15px] leading-[18px] font-medium text-black"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] leading-[17px] font-semibold text-[#808080]">
              나의 미션
            </label>
            <div className="flex flex-col gap-2">
              {data.missions.map((mission, index) => {
                const isLastTwo = index >= data.missions.length - 2;
                return (
                  <div
                    key={mission.id}
                    className="relative bg-white rounded-[5px] h-[52px] flex items-center px-4"
                  >
                    <input
                      type="text"
                      value={mission.text}
                      onChange={(e) =>
                        handleListItemChange(index, e.target.value, "missions")
                      }
                      className="w-full bg-transparent outline-none text-[15px] leading-[18px] font-medium text-black pr-8"
                    />
                    <button
                      className="absolute right-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(`mission-${mission.id}`);
                      }}
                    >
                      <ThreeDotsIcon />
                    </button>
                    {openDropdown === `mission-${mission.id}` && (
                      <div
                        className={`absolute right-0 z-10 ${
                          isLastTwo ? "bottom-full mb-2" : "top-full mt-2"
                        }`}
                      >
                        <TwoElementsButton
                          firstButtonText="보관함으로 이동"
                          secondButtonText="지우기"
                          onFirstClick={() =>
                            queueArchive("missions", mission.id)
                          }
                          onSecondClick={() =>
                            queueDelete("missions", mission.id)
                          }
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <button
                onClick={() => addNewItem("missions")}
                className="bg-white rounded-[5px] h-[52px] flex items-center px-4 text-[15px] leading-[18px] font-medium text-[#B3B3B3]"
              >
                + 새로운 미션 추가하기
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] leading-[17px] font-semibold text-[#808080]">
              마음가짐
            </label>
            <div className="flex flex-col gap-2">
              {data.mindsets.map((mindset, index) => {
                const isLastTwo = index >= data.mindsets.length - 2;
                return (
                  <div
                    key={mindset.id}
                    className="relative bg-white rounded-[5px] h-[52px] flex items-center px-4"
                  >
                    <input
                      type="text"
                      value={mindset.text}
                      onChange={(e) =>
                        handleListItemChange(index, e.target.value, "mindsets")
                      }
                      className="w-full bg-transparent outline-none text-[15px] leading-[18px] font-medium text-black pr-8"
                    />
                    <button
                      className="absolute right-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(`mindset-${mindset.id}`);
                      }}
                    >
                      <ThreeDotsIcon />
                    </button>
                    {openDropdown === `mindset-${mindset.id}` && (
                      <div
                        className={`absolute right-0 z-10 ${
                          isLastTwo ? "bottom-full mb-2" : "top-full mt-2"
                        }`}
                      >
                        <TwoElementsButton
                          firstButtonText="보관함으로 이동"
                          secondButtonText="지우기"
                          onFirstClick={() =>
                            queueArchive("mindsets", mindset.id)
                          }
                          onSecondClick={() =>
                            queueDelete("mindsets", mindset.id)
                          }
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              <button
                onClick={() => addNewItem("mindsets")}
                className="bg-white rounded-[5px] h-[52px] flex items-center px-4 text-[15px] leading-[18px] font-medium text-[#B3B3B3]"
              >
                + 새로운 마음가짐 추가하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalEditModal;
