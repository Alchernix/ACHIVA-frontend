import { create } from "zustand";
import type { Mission, Mindset, Vision, ModalData } from "@/types/Goal";

interface GoalState {
  vision: Vision;
  missions: Mission[];
  mindsets: Mindset[];
  isModalOpen: boolean;
}

interface GoalActions {
  // 초기 데이터 설정
  setInitialData: (data: {
    vision: Vision;
    missions: Mission[];
    mindsets: Mindset[];
  }) => void;
  // 하트클릭
  handleHeartClick: (id: number, type: "mission" | "mindset") => void;
  // Modal 수정사항 저장
  handleSaveChanges: (updatedData: ModalData) => void;
  // Modal 열림, 닫힘
  toggleModal: (isOpen: boolean) => void;
}

// 초기값 하드코딩
const initialState: GoalState = {
  vision: {
    vision: "살아가다보면 뭐가 있겠지",
    text: "엄청난 사람이 되어 있을걸",
  },
  missions: [
    { id: 1, text: "국어 공부한 날", count: 10 },
    { id: 2, text: "수학 공부", count: 5 },
    { id: 3, text: "영어 공부", count: 22 },
  ],
  mindsets: [
    { id: 101, text: "아 공부하기 싫다", count: 150 },
    { id: 102, text: "수업 듣기 싫다", count: 99 },
    { id: 103, text: "과제하기 싫다", count: 180 },
  ],
  isModalOpen: false,
};

const useGoalStore = create<GoalState & GoalActions>((set, get) => ({
  ...initialState,

  setInitialData: (data) => set(data),

  handleHeartClick: (id, type) => {
    set((state) => {
      if (type === "mission") {
        return {
          missions: state.missions.map((mission) =>
            mission.id === id
              ? { ...mission, count: mission.count + 1 }
              : mission
          ),
        };
      } else {
        return {
          mindsets: state.mindsets.map((mindset) =>
            mindset.id === id
              ? { ...mindset, count: mindset.count + 1 }
              : mindset
          ),
        };
      }
    });
  },

  handleSaveChanges: (updatedData) => {
    const { missions: originalMissions, mindsets: originalMindsets } = get();

    set({
      vision: { vision: updatedData.vision, text: updatedData.text },
      missions: updatedData.missions.map((m) => {
        const originalMission = originalMissions.find(
          (original) => original.id === m.id
        );
        return { ...m, count: originalMission?.count ?? 0 };
      }),
      mindsets: updatedData.mindsets.map((m) => {
        const originalMindset = originalMindsets.find(
          (original) => original.id === m.id
        );
        return { ...m, count: originalMindset?.count ?? 0 };
      }),
    });
  },
  toggleModal: (isOpen) => set({ isModalOpen: isOpen }),
}));

export default useGoalStore;
