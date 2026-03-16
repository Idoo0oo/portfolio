import { useRef, useState, useCallback } from "react";
import { motion } from "motion/react";

interface Props {
  children: string;
  className?: string;
  strength?: number; // Seberapa jauh teks narik kursor
}

export default function MagneticText({ children, className = "", strength = 15 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Hitung titik tengah elemen
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Hitung jarak kursor dari tengah
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Batasi area pengaruh (misal 100px)
    const radius = 100;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < radius) {
      // Makin dekat kursor, makin kuat tarikannya
      const power = (radius - distance) / radius;
      setPosition({ 
        x: (distanceX / radius) * strength * power, 
        y: (distanceY / radius) * strength * power 
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [strength]);

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.1 }}
      className={`inline-block cursor-default ${className}`}
    >
      {children}
    </motion.span>
  );
}