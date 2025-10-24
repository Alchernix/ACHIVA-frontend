import {
  useCreatePostStepStore,
  useDraftPostStore,
} from "@/store/CreatePostStore";
import { useState } from "react";
import { bookCoverColors } from "../bookCoverColors";
import { CloseIcon } from "@/components/Icons";

export default function CreateBookPage({
  close,
}: {
  close: (value: boolean) => void;
}) {
  const [coverColor, setCoverColor] = useState("#77B5C1");
  const [title, setTitle] = useState("");
  const draft = useDraftPostStore.use.post();
  const setPost = useDraftPostStore.use.setPost();
  const handleNextStep = useCreatePostStepStore.use.handleNextStep();

  return (
    <>
      <div className="relative bg-white w-full h-14 mb-5 flex items-center justify-center z-50">
        <div className="flex items-center justify-center relative w-full">
          <button
            onClick={() => close(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          >
            <CloseIcon />
          </button>
          <h1 className="text-xl font-semibold">표지 미리보기</h1>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 border-1 border-[#D9D9D9] font-bold text-[#412A2A] px-3 py-[2px] rounded-sm">
            <button
              onClick={() => {
                // 새 책 추가하는 함수를 넣고 거기서 리턴받아서...
                const newBook = {
                  id: 0,
                  title: title,
                  category: draft.category,
                  count: 0,
                  color: coverColor,
                };
                setPost({ book: newBook });
                handleNextStep();
                handleNextStep();
              }}
              disabled={!title}
            >
              다음
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col px-5 pb-15">
        <div className="flex-1 flex flex-col">
          <div className="flex justify-center items-center flex-col w-full">
            <div className="flex gap-6 flex-col justify-center">
              <div className="flex justify-center items-center flex-col overflow-hidden w-full">
                <div
                  className="aspect-[3/4] w-[211px] rounded-md relative shadow-sm bg-gradient-to-tl from-{}-500 to-{}-500"
                  style={{ backgroundColor: coverColor }}
                >
                  <div className="absolute top-2 right-2 px-[11px] py-[2px] gap-2 text-xl text-[#412A2A] bg-white border border-[#D9D9D9] rounded-md font-semibold">
                    {draft.category}
                  </div>
                </div>
                <div className="gap-1 w-[211px]">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 작성해주세요"
                    className="mt-4 font-semibold p-0 focus:outline-none text-[24px]"
                  />
                  <p className="font-light text-[#808080A3] text-[20px]">
                    첫번째 이야기
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 mb-8 flex flex-row gap-3 items-center">
              {bookCoverColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setCoverColor(color)}
                  className={`relative w-10 h-10 rounded-md cursor-pointer ${
                    color == "#F9F9F9" ? "border border-[#D4D4D4]" : " "
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {color === coverColor && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <path
                        d="M21.7949 7.54597L9.79492 19.546C9.6904 19.6509 9.56621 19.7341 9.42947 19.7909C9.29272 19.8476 9.14611 19.8769 8.99804 19.8769C8.84998 19.8769 8.70337 19.8476 8.56662 19.7909C8.42988 19.7341 8.30569 19.6509 8.20117 19.546L2.95117 14.296C2.84652 14.1913 2.76351 14.0671 2.70688 13.9304C2.65024 13.7936 2.62109 13.6471 2.62109 13.4991C2.62109 13.3511 2.65024 13.2046 2.70688 13.0678C2.76351 12.9311 2.84652 12.8069 2.95117 12.7022C3.05582 12.5976 3.18005 12.5146 3.31678 12.4579C3.45351 12.4013 3.60005 12.3721 3.74805 12.3721C3.89604 12.3721 4.04258 12.4013 4.17931 12.4579C4.31604 12.5146 4.44027 12.5976 4.54492 12.7022L8.99898 17.1563L20.203 5.9541C20.4144 5.74276 20.701 5.62402 20.9999 5.62402C21.2988 5.62402 21.5854 5.74276 21.7968 5.9541C22.0081 6.16544 22.1269 6.45209 22.1269 6.75098C22.1269 7.04986 22.0081 7.33651 21.7968 7.54785L21.7949 7.54597Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/*       <NextStepButton
        onClick={() => {
          // 새 책 추가하는 함수를 넣고 거기서 리턴받아서...
          const newBook = {
            id: 0,
            title: title,
            category: draft.category,
            count: 0,
            color: coverColor,
          };
          setPost({ book: newBook });
          handleNextStep();
          handleNextStep();
        }}
        disabled={!title}
      >
        다음
      </NextStepButton> */}
      </div>
    </>
  );
}
