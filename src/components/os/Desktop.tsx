import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Launchpad from './Launchpad';
import Widgets from './Widgets';

export default function Desktop({ children }: { children: React.ReactNode }) {
  const isBooted = useOSStore((state) => state.isBooted);
  const isDarkMode = useOSStore((state) => state.isDarkMode);

  if (!isBooted) return null;

  const lightWallpaper = "/wallpapers/macos_landscape_day.webp";
  const darkWallpaper = "/wallpapers/macos_landscape_night.webp";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-full h-screen overflow-hidden bg-[#000] selection:bg-blue-500/30"
    >
      {/* Dynamic Wallpaper Layers */}
      <AnimatePresence>
        <motion.div 
          key={isDarkMode ? 'dark' : 'light'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${isDarkMode ? darkWallpaper : lightWallpaper}')`,
            filter: isDarkMode ? 'brightness(0.7) contrast(1.1)' : 'brightness(0.9) contrast(1.05)'
          }}
        />
      </AnimatePresence>
      
      {/* Zoom Animation (Static over images) */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Subtle Dark Overlay (No blur for performance) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Menu Bar */}
      <MenuBar />

      {/* Main Content Area (Windows) */}
      <main className="relative w-full h-full pt-8 pb-20 overflow-hidden">
        <AnimatePresence>
          {children}
        </AnimatePresence>
      </main>

      {/* Launchpad Overlay */}
      <Launchpad />

      {/* Widgets Panel */}
      <Widgets />

      {/* Desktop Icons */}
      <div className="absolute top-12 left-6 flex flex-col items-center gap-6 z-10" />

      {/* Dock */}
      <Dock />

      {/* Vignette and Grain from index.css */}
      <div className="vignette pointer-events-none" />
      <div className="grain pointer-events-none" />
    </motion.div>
  );
}
