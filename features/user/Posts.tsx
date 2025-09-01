"use client";

import { LoadingIcon } from "@/components/Icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { TitlePage } from "../post/Pages";
import type { PostsData } from "@/types/responses";
import Link from "next/link";

export default function Posts({ userId }: { userId: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const size = containerWidth ? (containerWidth - 2) / 3 : 0;
  const [sortBy, setSortBy] = useState("DESC");

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  async function fetchPosts(pageParam: number = 0) {
    // 포스트 데이터 가져오기
    const response = await fetch(
      `/api/members/getPosts?pageParam=${pageParam}&id=${userId}&sort=${sortBy}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) throw new Error("Failed to fetch");
    const json = await response.json();
    return json.data as PostsData;
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["posts", userId, sortBy],
      queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined; // 더 없음
        const next = lastPage.number + 1;
        return next < lastPage.totalPages ? next : undefined;
      },
      // initialData: { pages: [initialPosts], pageParams: [0] },
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
  const postsCnt = data?.pages[0]?.totalElements ?? 0;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between font-medium text-sm mb-2">
        <p className="text-theme/50">
          게시글 <span>{postsCnt}</span>
        </p>
        <select
          className="text-right"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="DESC" className="text-theme">
            최신순
          </option>
          <option value="ASC" className="text-theme">
            오래된순
          </option>
        </select>
      </div>
      {isLoading && (
        <div className="w-full flex justify-center">
          <LoadingIcon color="text-theme" />
        </div>
      )}
      {posts.length === 0 && !isLoading && (
        <div className="flex-1 flex flex-col justify-center text-center text-[#7f7f7f]">
          <p>여기에 당신의 성취 기록이 담겨요</p>
          <p>첫 성취를 기록해보세요</p>
        </div>
      )}
      <div ref={containerRef} className="grid grid-cols-3 gap-[1px]">
        {posts?.map((post) => {
          return (
            <Link key={post.id} href={`/post/${post.id}`}>
              <TitlePage size={size} post={post} />
            </Link>
          );
        })}
      </div>
      <div ref={loaderRef}></div>
      {isFetchingNextPage && (
        <div className="w-full flex my-2 justify-center">
          <LoadingIcon color="text-theme" />
        </div>
      )}
    </div>
  );
}
