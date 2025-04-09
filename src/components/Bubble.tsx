"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./BubbleText.scss";

const Bubble = ({ scrollY }: { scrollY: number }) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.002;
      mesh.current.rotation.x += 0.001;
      const eased = Math.pow(scrollY, 1.2);
      const scale = 1 + eased * 4;
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 128, 128]} />
      <MeshDistortMaterial
        color="#ffffff"
        opacity={0.9}
        roughness={1}
        metalness={0.5}
        clearcoat={0.7}
        clearcoatRoughness={0.1}
        reflectivity={1}
        distort={0.3}
        speed={2}
        emissive={"#A7D8FF"}
        emissiveIntensity={2}
        sheen={0.5}
        sheenColor={new THREE.Color("#FF0000")}
        toneMapped={false}
        transparent
      />
    </mesh>
  );
};

export default function BubbleScene() {
  const [scrollY, setScrollY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const textRef = useRef<HTMLHeadingElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null); // ✅ 소개 텍스트 제어용 ref

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollRatio = Math.min(currentScroll / maxScroll, 1);
      setScrollY(scrollRatio);

      const fadeStart = 0.1;
      let fadeRatio = 0;
      if (scrollRatio > fadeStart) {
        fadeRatio = Math.min((scrollRatio - fadeStart) / (1 - fadeStart), 1);
      }

      if (textRef.current) {
        textRef.current.style.opacity = `${1 - fadeRatio}`;
      }

      // ✅ 텍스트만 사라지게 하는 처리 (HorizontalSection 진입 시점 기준)
      const screenH = window.innerHeight;
      const fadeOutStart = screenH * 1.1;
      const fadeOutEnd = screenH * 1.9;

      let introOpacity = 1;
      if (currentScroll >= fadeOutStart && currentScroll <= fadeOutEnd) {
        const ratio = (currentScroll - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        introOpacity = 1 - ratio;
      } else if (currentScroll > fadeOutEnd) {
        introOpacity = 0;
      }

      if (introTextRef.current) {
        introTextRef.current.style.opacity = `${introOpacity}`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "auto";
  }, [isLocked]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating || isLocked) {
        e.preventDefault();
        return;
      }

      const currentY = window.scrollY;
      const screenH = window.innerHeight;

      if (e.deltaY > 0) {
        if (currentY < screenH - 10) {
          setIsAnimating(true);
          window.scrollTo({ top: screenH, behavior: "smooth" });

          setIsLocked(true);
          setTimeout(() => setIsLocked(false), 1500);
          setTimeout(() => setIsAnimating(false), 1200);
        } else if (currentY >= screenH && currentY < screenH * 2 - 10) {
          setIsAnimating(true);
          window.scrollTo({ top: screenH * 2, behavior: "smooth" });
          setTimeout(() => setIsAnimating(false), 1200);
        }
      }

      // // 위로 스크롤
      // if (e.deltaY < 0) {
      //   if (currentY >= screenH * 2 - 10 && currentY < screenH * 3 - 10) {
      //     setIsAnimating(true);
      //     window.scrollTo({ top: screenH, behavior: "smooth" });

      //     setIsLocked(true);
      //     setTimeout(() => setIsLocked(false), 1500);
      //     setTimeout(() => setIsAnimating(false), 1200);
      //   } else if (currentY >= screenH - 10 && currentY < screenH + 10) {
      //     setIsAnimating(true);
      //     window.scrollTo({ top: 0, behavior: "smooth" });
      //     setTimeout(() => setIsAnimating(false), 1200);
      //   }
      // }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isAnimating, isLocked]);

  return (
    <>
      {/* ✅ 비눗방울 영역 */}
      <div
        className="fixed top-0 left-0 w-full h-screen z-20 transition-opacity duration-700"
        style={{
          opacity: 1 - scrollY,
          pointerEvents: scrollY === 1 ? "none" : "auto",
          zIndex: scrollY === 1 ? -1 : 20,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 ref={textRef} className="bubble-text">
            3STEP GLOBAL
          </h1>
        </div>

        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} />
          <Bubble scrollY={scrollY} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* ✅ 회사 소개 텍스트 영역 */}
      <div
        className="fixed top-0 left-0 w-full h-screen flex justify-center items-center aurora-section transition-opacity duration-700"
        style={{
          opacity: scrollY,
          zIndex: scrollY === 1 ? -1 : 10,
          pointerEvents: scrollY === 1 ? "none" : "auto",
        }}
      >
        {/* SVG 오로라 선 */}
        <svg className="aurora-svg" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7FC9F8" />
              <stop offset="50%" stopColor="#A5CFFF" />
              <stop offset="100%" stopColor="#8089E0" />
            </linearGradient>
          </defs>
          <path d="M0,300 C360,100 1080,500 1440,300" className="aurora-line" />
        </svg>

        {/* ✅ 텍스트만 fade 효과 적용 */}
        <div
          ref={introTextRef}
          className="text-white text-center z-10 transition-opacity duration-1000"
          style={{ opacity: 1 }}
        >
          <h2 className="text-4xl font-medium mb-6 leading-tight">
            Our dreams will change the world
          </h2>
          <p className="text-2xl font-light mb-2">우리의 콘텐츠는 이제 글로벌로 향합니다.</p>
          <p className="text-2xl font-light mb-2">상상 그 너머의 인터랙션으로</p>
          <p className="text-2xl font-light mb-2">비즈니스의 성공을 실현합니다.</p>
          <p className="text-2xl font-light">그 시작은 바로 오늘입니다.</p>
        </div>
      </div>

      {/* 스크롤 공간 확보 */}
      <div style={{ height: "200vh" }} />
    </>
  );
}
