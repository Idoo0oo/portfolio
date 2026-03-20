import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, X } from "lucide-react";
import { useOSStore, type AppId } from "../../store/useOSStore";
import { cn } from "../../lib/utils";
import { useSound } from "../../hooks/useSound";

interface WindowProps {
  id: AppId;
  title: string;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
}

export default function Window({ id, title, children, defaultPosition = { x: 20, y: 20 } }: WindowProps) {
  const { 
    focusedApp, 
    minimizedApps, 
    maximizedApps,
    closeApp, 
    focusApp, 
    minimizeApp,
    toggleMaximizeApp,
    isDarkMode
  } = useOSStore();
  const { playSound } = useSound();

  const isFocused = focusedApp === id;
  const isMinimized = minimizedApps.includes(id);
  const isMaximized = maximizedApps.includes(id);

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          drag={!isMaximized}
          dragMomentum={false}
          initial={{ 
            opacity: 0, 
            scale: 0.95, 
            x: defaultPosition.x, 
            y: defaultPosition.y 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            zIndex: isFocused ? 100 : 10,
            x: isMaximized ? 0 : undefined,
            y: isMaximized ? 0 : undefined,
            top: isMaximized ? 28 : undefined,
            left: isMaximized ? 0 : undefined,
            width: isMaximized ? '100%' : undefined,
            height: isMaximized ? 'calc(100vh - 28px)' : undefined,
          }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
          onMouseDown={() => focusApp(id)}
          className={cn(
            "absolute flex flex-col shadow-2xl border transition-all duration-300 ease-out overflow-hidden backdrop-blur-3xl",
            isDarkMode 
              ? "bg-zinc-900/40 border-white/10 shadow-black/50" 
              : "bg-white/50 border-black/10 shadow-black/20",
            isFocused 
              ? (isDarkMode ? 'border-white/20' : 'border-black/20') 
              : (isDarkMode ? 'border-white/10' : 'border-black/10'),
            isMaximized ? 'rounded-none' : 'rounded-xl',
            !isMaximized && 'w-[85vw] max-w-5xl h-[75vh]'
          )}
          style={{ touchAction: "none" }}
        >
          {/* macOS Header (Area for drag) */}
          <div className={cn(
            "flex items-center space-x-2 px-4 py-3 border-b relative group transition-colors",
            isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5",
            !isMaximized ? "cursor-grab active:cursor-grabbing" : "cursor-default"
          )}>
            
            {/* Traffic Lights */}
            <div className="flex space-x-2 z-10">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    playSound('click', 0.4);
                    closeApp(id); 
                  }}
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] flex items-center justify-center text-black/60 hover:text-black opacity-90 transition-all active:brightness-90 group-hover:opacity-100"
                >
                  <X size={10} className="hidden group-hover:block" />
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    playSound('click', 0.4);
                    minimizeApp(id); 
                  }}
                  className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center text-black/60 hover:text-black opacity-90 transition-all active:brightness-90 group-hover:opacity-100"
                >
                  <Minimize2 size={10} className="hidden group-hover:block" />
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    playSound('click', 0.4);
                    toggleMaximizeApp(id); 
                  }}
                  className="w-3.5 h-3.5 rounded-full bg-[#27c93f] flex items-center justify-center text-black/60 hover:text-black opacity-90 transition-all active:brightness-90 group-hover:opacity-100"
                >
                  <Maximize2 size={10} className="hidden group-hover:block" />
                </button>
              </div>

            {/* Title */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className={cn(
                "text-[12px] font-semibold select-none transition-colors",
                isDarkMode ? "text-white/40" : "text-black/80"
              )}>
                {title}
              </span>
            </div>
          </div>

          {/* Content Area - Changed to flex-1 to allow children to fill space */}
          <div className="flex-1 bg-transparent overflow-hidden">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}