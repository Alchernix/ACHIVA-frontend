import {
  useCreatePostStepStore,
  useDraftPostStore,
} from "@/store/CreatePostStore";
import type { Book } from "@/types/Book"
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
//디자인은 수정 예정
export function BookCard({book,} : {book: Book}) {
    
    //따로 componets로 뺄 예정
    return (<>
        <div className="aspect-[3/4] rounded-md relative shadow-sm" style={{ backgroundColor: book.color }}>
            <div className="absolute top-2 right-2 px-5 py-2 bg-white border border-[#D9D9D9] rounded-md font-semibold">
                {book.category}
            </div>
        </div>
        <div className="gap-1">
            <p className="font-semibold p-4 text-lg">
                {book.title}
            </p>
            <p className="font-light text-[#808080] text-sm">
                {book.count === 0? '첫번째' : `${book.count + 1}번째`} 이야기
            </p>
        </div>
        
    </>)
}

export default function BookSelector({
  books,
}: {
  books: Book[];
}) {
  const draft = useDraftPostStore.use.post();
  const setPost = useDraftPostStore.use.setPost();
  const handleNextStep = useCreatePostStepStore.use.handleNextStep();
  return (
    <div className="h-full flex-1 flex flex-col justify-between gap-8">
        {books.length !== 0 && (
          <div className="grid grid-cols-3 gap-8 w-full">
            {books.map((book) => (
              <div key={book.id} className="flex items-center"
                onClick={() => {
                    setPost({ category: book.category });
                    setPost({ categoryCount: book.count });
                    handleNextStep();
                  }}>
                <BookCard book={book}/>
              </div>
            ))}
              <div className="flex items-center"
                onClick={() => {
                    handleNextStep();
                  }}>
              <div className="aspect-[3/4] rounded-md relative shadow-sm bg-[#EDEDED]">
                <div className="absolute top-2 right-2 px-5 py-2 bg-white border border-[#D9D9D9] rounded-md font-semibold">
                  운동 {/*이거 필요한가...?*/}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/*추가 아이콘*/}
                </div>
              </div>
              <div className="gap-1">
                <p className="font-semibold p-4 text-lg">
                  새로운 이야기
                </p>
                <p className="font-light text-[#808080] text-sm">
                  첫번째 이야기
                </p>
              </div>
              </div>
          </div>
        )}
    </div>
  )
}