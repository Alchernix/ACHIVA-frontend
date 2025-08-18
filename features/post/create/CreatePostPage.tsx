// pc용 - use client를 위한...
"use client";

import CategorySelector from "./CategorySelector";
import SubtitlesSelector from "./SubtitlesSelector";
import {
  useCreatePostStepStore,
  useDraftPostStore,
} from "@/store/CreatePostStore";
import type { CategoryCount } from "@/types/Post";
import Modal from "@/components/Modal";
import { useEffect } from "react";

export default function CreatePostPage({
  categoryCounts,
}: {
  categoryCounts: CategoryCount[];
}) {
  const currentStep = useCreatePostStepStore.use.currentStep();
  const resetStep = useCreatePostStepStore.use.resetStep();
  const resetPost = useDraftPostStore.use.resetPost();

  // 글쓰기 버튼 클릭 시 작성상태 리셋
  useEffect(() => {
    resetStep();
    resetPost();
  }, [resetStep, resetPost]);

  let title: string;
  let content: React.ReactNode;
  switch (currentStep) {
    case 0:
      title = "작성할 성취 카테고리를 선택해주세요";
      content = (
        <div className="h-100">
          <CategorySelector categoryCounts={categoryCounts} />
        </div>
      );
      break;
    case 1:
      title = "작성할 내용들을 선택해주세요";
      content = (
        <div className="h-120">
          <SubtitlesSelector />
        </div>
      );
      break;
    default:
      title = "에러";
      content = null;
  }
  return (
    <Modal title={<h2 className="text-center font-semibold">{title}</h2>}>
      <div className="w-lg mt-8">{content}</div>
    </Modal>
  );
}
