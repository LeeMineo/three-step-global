"use client";

import { useEffect, useRef, useState } from "react";
import "./Influencer.scss";

const influencers = [
  {
    src: "/influencer1.png",
    hoverSrc: "/influencer1_hover.png",
    name: "selin.egmn",
    followers: "730K",
    link: "https://www.instagram.com/selin.egmn",
  },
  {
    src: "/influencer2.png",
    hoverSrc: "/influencer2_hover.png",
    name: "minseo.influencer",
    followers: "117K",
    link: "https://www.instagram.com/minseo.influencer",
  },
  {
    src: "/influencer3.png",
    hoverSrc: "/influencer3_hover.png",
    name: "hyemi.live",
    followers: "82K",
    link: "https://www.instagram.com/hyemi.live",
  },
];

export default function Influencer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [circleScale, setCircleScale] = useState(0.2);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const winH = window.innerHeight;

      const distance = scrollY - (top - winH);
      const progress = Math.min(Math.max(distance / winH, 0), 1);
      const scale = 0.2 + progress * 2.5;
      setCircleScale(scale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const influencerTop = sectionRef.current?.offsetTop ?? 0;
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      const shouldHide = scrollY > influencerTop - winH / 2;

      const horizontalItems = document.querySelectorAll(".horizontal-item");
      horizontalItems.forEach((item) => {
        const el = item as HTMLElement;
        el.style.opacity = shouldHide ? "0" : "1";
        el.style.pointerEvents = shouldHide ? "none" : "auto";
        el.style.zIndex = shouldHide ? "-1" : "10";
        el.style.transition = "opacity 0.4s ease, z-index 0.4s ease";
      });

      const endText = document.querySelector(".horizontal-end-section h2") as HTMLElement;
      const scrollIndicator = document.querySelector(".scroll-indicator") as HTMLElement;
      const endMainTitle = document.querySelector(".end-main-title") as HTMLElement;

      [endText, scrollIndicator, endMainTitle].forEach((el) => {
        if (el) {
          el.style.opacity = shouldHide ? "0" : "1";
          el.style.pointerEvents = shouldHide ? "none" : "auto";
          el.style.zIndex = shouldHide ? "-1" : "10";
          el.style.transition = "opacity 0.4s ease, z-index 0.4s ease";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="influencer-section">
      <div className="circle-reveal" style={{ transform: `scale(${circleScale})` }} />

      <div className="intro-floating-text">
        <h1>
          <span>Meet the Icons</span>
          <br />
          <span>Behind Our Influence</span>
        </h1>
        <div className="scroll-down-arrow">↓</div>
      </div>

      <div className="rotating-background">
        <p>Creators Who Define What&apos;s Next. Meet the Power Behind the Screen.</p>
      </div>

      <div className="influencer-card-container">
        {influencers.map((item, i) => (
  <a
  key={i}
  href={item.link}
  target="_blank"
  rel="noopener noreferrer"
  className={`influencer-card card-${i}`}
>
  <div
    className="hover-wrapper"
    onMouseEnter={() => {
      console.log("✅ hover enter:", i);
      setHoverIndex(i);
    }}
    onMouseLeave={() => {
      console.log("❌ hover leave");
      setHoverIndex(null);
    }}
  >
    <img
      key={hoverIndex === i ? `${item.name}-hover` : `${item.name}-normal`}
      src={hoverIndex === i ? item.hoverSrc : item.src}
      alt={item.name}
    />
    <div className="overlay">
      <div className="info">
        <p>@{item.name}</p>
        <p>{item.followers}</p>
      </div>
      <div className="bar left-bar"></div>
      <div className="bar right-bar"></div>
    </div>
  </div>
</a>

        ))}
      </div>
    </section>
  );
}
