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
  handleHeartClick: (
    id: number,
    type: "vision" | "mission" | "mindset"
  ) => void;
  // Modal 수정사항 저장
  handleSaveChanges: (updatedData: ModalData) => void;
  // Modal 열림, 닫힘
  toggleModal: (isOpen: boolean) => void;
  // 보관함으로 이동
  handleArchive: (id: number, type: "vision" | "mission" | "mindset") => void;
}

// 초기값 하드코딩 (나중에 백엔드에서 가져올 데이터)
const initialState: GoalState = {
  vision: {
    id: 1,
    text: "살아가다보면 뭐가 있겠지",
    count: 25,
    isArchived: false,
  },
  missions: [
    { id: 1, text: "수학을 잘 해보자", count: 10, isArchived: false },
    { id: 2, text: "벌크업 해보자!", count: 5, isArchived: false },
    { id: 3, text: "영어 공부", count: 22, isArchived: false },
  ],
  mindsets: [
    { id: 101, text: "일찍 좀 일어나라", count: 150, isArchived: false },
    { id: 102, text: "수업 때 졸지 않기", count: 99, isArchived: false },
    { id: 103, text: "귀찮다고 미루지 않기", count: 180, isArchived: false },
  ],
  isModalOpen: false,
};

const useGoalStore = create<GoalState & GoalActions>((set, get) => ({
  ...initialState,

  setInitialData: (data) => set(data),

  handleHeartClick: (id, type) => {
    set((state) => {
      if (type === "vision") {
        return {
          vision:
            state.vision.id === id
              ? { ...state.vision, count: state.vision.count + 1 }
              : state.vision,
        };
      } else if (type === "mission") {
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
    const {
      vision: originalVision,
      missions: originalMissions,
      mindsets: originalMindsets,
    } = get();

    set({
      vision: {
        ...originalVision,
        text: updatedData.vision.text,
      },
      missions: updatedData.missions.map((m) => {
        const originalMission = originalMissions.find(
          (original) => original.id === m.id
        );
        return {
          ...m,
          count: originalMission?.count ?? 0,
          isArchived: originalMission?.isArchived ?? false,
        };
      }),
      mindsets: updatedData.mindsets.map((m) => {
        const originalMindset = originalMindsets.find(
          (original) => original.id === m.id
        );
        return {
          ...m,
          count: originalMindset?.count ?? 0,
          isArchived: originalMindset?.isArchived ?? false,
        };
      }),
    });
  },

  handleArchive: (id, type) => {
    set((state) => {
      if (type === "vision") {
        return {
          vision:
            state.vision.id === id
              ? { ...state.vision, isArchived: true }
              : state.vision,
        };
      } else if (type === "mission") {
        return {
          missions: state.missions.map((mission) =>
            mission.id === id ? { ...mission, isArchived: true } : mission
          ),
        };
      } else {
        return {
          mindsets: state.mindsets.map((mindset) =>
            mindset.id === id ? { ...mindset, isArchived: true } : mindset
          ),
        };
      }
    });
  },

  toggleModal: (isOpen) => set({ isModalOpen: isOpen }),
}));

export default useGoalStore;
