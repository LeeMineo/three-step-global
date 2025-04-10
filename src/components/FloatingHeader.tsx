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
          className="fixed top-0 left-0 w-full bg-none bg-opacity-80  z-50 px-6 py-4 flex justify-between items-center"
        >
          <h1 className="text-xl font-bold">3STEP GLOBAL</h1>
          <nav className="space-x-6 text-sm">
            <a href="#company" className="hover:underline">Overview</a>
            <a href="#creators" className="hover:underline">Service</a>
            <a href="#business" className="hover:underline">Reference</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          {/* <nav className="space-x-6 text-sm">
            <a href="#company" className="hover:underline">EN</a>
          </nav> */}
        </motion.header>
      )}
    </AnimatePresence>
  );
}
