import { useRef, useState, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Navigation } from "swiper/modules";
import type { PostRes } from "@/types/Post";
import { ContentPage, TitlePage } from "./Pages";
import PostImg from "@/components/PostImg";

export default function Post({ post }: { post: PostRes }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="relative w-full">
      <button
        ref={prevRef}
        className={`${
          isBeginning ? "!hidden" : ""
        } absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex justify-center items-center z-5 bg-white rounded-full w-7 h-7 opacity-50 shadow-md`}
      >
        <svg
          width="15"
          height="26"
          viewBox="0 0 15 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="scale-75"
        >
          <path
            d="M13.7776 23.2228C13.8798 23.325 13.9608 23.4463 14.0161 23.5798C14.0714 23.7134 14.0999 23.8565 14.0999 24.001C14.0999 24.1455 14.0714 24.2887 14.0161 24.4222C13.9608 24.5557 13.8798 24.6771 13.7776 24.7793C13.6754 24.8815 13.554 24.9625 13.4205 25.0178C13.287 25.0731 13.1438 25.1016 12.9993 25.1016C12.8548 25.1016 12.7116 25.0731 12.5781 25.0178C12.4446 24.9625 12.3233 24.8815 12.2211 24.7793L1.22105 13.7793C1.11878 13.6771 1.03764 13.5558 0.982287 13.4222C0.926931 13.2887 0.898438 13.1456 0.898438 13.001C0.898438 12.8564 0.926931 12.7133 0.982287 12.5798C1.03764 12.4462 1.11878 12.3249 1.22105 12.2228L12.2211 1.22275C12.4275 1.01635 12.7074 0.900391 12.9993 0.900391C13.2912 0.900391 13.5711 1.01635 13.7776 1.22275C13.984 1.42916 14.0999 1.7091 14.0999 2.001C14.0999 2.2929 13.984 2.57285 13.7776 2.77925L3.55443 13.001L13.7776 23.2228Z"
            fill="#343330"
          />
        </svg>
      </button>
      <button
        ref={nextRef}
        className={`${
          isEnd ? "!hidden" : ""
        } absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex justify-center items-center z-5 bg-white rounded-full w-7 h-7 opacity-50 shadow-md`}
      >
        <svg
          width="14"
          height="26"
          viewBox="0 0 14 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="scale-75"
        >
          <path
            d="M13.1777 13.7793L2.17769 24.7793C2.07549 24.8815 1.95416 24.9625 1.82063 25.0178C1.68709 25.0731 1.54397 25.1016 1.39944 25.1016C1.25491 25.1016 1.11179 25.0731 0.978254 25.0178C0.844721 24.9625 0.72339 24.8815 0.621189 24.7793C0.518988 24.6771 0.437918 24.5557 0.382607 24.4222C0.327296 24.2887 0.298828 24.1455 0.298828 24.001C0.298828 23.8565 0.327296 23.7134 0.382607 23.5798C0.437918 23.4463 0.518988 23.325 0.621189 23.2228L10.8443 13.001L0.621189 2.77925C0.414784 2.57285 0.298828 2.2929 0.298828 2.001C0.298828 1.7091 0.414784 1.42916 0.621189 1.22275C0.827594 1.01635 1.10754 0.900391 1.39944 0.900391C1.69134 0.900391 1.97129 1.01635 2.17769 1.22275L13.1777 12.2228C13.28 12.3249 13.3611 12.4462 13.4165 12.5798C13.4718 12.7133 13.5003 12.8564 13.5003 13.001C13.5003 13.1456 13.4718 13.2887 13.4165 13.4222C13.3611 13.5558 13.28 13.6771 13.1777 13.7793Z"
            fill="#343330"
          />
        </svg>
      </button>
      <div
        ref={pageRef}
        style={{
          top: "20px",
          right: "20px",
          bottom: "auto",
          left: "auto",
          height: "28px",
          width: "52px",
          color: "white",
        }}
        className={`z-5 absolute bg-black/35 text-[15px] flex items-center justify-center text-white rounded-full`}
      ></div>
      <div ref={containerRef}>
        <Swiper
          pagination={{
            el: pageRef.current,
            type: "fraction",
          }}
          watchOverflow={false} // 1장이어도 pagination 보이게
          navigation={{ prevEl: null, nextEl: null }}
          modules={[Pagination, Navigation]}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation) {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }
            if (swiper.params.pagination) {
              // @ts-ignore
              swiper.params.pagination.el = pageRef.current;
            }
          }}
          onSwiper={(sw) => {
            swiperRef.current = sw;
            setIsBeginning(sw.isBeginning);
            setIsEnd(sw.isEnd);
          }}
          onSlideChange={(sw) => {
            setIsBeginning(sw.isBeginning);
            setIsEnd(sw.isEnd);
          }}
          className="mySwiper"
        >
          {post.photoUrl && (
            <SwiperSlide>
              <TitlePage size={containerWidth ?? 0} post={post} />
            </SwiperSlide>
          )}
          {post.question.map((page, idx) => {
            return (
              <SwiperSlide key={idx}>
                <ContentPage
                  size={containerWidth ?? 0}
                  page={page}
                  backgroundColor={post.backgroundColor}
                />
              </SwiperSlide>
            );
          })}
          {post.photoUrl && (
            <SwiperSlide>
              <PostImg url={post.photoUrl} />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
}
