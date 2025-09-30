"use client";

import useGoalStore from "@/store/GoalStore";
import React, { useState, useEffect } from "react";
import { CloseIcon, PencilIcon } from "@/components/Icons";
import type { Mission, Mindset, Vision, ModalData } from "@/types/Goal";

const GoalEditModal = () => {
  const {
    isModalOpen,
    toggleModal,
    vision,
    missions,
    mindsets,
    handleSaveChanges,
  } = useGoalStore();

  // 렌더 방지용 임시저장
  const [data, setData] = useState<ModalData>({
    vision: vision.vision,
    text: vision.text,
    missions,
    mindsets,
  });

  // Modal 열리면 갱신
  useEffect(() => {
    if (isModalOpen) {
      setData({
        vision: vision.vision,
        text: vision.text,
        missions,
        mindsets,
      });
    }
  }, [isModalOpen, vision, missions, mindsets]);

  if (!isModalOpen) return null;

  // 일반 입력 계열
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "vision" | "text"
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
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
  // 삭제는 UI 배치가 고민되어서 일단 디자인 나올때까지 미룸
  const addNewItem = (type: "missions" | "mindsets") => {
    const newItem = { id: Date.now(), text: "" };
    setData((prev) => ({ ...prev, [type]: [...prev[type], newItem] }));
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
    toggleModal(false);
  };

  // 하는 동작은 다 비슷하고 디자인도 똑같은데 통합?
  // 일단 나중에 미션이랑 마음가짐 처리 로직 달라질 수 있어서 대충 따로 해놓음
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 
                  before:absolute before:inset-0 before:bg-black before:opacity-50"
    >
      <div
        className="bg-white rounded-lg w-full max-w-md mx-4 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <button
            onClick={() => {
              toggleModal(false);
            }}
            className="p-1"
          >
            <CloseIcon />
          </button>
          <h2 className="text-lg font-semibold">성취기록 수정</h2>
          <button
            onClick={handleSave}
            className="bg-[#412A2A] text-white font-semibold px-4 py-1.5 rounded-md text-sm"
          >
            저장
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-2 block">
              나의 비전
            </label>
            <div className="relative">
              <input
                type="text"
                value={data.vision}
                onChange={(e) => handleChange(e, "vision")}
                className="w-full border border-gray-300 rounded-md p-2 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <PencilIcon />
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500 mb-2 block">
              좌우명
            </label>
            <div className="relative">
              <input
                type="text"
                value={data.text}
                onChange={(e) => handleChange(e, "text")}
                className="w-full border border-gray-300 rounded-md p-2 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <PencilIcon />
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500 mb-2 block">
              나의 미션
            </label>
            <div className="space-y-2">
              {data.missions.map((mission, index) => (
                <div key={mission.id} className="relative">
                  <input
                    type="text"
                    value={mission.text}
                    onChange={(e) =>
                      handleListItemChange(index, e.target.value, "missions")
                    }
                    className="w-full border border-gray-300 rounded-md p-2 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    <PencilIcon />
                  </span>
                </div>
              ))}
              <button
                onClick={() => addNewItem("missions")}
                className="w-full text-left p-2 text-gray-400"
              >
                + 새로운 미션 추가하기
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500 mb-2 block">
              나의 마음가짐
            </label>
            <div className="space-y-2">
              {data.mindsets.map((mindset, index) => (
                <div key={mindset.id} className="relative">
                  <input
                    type="text"
                    value={mindset.text}
                    onChange={(e) =>
                      handleListItemChange(index, e.target.value, "mindsets")
                    }
                    className="w-full border border-gray-300 rounded-md p-2 pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    <PencilIcon />
                  </span>
                </div>
              ))}
              <button
                onClick={() => addNewItem("mindsets")}
                className="w-full text-left p-2 text-gray-400"
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
