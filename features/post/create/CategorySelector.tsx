import type { CategoryCount } from "@/types/Post";
import { ButtonHTMLAttributes } from "react";
import {
  useCreatePostStepStore,
  useDraftPostStore,
} from "@/store/CreatePostStore";
import { motion } from "motion/react";
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
                  }}
                >
                  {category.category}
                </CategoryButton>
                <p className="font-light text-sm text-[#808080]">
                  {category.count}번째 이야기
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

// 나중에 중복코드 합치자...

type ButtonProps = {
  isSelected: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function CategoryButton({ isSelected, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`relative px-5 py-1 text-lg rounded-sm font-semibold overflow-hidden border ${
        isSelected
          ? "border-transparent text-white"
          : "text-theme border-[#d9d9d9]"
      }`}
    >
      <span className="relative z-10">{children}</span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 border text-white bg-theme border-theme rounded-sm"
        ></motion.div>
      )}
    </button>
  );
}
