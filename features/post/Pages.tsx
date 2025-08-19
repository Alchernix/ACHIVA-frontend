import { Post, DraftPost } from "@/types/Post";
import PostImg from "@/components/PostImg";

type Props = {
  post: DraftPost | Post;
};

export function TitlePage({ post }: Props) {
  return <PostImg url={post.titleImageUrl!} />;
}
