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
  const postedCategories = categoryCounts.filter(
    (category) => category.count !== 0
  );
  const notPostedCategories = categoryCounts.filter(
    (category) => category.count === 0
  );
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
    <div className="h-full flex flex-col justify-between">
      <div>
        {postedCategories.length !== 0 && (
          <div className="flex flex-wrap gap-5 mb-5">
            {postedCategories.map((category) => (
              <div key={category.category} className="flex items-center gap-3">
                <CategoryButton
                  isSelected={draft.category === category.category}
                  onClick={() => {
                    setPost({ category: category.category });
                    setPost({ categoryCount: category.count });
                  }}
                >
                  {category.category}
                </CategoryButton>
                <p className="font-light text-sm text-[#808080]">
                  {category.count + 1}번째 이야기
                </p>
              </div>
            ))}
          </div>
        )}
        <p className="font-semibold text-theme mb-3">새로운 이야기</p>
        <div className="flex gap-3 flex-wrap">
          {notPostedCategories.map((category) => (
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
