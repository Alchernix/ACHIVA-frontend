import PostImg from "@/components/PostImg";
import { useDraftPostStore } from "@/store/CreatePostStore";
import { NextStepButton } from "./Buttons";
import { format } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TitleEditor() {
  const router = useRouter();
  const draft = useDraftPostStore.use.post();
  const setPost = useDraftPostStore.use.setPost();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div className="w-full sm:w-120 aspect-square relative">
        <PostImg url={draft.titleImageUrl!} />
        <div className="absolute w-full sm:w-120 top-3/12 px-4 flex flex-col gap-1 sm:gap-2">
          <p className="font-light text-white/70">
            {format(new Date(), "yyyy.MM.dd")}
          </p>
          <input
            className={`w-full z-51 ${
              isEditing ? "text-white" : "text-white/80"
            } placeholder:text-white/80 text-4xl sm:text-5xl font-semibold outline-none`}
            type="text"
            placeholder="오늘의 성취"
            autoFocus
            value={draft.title ?? ""}
            onChange={(e) => {
              setIsEditing(true);
              setPost({ title: e.target.value });
            }}
            onBlur={() => {
              setIsEditing(false);
            }}
          />
          <h2 className="text-white font-light text-2xl sm:text-3xl">
            <span className="font-bold">{draft.category}</span> 기록{" "}
            <span className="font-bold">
              {(draft.categoryCount ?? 0) + 1}번째
            </span>{" "}
            이야기
          </h2>
        </div>
        {isEditing && <div className="fixed inset-0 z-50 bg-black/40" />}
      </div>
      <div className="w-full mt-5">
        <NextStepButton
          disabled={!draft.title}
          onClick={async () => {
            try {
              const res = await fetch("/api/posts", {
                method: "PUT",
                body: JSON.stringify({
                  post: draft,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (!res.ok) {
                console.log(res);
                throw new Error("게시글 작성 중 에러");
              }
              router.back();
            } catch (err) {
              console.log(err);
              alert(
                "네트워크 혹은 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
              );
            }
          }}
        >
          공유하기
        </NextStepButton>
      </div>
    </div>
  );
}
