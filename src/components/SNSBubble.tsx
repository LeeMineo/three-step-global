"use client";
import React, { useState } from "react";
import clsx from "clsx";

const icons: Record<string, string> = {
  Instagram: "/icons/instagram.png",
  TikTok: "/icons/tiktok.png",
  Youtube: "/icons/youtube.png",
};

export default function SNSBubble({ platform, count }: { platform: string; count: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center"
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}>
      <img src={icons[platform]} alt={platform}
           className="w-20 h-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-300"
           style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
      />
      <div className={clsx(
        "transition-opacity duration-300 text-center mt-2 text-sm",
        hovered ? "opacity-100" : "opacity-0"
      )}>
        <div className="w-px h-6 bg-white mb-1 mx-auto" />
        <div className="font-bold">{platform}</div>
        <div>{count}명</div>
      </div>
    </div>
  );
}
