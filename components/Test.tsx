"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

export default function Test() {
  return (
    <div className="w-full max-w-md mx-auto h-64 border border-red-500">
      <Swiper slidesPerView={1} spaceBetween={0} style={{ height: "100%" }}>
        <SwiperSlide>
          <div className="h-full w-full bg-blue-500 text-white flex items-center justify-center">
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full w-full bg-green-500 text-white flex items-center justify-center">
            Slide 2
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
