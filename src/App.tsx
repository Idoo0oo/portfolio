import { ReactLenis } from 'lenis/react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'; // Tambahkan useScroll & useSpring
import { Toaster } from 'sonner';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar'; // Tambahkan impor Navbar
import Hero from './sections/Hero';
import Showcase from './sections/Showcase';
import CaseStudy from './sections/CaseStudy';
import Contact from './sections/Contact';
import DeveloperOS from './sections/DeveloperOS';
import { useAppStore } from './store/useAppStore';
import MagneticButton from './components/MagneticButton';
import AboutGrid from './sections/AboutGrid';

function App() {
  const { isLoading, isDevMode, toggleDevMode } = useAppStore();
  
  // Logika untuk Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ReactLenis root>
      <CustomCursor />
      <Toaster position="bottom-right" /> 

      {/* Garis Progres Scroll di Paling Atas */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-neon)] origin-left z-50 shadow-[0_0_10px_var(--color-neon)]"
        style={{ scaleX }}
      />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <main className="relative min-h-screen flex flex-col items-center bg-[#0a0a0a]">
          
          <div className="absolute top-6 left-1/2 -translate-x-1/2 md:top-8 md:right-8 md:left-auto md:translate-x-0 z-50">
            <MagneticButton>
              <button 
                onClick={toggleDevMode}
                className="px-5 py-2 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-full text-xs md:text-sm font-mono text-[var(--color-neon)] hover:bg-white/10 hover:border-[var(--color-neon)] transition-all cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.5)] whitespace-nowrap"
              >
                {isDevMode ? "Exit Dev Mode" : "Developer Mode"}
              </button>
            </MagneticButton>
          </div>

          {isDevMode ? (
            <DeveloperOS />
          ) : (
            <div className="w-full">
              {/* Pasang Navbar di sini */}
              <Navbar /> 
              <Hero />
              <Showcase />
              <AboutGrid />
              <CaseStudy />
              <Contact />
            </div>
          )}
        </main>
      )}
    </ReactLenis>
  );
}

export default App;