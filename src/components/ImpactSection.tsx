"use client";

import { useEffect, useState } from "react";
import "./ImpactSection.scss";

const counters = [
  { label: "Creators", target: 250 },
  { label: "Live Hosts", target: 750 },
  { label: "Projects", target: 3000 },
];

const Counter = ({ target, onComplete }: { target: number; onComplete?: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 3000;
    const frameRate = 30;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    const increment = target / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
        onComplete?.();
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [target]);

  return <div className="impact-number">{count.toLocaleString()}+</div>;
};

export default function ImpactSection() {
  const [, setCountingDone] = useState(false);

  return (
    <section className="impact-section">
      <div className="impact-title">
        <h2>
          <span className="gradient-text">Driven by Excellence</span>
          <br />
          <span className="gradient-text">Defined by Results</span>
        </h2>
      </div>

      <div className="impact-stats">
        {counters.map(({ label, target }, i) => (
          <div key={label} className="impact-item">
            <div className="impact-label">{label}</div>
            <Counter
              target={target}
              onComplete={() => {
                if (i === counters.length - 1) setCountingDone(true);
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
