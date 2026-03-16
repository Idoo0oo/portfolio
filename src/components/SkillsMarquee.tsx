import { motion } from "motion/react";

const skills = [
  "React", "TypeScript", "Next.js", "Three.js", "TailwindCSS", 
  "Node.js", "Zustand", "Framer Motion", "WebGL", "GLSL", "PostgreSQL"
];

export default function SkillsMarquee() {
  return (
    <div className="relative w-full py-10 bg-black overflow-hidden border-y border-white/5">
      {/* Efek Masking: Agar teks memudar di pinggir kiri dan kanan */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }} // Menyesuaikan jarak geser
        transition={{ 
          repeat: Infinity, 
          duration: 20, 
          ease: "linear" 
        }}
      >
        {/* Kita render list dua kali agar tidak ada celah saat looping */}
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <span 
            key={i} 
            className="text-4xl md:text-6xl font-bold font-mono mx-10 text-white/10 hover:text-[var(--color-neon)] transition-colors duration-500 uppercase tracking-tighter cursor-default"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}