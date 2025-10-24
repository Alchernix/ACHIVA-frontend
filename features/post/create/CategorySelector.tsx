import type { CategoryCount } from "@/types/Post";
import {
  useCreatePostStepStore,
  useDraftPostStore,
} from "@/store/CreatePostStore";
import { CategoryButton } from "@/components/Buttons";
import { NextStepButton } from "./Buttons";

export default function CategorySelector({
  categoryCounts,
}: {
  categoryCounts: CategoryCount[];
}) {
  const draft = useDraftPostStore.use.post();
  const setPost = useDraftPostStore.use.setPost();
  const handleNextStep = useCreatePostStepStore.use.handleNextStep();
  // const postedCategories = [
  //   {
  //     category: "취미",
  //     count: 15,
  //   },
  //   {
  //     category: "공부",
  //     count: 9,
  //   },
  // ];

  return (
    <div className="h-full flex-1 flex flex-col justify-between">
      <div>
        <div className="flex gap-3 flex-wrap">
          {categoryCounts.map((category) => (
            <CategoryButton
              key={category.category}
              isSelected={draft.category === category.category}
              onClick={() => {
                setPost({ category: category.category });
                setPost({ categoryCount: category.count });
              }}
            >
              {category.category}
            </CategoryButton>
          ))}
        </div>
      </div>
      <NextStepButton onClick={handleNextStep} disabled={!draft.category}>
        다음
      </NextStepButton>
    </div>
  );
}
