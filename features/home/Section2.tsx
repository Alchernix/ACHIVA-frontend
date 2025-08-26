"use client";

import { HomeSectionHeader } from "./HomeHeader";
import { LoadingIcon } from "@/components/Icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { PostsData } from "@/types/responses";
import HomePost from "@/features/home/Post";
import { useCurrentUserInfoStore } from "@/store/userStore";

export default function HomeSection2() {
  const currentUserId = useCurrentUserInfoStore.use.user()?.id;

  async function fetchPosts(pageParam: number = 0) {
    const response = await fetch(
      `/api/members/feed?id=${currentUserId}&pageParam=${pageParam}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch");
    const json = await response.json();
    return json.data as PostsData;
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined; // 더 없음
        const next = lastPage.number + 1;
        return next < lastPage.totalPages ? next : undefined;
      },
      enabled: !!currentUserId, // id가 없으면 query 실행 안 함
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

  const posts = data?.pages.flatMap((p) => p.content) ?? [];

  return (
    <>
      <HomeSectionHeader>관심있는 성취 카테고리 이야기</HomeSectionHeader>
      {isLoading && (
        <div className="w-full flex justify-center">
          <LoadingIcon color="text-theme" />
        </div>
      )}
      <div className="flex flex-col gap-7">
        {posts?.map((post) => {
          return <HomePost key={post.id} post={post} />;
        })}
      </div>
      <div ref={loaderRef}></div>
      {isFetchingNextPage && (
        <div className="w-full flex my-2 justify-center">
          <LoadingIcon color="text-theme" />
        </div>
      )}
    </>
  );
}
