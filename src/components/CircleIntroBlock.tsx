"use client";

import { useEffect, useState } from "react";
import "./CircleIntroBlock.scss";

export default function CircleIntroBlock() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const triggerStart = window.innerHeight * 1.8;
      const triggerEnd = window.innerHeight * 2.8;

      setIsActive(y >= triggerStart && y < triggerEnd);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`circle-intro-fixed ${isActive ? "show" : ""}`}>
      <div className="circle" />
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
    </div>
  );
}
