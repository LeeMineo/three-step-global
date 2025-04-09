"use client";

import { useEffect, useRef } from "react";
import "./Influencer.scss";

export default function Influencer() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 스크롤 따라 배경 텍스트 이동
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const start = sectionTop - windowHeight;
      const end = sectionTop + sectionHeight;

      if (scrollY >= start && scrollY <= end) {
        const progress = (scrollY - start) / (end - start); // 0~1
        const text = document.querySelector(".bg-diagonal-text") as HTMLElement;
        if (text) {
          text.style.transform = `translateX(-${progress * 400}px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const influencers = [
    "/influencer1.png",
    "/influencer2.png",
    "/influencer3.png",
  ];

  return (
    <section ref={sectionRef} className="influencer-section">
      {/* 배경 대각선 텍스트 */}
      <div className="bg-diagonal-wrapper">
        <div className="bg-diagonal-text">
            <p>Meet the Power Behind the Screen.Meet the Power Behind the Screen.</p>
            <p>Creators Who Define What&apos;s Next.Creators Who Define What&apos;s Next.</p>
        </div>
        </div>


      <div className="intro-text">
        <h1>
          <span>The Faces of</span>
          <br />
          <span>Innovation,</span>
          <br />
          <span>Influence, and</span>
          <br />
          <span>Impact</span>
        </h1>
      </div>

      <div style={{ height: "50vh" }} />

      <div className="card-grid">
        {influencers.map((src, i) => (
          <img key={i} src={src} alt={`influencer-${i}`} className="influencer-card" />
        ))}
      </div>
    </section>
  );
}
