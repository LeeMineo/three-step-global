"use client";

import React from "react";
//import SNSBubble from "./SNSBubble";

export default function CompanyIntro({ scrollRatio }: { scrollRatio: number }) {
    const showBg = scrollRatio >= 0.9;
    const showText = scrollRatio >= 0.98;
  
    return (
      <section
        className="relative w-full h-screen transition-opacity transition-transform duration-700 ease-out"
        style={{
          opacity: showBg ? 1 : 0,
          background: showBg
            ? "linear-gradient(to bottom right, #f0f4ff, #eaeaff)" // 배경이 서서히 뜨게
            : "transparent",
          transform: `translateY(${showBg ? "0px" : "100px"})`,
          pointerEvents: showBg ? "auto" : "none",
        }}
      >
        <div
          className="text-center pt-20 transition-opacity duration-700 delay-200"
          style={{
            opacity: showText ? 1 : 0,
            transform: `translateY(${showText ? "0px" : "20px"})`,
          }}
        >
          <h2 className="text-xl font-bold mb-2">WE ARE THE FIRST AND THE FUTURE</h2>
          <p className="leading-7">
            국내 최초 MCN & 라이브 커머스의 선두주자<br />
            콘텐츠와 커머스를 연결하고,<br />
            상상 그 너머의 인터랙션으로<br />
            비즈니스의 성공을 실현합니다.
          </p>
        </div>
      </section>
    );
  }
  