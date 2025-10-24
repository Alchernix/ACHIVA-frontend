import {
  useCreatePostStepStore,
  useDraftPostStore,
} from "@/store/CreatePostStore";
import type { Book } from "@/types/Book"
import { BookCard } from "./BookSelector"
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { NextStepButton } from "./Buttons";

export default function CreateBookPage() {
  const [coverColor, setCoverColor] = useState("#77B5C1")
  const [title, setTitle] = useState("")
  const draft = useDraftPostStore.use.post();
  const setPost = useDraftPostStore.use.setPost();
  const handleNextStep = useCreatePostStepStore.use.handleNextStep();
  const colors = [
    "#FFB7B7",
    "#FFD9B7",
    "#A6736F;",
    "#77B5C1;",
    "#525D49;",
    "#4B5373",
    "#D4D4D4",
  ];
  return (
    <div>
      <div className="flex gap-6">
          <div className="flex flex-col grid grid-cols-2 gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setCoverColor(color)}
                className="w-10 h-10 rounded-md border-1 border-gray"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

        <div>
          <div className="aspect-[3/4] rounded-md relative shadow-sm" style={{ backgroundColor: coverColor }}>
            <div className="absolute top-2 right-2 px-5 py-2 bg-white border border-[#D9D9D9] rounded-md font-semibold">
                {draft.category}
            </div>
          </div>
          <div className="gap-1">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="첫번째 이야기" className="font-semibold p-4 text-lg"
            />
            <p className="font-light text-[#808080] text-sm">
                첫번째 이야기
            </p>
          </div>
        </div>
      </div>
      <NextStepButton onClick={() => {
        // 새 책 추가하는 함수.
        handleNextStep() 
      }} disabled={!title}>
              다음
      </NextStepButton>
    </div>
  )
}