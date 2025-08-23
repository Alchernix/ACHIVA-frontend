import { Post, DraftPost } from "@/types/Post";
import PostImg from "@/components/PostImg";

type Props = {
  size: number;
  post: DraftPost | Post;
};

export function TitlePage({ size, post }: Props) {
  return (
    <div
      style={{
        transform: `scale(${size / 390})`,
        transformOrigin: "top left",
      }}
      className="aspect-square w-[390px] h-[390px] relative"
    >
      <PostImg url={post.titleImageUrl!} filtered />
      <div className="absolute top-[90px] left-[23px]">
        <div className="font-light text-[16px] text-white/70">2025.08.06</div>
        <h1 className="font-semibold text-[45px] text-white/80 mb-[24px] leading-[50px]">
          {post.title}
        </h1>
        <div className="text-[32px] font-light text-white leading-[40px]">
          <div>
            <span className="font-bold">{post.category}</span> 기록
          </div>
          {/* <div>
            <span className="font-bold">{post.categoryCount}번째</span> 이야기
          </div> */}
        </div>
      </div>
    </div>
  );
}
