// 소제목 페이지네이션, 빈 페이지 추가하기 관리
"use client";
import { useState } from "react";
import Slides from "./Slides";
import { useDraftPostStore } from "@/store/CreatePostStore";

export default function Writing() {
  const draft = useDraftPostStore.use.post();
  const setPost = useDraftPostStore.use.setPost();
  const [currentPage, setCurrentPage] = useState(1);
  console.log(draft.pages);
  return (
    <>
      <div className="absolute top-8 right-17">
        <AddNewPageBtn
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Slides currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

type Props = {
  currentPage: number;
  setCurrentPage: (p: number) => void;
};

function AddNewPageBtn({ currentPage, setCurrentPage }: Props) {
  const setPost = useDraftPostStore.use.setPost();
  return (
    <button
      onClick={() => {
        setPost((prev) => ({
          ...prev,
          pages: [
            ...prev.pages!.slice(0, currentPage),
            {
              id: crypto.randomUUID(),
              content: "",
            },
            ...prev.pages!.slice(currentPage),
          ],
        }));
      }}
      className="font-semibold text-[#808080] py-1 px-3 border border-[#d9d9d9] rounded-sm"
    >
      빈 페이지 추가하기
    </button>
  );
}
