// components/FloatingHeader.tsx

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingHeader() {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = 50; // px
      const { clientX, clientY } = e;

      if (
        clientY <= threshold || // top
        clientX <= threshold || // left
        window.innerWidth - clientX <= threshold // right
      ) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full bg-white bg-opacity-80 shadow-md backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center"
        >
          <h1 className="text-xl font-bold">My Company</h1>
          <nav className="space-x-6 text-sm">
            <a href="#company" className="hover:underline">회사소개</a>
            <a href="#creators" className="hover:underline">크리에이터</a>
            <a href="#business" className="hover:underline">비즈니스</a>
            <a href="#contact" className="hover:underline">연락처</a>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
