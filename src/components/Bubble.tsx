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
      const scale = 1 + scrollY * 2;
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
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollRatio = Math.min(currentScroll / maxScroll, 1);
      setScrollY(scrollRatio);

      if (textRef.current) {
        textRef.current.style.opacity = `${1 - scrollRatio}`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 비눗방울 섹션 */}
      <div
        className="fixed top-0 left-0 w-full h-screen z-20 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: 1 - scrollY, // scrollY 0이면 보여지고, 1이면 사라짐
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

      {/* 회사 소개 개요 */}
        <div
        className="fixed top-0 left-0 w-full h-screen z-10 flex justify-end items-start p-10 transition-opacity duration-700"
        style={{
            background: "linear-gradient(to bottom, #c24ca0, #5b5bcf)",
            opacity: scrollY, // 0~1에 따라 점점 보이게
        }}
        >
        <div className="text-white text-right mt-10 fadein-box">
            <h2 className="text-4xl font-medium mb-6 leading-tight">
                WE ARE THE FIRST AND THE FUTURE
            </h2>
                <p className="text-2xl font-light mb-2 fadein-p delay-1">국내 최초 MCN & 라이브 커머스의 선두주자</p>
                <p className="text-2xl font-light mb-2 fadein-p delay-2">우리는 콘텐츠와 커머스를 연결하고,</p>
                <p className="text-2xl font-light mb-2 fadein-p delay-3">상상 그 너머의 인터랙션으로</p>
                <p className="text-2xl font-light fadein-p delay-4">비즈니스의 성공을 실현합니다.</p>
        </div>

        </div>

        {/* 아래로 스크롤 가능하도록 여유 영역 */}
      <div style={{ height: "200vh" }}></div>


    </>
  );
}
