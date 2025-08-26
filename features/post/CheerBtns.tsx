"use client";

import {
  ThumbUpCheerIcon,
  FireCheerIcon,
  HeartCheerIcon,
  CloverCheerIcon,
} from "@/components/Icons";
import type { Cheering } from "@/types/responses";
import { useCurrentUserInfoStore } from "@/store/userStore";
import { useOptimistic, useState, startTransition } from "react";

export default function CheerBtns({
  postId,
  cheerings = [],
}: {
  postId: number;
  cheerings?: Cheering[];
}) {
  const currentUserId = useCurrentUserInfoStore.use.user()?.id;

  const labels = ["최고예요", "수고했어요", "응원해요", "동기부여"];
  const icons = [
    ThumbUpCheerIcon,
    FireCheerIcon,
    HeartCheerIcon,
    CloverCheerIcon,
  ];

  const initialCheeringsState = labels.reduce<
    Record<
      string,
      { active: boolean; id: number | undefined; isPending: boolean }
    >
  >((acc, label) => {
    const cheering = cheerings.find(
      (cheering) =>
        cheering.cheeringCategory === label &&
        cheering.senderId === currentUserId
    );
    acc[label] = {
      active: !!cheering,
      id: cheering?.id ?? undefined,
      isPending: false,
    };
    return acc;
  }, {});

  const [cheeringsState, setCheeringsState] = useState(initialCheeringsState);

  const [optimisticCheerings, setCheeringsOptimistically] = useOptimistic(
    cheeringsState,
    (prev, type: string) => ({
      ...prev,
      [type]: { ...prev[type], active: !prev[type].active },
    })
  );

  return (
    <div className="flex gap-1.5 items-center justify-center py-3.5">
      {labels.map((label, idx) => {
        const active = optimisticCheerings[label].active;
        const Icon = icons[idx];
        return (
          <button
            disabled={cheeringsState[label].isPending}
            onClick={async () => {
              startTransition(() => {
                setCheeringsOptimistically(label);
                setCheeringsState((prev) => ({
                  ...prev,
                  [label]: { ...prev[label], isPending: true },
                }));
              });
              if (active) {
                // 이미 눌렀으면 취소
              } else {
                // 누르기
                const res = await fetch("/api/cheerings", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    postId,
                    cheeringType: label,
                  }),
                });
                const id = (await res.json()).id;
                setCheeringsState((prev) => ({
                  ...prev,
                  [label]: { ...prev[label], id },
                }));
              }
              setCheeringsState((prev) => ({
                ...prev,
                [label]: { ...prev[label], isPending: false },
              }));
            }}
            key={label}
            className={`text-xs sm:text-base flex items-center gap-[2px] sm:gap-1 rounded-full border border-theme px-3 py-1 ${
              active ? "bg-theme text-white" : ""
            }`}
          >
            <p>{label}</p>
            {<Icon active={active} />}
          </button>
        );
      })}
    </div>
  );
}
