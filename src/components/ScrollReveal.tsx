import { motion } from "motion/react";
import { type ReactNode } from "react";
import { useScrollDirection } from "../hooks/useScrollDirection";

interface Props { children: ReactNode; }

export default function ScrollReveal({ children }: Props) {
  const direction = useScrollDirection();

  const variants = {
    initial: {
      opacity: 0,
      y: direction === "down" ? 100 : -100,
      rotateX: direction === "down" ? -20 : 20,
      scale: 0.98,
      filter: "blur(4px)"
    },
    animate: {
      opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)"
    }
  };

  return (
    <div style={{ perspective: "1200px" }} className="w-full h-full">
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={variants}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: direction === "down" ? "top center" : "bottom center" }}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}