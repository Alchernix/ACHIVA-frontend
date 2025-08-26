"use client";

import Footer from "@/components/Footer";
import HomeSection1 from "@/features/home/Section1";
import HomeSection2 from "@/features/home/Section2";

export default function Page() {
  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="flex-1 flex">
        <div className="mx-auto w-full max-w-140">
          <HomeSection1 />
          <div className="h-5 w-full" />
          <HomeSection2 />
        </div>
        <div className="bg-[#d9d9d9] w-60 hidden md:block" />
      </div>
      <Footer />
    </div>
  );
}
