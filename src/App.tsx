import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';

import BootScreen from './components/os/BootScreen';
import Desktop from './components/os/Desktop';
import Window from './components/os/Window';
import Terminal from './components/os/Terminal';

import { useOSStore } from './store/useOSStore';
import Spotlight from './components/os/Spotlight';
import { useEffect, useState } from 'react';
import { useSound } from './hooks/useSound';

// Components (OS Environment)
import AboutThisMac from './components/os/AboutThisMac';
import Finder from './components/os/Finder';
import Notes from './components/os/Notes';
import Mail from './components/os/Mail';
import Preview from './components/os/Preview';
import Settings from './components/os/Settings';
import MobileFallback from './components/MobileFallback';

function App() {
  const { isBooted, isDarkMode, openApps, toggleSpotlight, accentColor } = useOSStore();
  const { playSound } = useSound();

  // Sync Accent Color to CSS Variables
  useEffect(() => {
    document.documentElement.style.setProperty('--color-accent', accentColor);
    // Also update a neon-glow variable based on the accent
    document.documentElement.style.setProperty('--color-accent-glow', `${accentColor}33`); // 20% opacity
  }, [accentColor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSpotlight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSpotlight]);

  useEffect(() => {
    const handleGlobalClick = () => {
      playSound('click', 0.4);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [playSound]);

  useEffect(() => {
    if (isBooted) {
      playSound('chime', 0.8);
    }
  }, [isBooted, playSound]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const renderAppContent = (id: string) => {
    switch (id) {
      case 'terminal': return <Terminal />;
      case 'about': return <AboutThisMac />;
      case 'projects': return <Finder />;
      case 'experience': return <Notes />;
      case 'contact': return <Mail />;
      case 'preview': return <Preview />;
      case 'settings': return <Settings />;
      default: return null;
    }
  };

  const getAppTitle = (id: string) => {
    switch (id) {
      case 'terminal': return 'terminal — zsh — 80×24';
      case 'about': return 'About Me';
      case 'projects': return 'Projects — Finder';
      case 'experience': return 'Notes — Experience';
      case 'contact': return 'Mail — Compose New';
      case 'preview': return 'Preview — cv-muhammad-ditto.pdf';
      default: return id.charAt(0).toUpperCase() + id.slice(1);
    }
  };

  if (isMobile) {
    return <MobileFallback />;
  }

  return (
    <div className="h-screen w-full bg-black overflow-hidden select-none">
      <Toaster position="bottom-right" theme={isDarkMode ? "dark" : "light"} /> 
      
      {/* Spotlight Overlay */}
      <Spotlight />

      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootScreen key="boot" />
        ) : (
          <motion.div
            key="desktop-v2"
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.98 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ 
              duration: 2.5, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3 
            }}
            className="h-full w-full"
          >
            <Desktop key="desktop">
              {openApps.map((appId) => (
                <Window 
                  key={appId} 
                  id={appId as any} 
                  title={getAppTitle(appId)}
                >
                  {renderAppContent(appId)}
                </Window>
              ))}
              
              {/* Global Overlays */}
            </Desktop>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;