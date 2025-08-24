"use client";

import Footer from "@/components/Footer";
import HomeHeader from "@/features/home/HomeHeader";
import { LoadingIcon } from "@/components/Icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { PostsData } from "@/types/responses";
import HomePost from "@/features/home/Post";
import { getFirstPage } from "@/features/post/firstPost";
// import { useCurrentUserInfoStore } from "@/store/userStore";

export default function Page() {
  // const createdAt = useCurrentUserInfoStore.use.user()?.createdAt;
  async function fetchPosts(pageParam: number = 0) {
    const response = await fetch(`/api/home?pageParam=${pageParam}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch");
    const json = await response.json();
    return json as PostsData;
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["home"],
      queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
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

  const posts = data?.pages.flatMap((p) => p.content) ?? [];

  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="flex-1 flex">
        <div className="mx-auto w-full max-w-140">
          <HomeHeader />
          {isLoading && (
            <div className="w-full flex justify-center">
              <LoadingIcon color="text-theme" />
            </div>
          )}
          {posts.length === 0 && !isLoading && (
            <HomePost post={getFirstPage()} />
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
        </div>
        <div className="bg-[#d9d9d9] w-60 hidden md:block" />
      </div>
      <Footer />
    </div>
  );
}
