"use client";

import { LoadingIcon } from "@/components/Icons";
import PostImg from "@/components/PostImg";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type PostsData = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ContentItem[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
};

interface ContentItem {
  id: number;
  photoUrl: string;
  title: string;
  category: string;
  question: Question[];
  memberId: number;
  memberNickName: string;
  createdAt: string; // ISO 8601 datetime string
  updatedAt: string; // ISO 8601 datetime string
}

interface Question {
  question: string;
  content: string;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export default function Posts({ initialPosts }: { initialPosts: PostsData }) {
  async function fetchPosts({ pageParam }: { pageParam: number }) {
    // 포스트 데이터 가져오기
    const response = await fetch(
      `/api/members/getPosts?pageParam=${pageParam}`,
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined; // 더 없음
        const next = lastPage.number + 1;
        return next < lastPage.totalPages ? next : undefined;
      },
      initialData: { pages: [initialPosts], pageParams: [0] },
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

  const posts = data.pages.flatMap((p) => p.content) ?? [];
  const postsCnt = data.pages[0]?.totalElements ?? 0;

  return (
    <div>
      <div className="flex justify-between font-medium text-sm mb-2">
        <p className="text-theme/50">
          게시글 <span>{postsCnt}</span>
        </p>
        <select name="" id="">
          <option value="" className="text-theme">
            최신순
          </option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-[1px]">
        {posts?.map((post) => {
          return <div key={post.id}>{<PostImg url={post.photoUrl} />}</div>;
        })}
      </div>
      <div ref={loaderRef}></div>
      {isFetchingNextPage && (
        <div>
          <LoadingIcon />
        </div>
      )}
    </div>
  );
}
