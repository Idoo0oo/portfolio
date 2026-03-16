import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'motion/react';
import SkillsMarquee from '../components/SkillsMarquee';

const Particles = lazy(() => import('../three/Particles'));

export default function Hero() {
  return (
    // Section ini akan mengambil tinggi penuh layar (h-screen)
    <section id='home' className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      
      {/* Lapisan Latar Belakang 3D */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <Suspense fallback={null}>
            <Particles />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay gradien gelap di bawah agar teks lebih terbaca dan menyatu dengan section berikutnya */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-dark)]" />

      {/* Lapisan Konten Teks */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white"
        >
          Hi, I'm <span className="text-[var(--color-neon)] drop-shadow-[0_0_15px_rgba(0,255,157,0.5)]">Ido.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl font-light"
        >
          I design and build <span className="text-white font-medium">interactive digital experiences.</span>
        </motion.p>
        
        {/* Indikator scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16"
        >
          <p className="text-sm text-gray-600 font-mono animate-pulse uppercase tracking-widest">
            [ Scroll to explore ]
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <SkillsMarquee />
        </div>
      </div>
    </section>
  );
}