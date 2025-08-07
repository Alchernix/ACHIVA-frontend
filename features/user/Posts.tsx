type Props = {
  postsCnt: number;
};

export default function Posts({ postsCnt }: Props) {
  // 이 컴포넌트에서 이미지를 fetch해서 가져오면 좋겠다
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
        {Array(11)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bg-loading aspect-square"></div>
          ))}
      </div>
    </div>
  );
}
