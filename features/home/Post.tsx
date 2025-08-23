import { useRef, useState, useLayoutEffect } from "react";
import type { PostRes } from "@/types/Post";
import { TitlePage } from "../post/Pages";
import dateFormatter from "@/lib/dateFormatter";

export default function Post({ post }: { post: PostRes }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex gap-2.5 items-center">
        <p className="font-medium">{post.memberNickName}</p>
        <p className="font-light text-black/50">
          {dateFormatter(post.createdAt)}
        </p>
        <button className="ml-auto">
          <svg
            width="21"
            height="4"
            viewBox="0 0 21 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C12 2.29667 11.912 2.58668 11.7472 2.83335C11.5824 3.08003 11.3481 3.27229 11.074 3.38582C10.7999 3.49935 10.4983 3.52906 10.2074 3.47118C9.91639 3.4133 9.64912 3.27044 9.43934 3.06066C9.22956 2.85088 9.0867 2.58361 9.02882 2.29263C8.97095 2.00166 9.00065 1.70006 9.11418 1.42597C9.22771 1.15189 9.41997 0.917617 9.66665 0.752795C9.91332 0.587973 10.2033 0.5 10.5 0.5C10.8978 0.5 11.2794 0.658035 11.5607 0.93934C11.842 1.22064 12 1.60218 12 2ZM19 0.5C18.7033 0.5 18.4133 0.587973 18.1666 0.752795C17.92 0.917617 17.7277 1.15189 17.6142 1.42597C17.5007 1.70006 17.4709 2.00166 17.5288 2.29263C17.5867 2.58361 17.7296 2.85088 17.9393 3.06066C18.1491 3.27044 18.4164 3.4133 18.7074 3.47118C18.9983 3.52906 19.2999 3.49935 19.574 3.38582C19.8481 3.27229 20.0824 3.08003 20.2472 2.83335C20.412 2.58668 20.5 2.29667 20.5 2C20.5 1.60218 20.342 1.22064 20.0607 0.93934C19.7794 0.658035 19.3978 0.5 19 0.5ZM2 0.5C1.70333 0.5 1.41332 0.587973 1.16665 0.752795C0.919972 0.917617 0.727713 1.15189 0.614181 1.42597C0.50065 1.70006 0.470945 2.00166 0.528823 2.29263C0.586701 2.58361 0.729562 2.85088 0.93934 3.06066C1.14912 3.27044 1.41639 3.4133 1.70737 3.47118C1.99834 3.52906 2.29994 3.49935 2.57403 3.38582C2.84811 3.27229 3.08238 3.08003 3.24721 2.83335C3.41203 2.58668 3.5 2.29667 3.5 2C3.5 1.60218 3.34197 1.22064 3.06066 0.93934C2.77936 0.658035 2.39783 0.5 2 0.5Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div>
        <TitlePage size={containerWidth ?? 0} post={post} />
      </div>
    </div>
  );
}
