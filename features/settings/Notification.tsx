"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function Notification() {
  const [isOn, setIsOn] = useState<boolean>(
    JSON.parse(localStorage.getItem("marketing") ?? "true")
  );
  return (
    <div className="flex justify-between">
      <p className="font-semibold text-lg text-theme">마케팅 정보 알림</p>
      <button
        onClick={() => {
          setIsOn((prev) => {
            localStorage.setItem("marketing", JSON.stringify(!prev));
            return !prev;
          });
        }}
        className={`flex items-center rounded-full px-0.5 w-12 h-7 ${
          isOn ? "justify-end bg-theme" : "justify-start bg-[#dad2d2]"
        }`}
      >
        <motion.div layout className="bg-white rounded-full w-6 h-6" />
      </button>
    </div>
  );
}
