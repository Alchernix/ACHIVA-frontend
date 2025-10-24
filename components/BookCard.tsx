import { Book } from "@/types/Book";

//디자인은 수정 예정
export default function BookCard({ book }: { book: Book }) {
  //따로 componets로 뺄 예정
  return (
    <div className="h-full flex-1 flex flex-col">
      <div
        className="aspect-[3/4] h-[217px] rounded-md relative shadow-sm bg-gradient-to-tl from-{}-500 to-{}-500"
        style={{ backgroundColor: book.color }}
      >
        <div className="absolute top-2 right-[3px] px-[11px] py-[2px] gap-2 text-[#412A2A] bg-white border border-[#D9D9D9] rounded-md font-semibold">
          {book.category}
        </div>
      </div>
      <div className="pl-4 pr-4 h-full flex-1 flex flex-col">
        <p className="font-semibold text-lg mt-3">{book.title}</p>
        <p className="font-light text-[#808080] text-sm mt-0">
          {book.count === 0 ? "첫번째" : `${book.count + 1}번째`} 이야기
        </p>
      </div>
    </div>
  );
}