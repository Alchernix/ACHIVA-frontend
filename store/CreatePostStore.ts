// 글쓰기 단계와 입력한 내용
import { create } from "zustand";
import createSelectors from "./createSelectors";
import type { DraftPost } from "@/types/Post";

type CreatePostStepState = {
  currentStep: number;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  resetStep: () => void;
};

const useCreatePostStepStoreBase = create<CreatePostStepState>()((set) => ({
  currentStep: 0,
  handlePrevStep: () =>
    set((state) => ({ currentStep: state.currentStep - 1 })),
  handleNextStep: () =>
    set((state) => ({ currentStep: state.currentStep + 1 })),
  resetStep: () => set({ currentStep: 0 }),
}));

export const useCreatePostStepStore = createSelectors(
  useCreatePostStepStoreBase
);

type EnteredDraftState = {
  post: DraftPost;
  setPost: (updates: DraftPost) => void;
  resetPost: () => void;
};

const initialPost: DraftPost = {};

const useDraftPostStoreBase = create<EnteredDraftState>((set) => ({
  post: initialPost,
  setPost: (updates) =>
    set((state) => ({
      post: { ...state.post, ...updates },
    })),
  resetPost: () =>
    set({
      post: initialPost,
    }),
}));

export const useDraftPostStore = createSelectors(useDraftPostStoreBase);
