"use client";

import { LoadingIcon } from "@/components/Icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import type { NotificationsRes } from "@/types/responses";
import ProfileImg from "@/components/ProfileImg";
import dateFormatter from "@/lib/dateFormatter";
import {
  ThumbUpCheerIcon,
  FireCheerIcon,
  HeartCheerIcon,
  CloverCheerIcon,
} from "@/components/Icons";
import Link from "next/link";

type ProfileImgCacheType = { [id: number]: string };

const userCache = new Set<number>();

export default function Notifications() {
  const [profileImgs, setProfileImgs] = useState<ProfileImgCacheType>({});

  const icons = {
    최고예요: ThumbUpCheerIcon,
    수고했어요: FireCheerIcon,
    응원해요: HeartCheerIcon,
    동기부여: CloverCheerIcon,
  };

  async function fetchNotifications(pageParam: number = 0) {
    const response = await fetch(
      `/api/members/cheerings?pageParam=${pageParam}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch");
    const json = await response.json();

    await Promise.all(
      json.data.content.map(async (notification: any) => {
        if (!userCache.has(notification.senderId)) {
          userCache.add(notification.senderId);
          const userRes = await fetch(
            `/api/members?memberId=${notification.senderId}`
          );
          const userJson = await userRes.json();
          setProfileImgs((prev) => ({
            ...prev,
            [notification.senderId]: userJson.data.profileImageUrl,
          }));
          return userJson;
        }
      })
    );

    return json.data as NotificationsRes;
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: ({ pageParam = 0 }) => fetchNotifications(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined; // 더 없음
        const next = lastPage.number + 1;
        return next < lastPage.totalPages ? next : undefined;
      },
    });

  // 센티넬 IO
  const loaderRef = useRef(null);
  useEffect(() => {
    if (!loaderRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "100px 0px" }
    );
    io.observe(loaderRef.current);
    return () => io.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const notifications = data?.pages.flatMap((p) => p.content) ?? [];

  return (
    <>
      {isLoading && (
        <div className="w-full flex my-2 justify-center">
          <LoadingIcon color="text-theme" />
        </div>
        // <div className="w-full flex justify-center">
        //   <LoadingIcon color="text-theme" />
        // </div>
      )}
      {/* {posts.length === 0 && !isLoading && <HomePost post={getFirstPage()} />} */}
      <ul className="w-full flex flex-col gap-7">
        {notifications.map((n) => {
          const Icon = icons[n.cheeringCategory];
          return (
            <li key={n.id} className="flex gap-2.5 items-center">
              <Link href={`/${n.senderName}`}>
                <ProfileImg url={profileImgs[n.senderId]} size={50} />
              </Link>
              <div className="flex-1 flex gap-2.5 items-center">
                <Link href={`/${n.senderName}`} className="font-semibold">
                  {n.senderName}
                </Link>
                <p className="font-light text-black/50">
                  {dateFormatter(n.createdAt)}
                </p>
                <div className="ml-auto text-[15px] sm:text-base flex items-center gap-[2px] sm:gap-1 rounded-full border border-theme px-1.5 sm:px-3 py-1 text-white bg-theme">
                  <p>{n.cheeringCategory}</p>
                  <Icon active />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div ref={loaderRef}></div>
      {isFetchingNextPage && (
        <div className="w-full flex my-2 justify-center">
          <LoadingIcon color="text-theme" />
        </div>
      )}
    </>
  );
}
