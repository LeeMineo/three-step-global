"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function VideoIntro() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // ✅ 스크롤 값에 따라 원 반지름을 설정 (100px → 2000px까지 커짐)
  //    → 100: 처음에 작게 시작 (좌하단 작은 원)
  //    → 2000: 완전히 화면을 뚫고 비디오가 다 보일 정도로 커짐
  const rawSize = useTransform(scrollYProgress, [0, 1], [300, 2000]);

  // ✅ 반지름 값을 부드럽게 애니메이션화
  const smoothSize = useSpring(rawSize, { stiffness: 80, damping: 30 });

  // ✅ 마스크용 radial-gradient 생성
  const maskValue = useTransform(smoothSize, (r) => 
    `radial-gradient(circle ${r}px at left bottom, transparent 100%, black ${r}px)`
  );

  // ✅ 텍스트는 30% 스크롤 후부터 천천히 나타남
  const textOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[200vh] overflow-hidden bg-white">
      {/* 배경 영상 */}
      <video
        src="/videos/intro.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      />

      {/* 하얀 마스크 위에 구멍 뚫기 */}
      <motion.div
        className="fixed inset-0 z-10 bg-white pointer-events-none"
        style={{
          WebkitMaskImage: maskValue,
          maskImage: maskValue,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      {/* 텍스트 - 점점 나타남 */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
          BE A CREATOR
        </h1>
      </motion.div>
    </section>
  );
}
