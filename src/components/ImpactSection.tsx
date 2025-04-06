"use client";

import { useEffect, useRef, useState } from "react";
import "./ImpactSection.scss";

const counters = [
  { label: "Creators", target: 250 },
  { label: "Live Hosts", target: 750 },
  { label: "Projects", target: 3000 },
];

const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  //const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start = 0;
    const duration = 10;
    const stepTime = Math.max(Math.floor(duration / target), 1);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <div className="impact-number">{count.toLocaleString()}+</div>;
};

export default function ImpactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="impact-section">
    <div className="impact-title">
        <h2>
        <span className="gradient-text">Driven by Excellence</span>
        <br />
        <span className="gradient-text">Defined by Results</span>
        </h2>
    </div>

    {/* 카운터 영역 */}
    <div className="impact-stats">
        {counters.map(({ label, target }) => (
        <div key={label} className="impact-item">
            <div className="impact-label">{label}</div>
            <Counter target={target} />
        </div>
        ))}
    </div>
    </section>

  );
}
