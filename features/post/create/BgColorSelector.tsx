import { NextStepButton } from "./Buttons";
import { backgroundColors } from "../backgroundColors";
import {
  useCreatePostStepStore,
  useDraftPostStore,
} from "@/store/CreatePostStore";
import { BgColorSelectIcon } from "@/components/Icons";

export default function BgColorSelector() {
  const draft = useDraftPostStore.use.post();
  const setPost = useDraftPostStore.use.setPost();
  const handleNextStep = useCreatePostStepStore.use.handleNextStep();
  return (
    <div className="h-full flex-1 flex flex-col justify-between">
      <div className="w-full flex justify-center mt-10">
        <div className="grid grid-cols-3 gap-4">
          {backgroundColors.map((bg) => (
            <div
              key={bg}
              style={{ backgroundColor: bg }}
              className="rounded-sm shadow-lg w-27 sm:w-30 aspect-square relative cursor-pointer"
              onClick={() => setPost({ backgroundColor: bg })}
            >
              {draft.backgroundColor === bg && (
                <div className="w-full h-full flex items-center justify-center">
                  <BgColorSelectIcon white={bg === "#ffffff" ? false : true} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <NextStepButton
        disabled={!draft.backgroundColor}
        onClick={handleNextStep}
      >
        다음
      </NextStepButton>
    </div>
  );
}
