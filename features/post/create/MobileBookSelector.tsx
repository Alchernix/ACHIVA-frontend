import BookCard from "@/components/BookCard";
import {
  useCreatePostStepStore,
  useDraftPostStore,
} from "@/store/CreatePostStore";
import type { Book } from "@/types/Book";
import type { CategoryCount } from "@/types/Post";

//background: linear-gradient(298.33deg, #79B9C5 13.91%, #7CBCC8 89.44%);
//background: linear-gradient(270deg, rgba(124, 188, 200, 0) 0%, rgba(24, 109, 125, 0.6) 35.42%, rgba(24, 109, 125, 0.6) 64.06%, rgba(124, 188, 200, 0) 100%);
//background: linear-gradient(270deg, rgba(124, 188, 200, 0) 0%, #155662 61.46%);

//책이 5개보다 많으면? 스크롤 방향?
//책의 정렬 순서는?
export default function BookSelector({
  books,
  categoryCounts,
}: {
  books: Book[];
  categoryCounts: CategoryCount[];
}) {
  const setPost = useDraftPostStore.use.setPost();
  const handleNextStep = useCreatePostStepStore.use.handleNextStep();
  const handlePrevStep = useCreatePostStepStore.use.handlePrevStep();

  return (
    <div className="h-full flex-1 flex flex-col justify-between gap-8 m-4">
      {books.length !== 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex items-center cursor-pointer"
              onClick={() => {
                setPost({ category: book.category });
                const count = categoryCounts.filter(
                  (t) => book.category === t.category
                )[0].count;
                setPost({ categoryCount: count });
                setPost({ book: book });
                handleNextStep();
              }}
            >
              <BookCard book={book} />
            </div>
          ))}
          <div
            className="h-full flex-1 flex flex-col cursor-pointer"
            onClick={() => {
              handlePrevStep();
              handlePrevStep();
            }}
          >
            <div className="aspect-[3/4] rounded-md relative shadow-sm bg-[#EDEDED]">
              <div className="absolute top-2 right-[3px] px-[11px] py-[2px] gap-2 text-[#412A2A] bg-white border border-[#D9D9D9] rounded-md font-semibold">
                운동 {/*이거 필요한가...?*/}
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M39 6H9C8.20435 6 7.44129 6.31607 6.87868 6.87868C6.31607 7.44129 6 8.20435 6 9V39C6 39.7957 6.31607 40.5587 6.87868 41.1213C7.44129 41.6839 8.20435 42 9 42H39C39.7957 42 40.5587 41.6839 41.1213 41.1213C41.6839 40.5587 42 39.7957 42 39V9C42 8.20435 41.6839 7.44129 41.1213 6.87868C40.5587 6.31607 39.7957 6 39 6ZM39 39H9V9H39V39ZM33 24C33 24.3978 32.842 24.7794 32.5607 25.0607C32.2794 25.342 31.8978 25.5 31.5 25.5H25.5V31.5C25.5 31.8978 25.342 32.2794 25.0607 32.5607C24.7794 32.842 24.3978 33 24 33C23.6022 33 23.2206 32.842 22.9393 32.5607C22.658 32.2794 22.5 31.8978 22.5 31.5V25.5H16.5C16.1022 25.5 15.7206 25.342 15.4393 25.0607C15.158 24.7794 15 24.3978 15 24C15 23.6022 15.158 23.2206 15.4393 22.9393C15.7206 22.658 16.1022 22.5 16.5 22.5H22.5V16.5C22.5 16.1022 22.658 15.7206 22.9393 15.4393C23.2206 15.158 23.6022 15 24 15C24.3978 15 24.7794 15.158 25.0607 15.4393C25.342 15.7206 25.5 16.1022 25.5 16.5V22.5H31.5C31.8978 22.5 32.2794 22.658 32.5607 22.9393C32.842 23.2206 33 23.6022 33 24Z"
                    fill="#C3C3C3"
                  />
                </svg>
              </div>
            </div>
            <div className="pl-4 pr-4 h-full flex-1 flex flex-col">
              <p className="font-semibold text-lg mt-3">새로운 이야기</p>
              <p className="font-light text-[#808080] text-sm">첫번째 이야기</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
