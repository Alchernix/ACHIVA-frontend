import { useSignupInfoStore } from "@/store/SignupStore";
import { ButtonHTMLAttributes } from "react";
import { NextStepButton } from "./Buttons";

export default function CategoryForm() {
  const user = useSignupInfoStore.use.user();
  const setUser = useSignupInfoStore.use.setUser();
  const categories = [
    "공부",
    "운동",
    "커리어",
    "독서",
    "자기계발",
    "취미",
    "투자",
    "루틴",
    "마인드셋",
  ];
  return (
    <div className="flex flex-col gap-7">
      <div className="w-full text-left">
        <p className="font-semibold text-lg">
          원하는 성취 카테고리를 선택해주세요
        </p>
        <p className="font-light text-sm text-theme-gray">
          1개 이상, 최대 5개까지 선택할 수 있어요
        </p>
      </div>
      <div className="flex h-60 flex-col justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              isSelected={user.categories.includes(category)}
              onClick={() => {
                if (user.categories.includes(category)) {
                  setUser({
                    categories: user.categories.filter((c) => c !== category),
                  });
                } else {
                  setUser({ categories: [...user.categories, category] });
                }
              }}
            >
              {category}
            </Button>
          ))}
        </div>
        <NextStepButton
          disabled={user.categories.length < 1 || user.categories.length > 5}
        >
          다음
        </NextStepButton>
      </div>
    </div>
  );
}

type ButtonProps = {
  isSelected: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ isSelected, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-3 py-2 rounded-sm font-semibold   ${
        isSelected
          ? ""
          : "border text-theme border-[#d9d9d9] hover:bg-[#a69595] hover:border-theme"
      }`}
    >
      {children}
    </button>
  );
}

// text-white bg-theme border-theme
