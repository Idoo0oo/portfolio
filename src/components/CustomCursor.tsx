import { useEffect, useState } from "react";
// PERBAIKAN 1: Tambahkan useTransform di sini
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [isHovering, setIsHovering] = useState(false);

  // PERBAIKAN 2: Memberikan tipe data 'number' pada x dan y agar TypeScript senang
  const spotlightBackground = useTransform(
    [cursorXSpring, cursorYSpring],
    ([x, y]: number[]) => `radial-gradient(600px at ${x + 16}px ${y + 16}px, rgba(0, 255, 157, 0.05), transparent 80%)`
  );

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (window.getComputedStyle(target).cursor === 'pointer' || 
          target.closest('button') || 
          target.closest('a') || 
          target.closest('[role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* EFEK SPOTLIGHT dengan variabel yang sudah di-fix */}
      <motion.div
        className="fixed inset-0 z-30 pointer-events-none hidden md:block"
        style={{ background: spotlightBackground }}
      />

      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[var(--color-neon)] rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center mix-blend-screen"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(0, 255, 157, 0.1)" : "transparent",
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-[var(--color-neon)] rounded-full"
          animate={{ scale: isHovering ? 0 : 1 }}
        />
      </motion.div>
    </>
  );
}