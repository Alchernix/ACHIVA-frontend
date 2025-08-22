"use client";
import { useState } from "react";
import Image from "next/image";

export default function PostImg({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-square w-full h-full">
      {!loaded && (
        <div>
          <div className="bg-loading absolute inset-0 animate-pulse"></div>
        </div>
      )}
      <Image
        className={`${loaded ? "" : "opacity-0"}`}
        src={url}
        alt="profile image"
        fill
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 w-full h-full bg-black/70" />
    </div>
  );
}
