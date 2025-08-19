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
import BgColorSelector from "./BgColorSelector";
import Writing from "./Writing";
// import BgImageSelector from "./BgImageSelector";
import ImageUploader from "./ImageUploader";
import TitleEditor from "./TitleEditor";

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

  let title: React.ReactNode = (
    <div className="h-7 flex items-center justify-center">
      {/* 자리 비움 */}
    </div>
  );
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
    case 2:
      title = "배경색을 선택해주세요";
      content = (
        <div className="h-100">
          <BgColorSelector />
        </div>
      );
      break;
    case 3:
      content = (
        <div>
          <Writing />
        </div>
      );
      break;
    case 4:
      title = "사진 추가";
      content = <ImageUploader isMobile={false} />;
      break;
    case 5:
      title = "표지 미리보기";
      content = <TitleEditor />;
      break;
    default:
      title = "에러";
      content = null;
  }
  return (
    <Modal
      title={
        typeof title === "string" ? (
          <h2 className="text-center font-semibold">{title}</h2>
        ) : (
          title
        )
      }
    >
      <div className="w-lg mt-8">{content}</div>
    </Modal>
  );
}
