// AuroraPlane.tsx
"use client";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function AuroraPlane({ scroll }: { scroll: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uScroll.value = scroll; // 💡 스크롤 전달
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uScroll;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;

            float wave = sin((uv.y + uTime * 0.2 + uScroll * 5.0) * 5.0) * 0.5 + 0.5;

            vec3 color1 = vec3(0.498, 0.788, 0.972); // #7FC9F8
            vec3 color2 = vec3(0.502, 0.535, 0.878); // #8089E0

            vec3 blended = mix(color1, color2, wave);
            gl_FragColor = vec4(blended, 1.0);
          }
        `}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
