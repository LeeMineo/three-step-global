// components/SocialMediaSection.tsx

"use client";

import React, { useState } from "react";
import "./SocialMediaSection.scss";

const icons = [
  {
    name: "Instagram",
    count: "160명",
    img: "/icons/instagram.png", // public 폴더에 이미지 넣어야 함
    position: { top: "10%", left: "20%" },
  },
  {
    name: "TikTok",
    count: "170명",
    img: "/icons/tiktok.png",
    position: { top: "20%", right: "20%" },
  },
  {
    name: "Youtube",
    count: "80명",
    img: "/icons/youtube.png",
    position: { bottom: "10%", left: "40%" },
  },
];

const SocialMediaSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="social-media-section">
        {/* <div className="text-white text-right mt-10 fadeout-box">
  <h2
    className="text-4xl font-medium mb-6 leading-tight"
  >
    WE ARE THE FIRST AND THE FUTURE
  </h2>
  <p className="text-2xl font-light mb-2">
    국내 최초 <strong>MCN &</strong> 라이브 커머스의 선두주자
  </p>
  <p className="text-2xl font-light mb-2">
    우리는 콘텐츠와 커머스를 연결하고,
  </p>
  <p className="text-2xl font-light mb-2">
    상상 그 너머의 인터랙션으로
  </p>
  <p className="text-2xl font-light">
    비즈니스의 성공을 실현합니다.
  </p>
</div> */}
      {icons.map((icon, index) => (
        <div
          key={icon.name}
          className="icon-container"
          style={icon.position}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img src={icon.img} alt={icon.name} className="icon-image" />
          {hoveredIndex === index && (
            <div className="icon-label">
              <p>{icon.name}</p>
              <p>{icon.count}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default SocialMediaSection;
