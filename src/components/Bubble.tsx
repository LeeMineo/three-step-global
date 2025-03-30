"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import './BubbleText.scss';

const Bubble = ({ scrollY }: { scrollY: number }) => {
  const mesh = useRef<THREE.Mesh>(null);

  // 회전 애니메이션
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.002;
      mesh.current.rotation.x += 0.001;

      // 스크롤 기반으로 크기 조절 (최대 3배까지 커짐)
      const scale = 1 + scrollY * 2; // scrollY는 0~1 사이 값
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
        transparent // 투명도 제어를 위해 추가
      />
    </mesh>
  );
};

export default function BubbleScene() {
    const [scrollY, setScrollY] = useState(0);
    const textRef = useRef<HTMLHeadingElement>(null);
  
    useEffect(() => {
      const handleScroll = () => {
        const maxScroll = window.innerHeight; // 기준 높이
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
        {/* 전체 화면 고정 */}
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-10">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <h1 ref={textRef} className="bubble-text">3STEP GLOBAL</h1>
          </div>
  
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} />
            <Bubble scrollY={scrollY} />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
  
        {/* 스크롤 유도용 빈 영역 */}
        <div style={{ height: '200vh' }}></div>
      </>
    );
  }
  