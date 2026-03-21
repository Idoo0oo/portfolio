import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Minimize2, X } from "lucide-react";
import { useOSStore, type AppId } from "../../core/store/useOSStore";
import { cn } from "../../core/lib/utils";
import { useSound } from "../../core/hooks/useSound";

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
            x: isMaximized ? 0 : defaultPosition.x + 20, 
            y: isMaximized ? 0 : defaultPosition.y + 20,
            width: isMaximized ? '100vw' : '85vw',
            height: isMaximized ? 'calc(100vh - 32px)' : '75vh',
          }}
          animate={{ 
            opacity: 1, 
            scale: isMaximized ? 1 : (isFocused ? 1 : 0.98),
            zIndex: isFocused ? 100 : 10,
            
            // Force reset coordinates ONLY during maximization to clear drag drift
            ...(isMaximized ? { x: 0, y: 0, top: 0, left: 0 } : {}),

            top: isMaximized ? 0 : '12.5vh',
            left: isMaximized ? 0 : '7.5vw',
            width: isMaximized ? '100%' : '85vw',
            maxWidth: isMaximized ? '100%' : '1024px',
            height: isMaximized ? '100%' : '75vh',
            filter: !isMaximized && !isFocused ? 'blur(2px) brightness(0.8)' : 'blur(0px) brightness(1)',
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
          exit={{ opacity: 0, scale: 0.8, y: 100 }}
          onMouseDown={() => focusApp(id)}
          className={cn(
            "absolute top-0 left-0 flex flex-col shadow-2xl border overflow-hidden backdrop-blur-3xl",
            isDarkMode 
              ? "bg-zinc-900/40 border-white/10 shadow-black/50" 
              : "bg-white/50 border-black/10 shadow-black/20",
            isFocused 
              ? (isDarkMode ? 'border-white/20' : 'border-black/20') 
              : (isDarkMode ? 'border-white/10' : 'border-black/10'),
            isMaximized ? 'rounded-none' : 'rounded-xl',
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
                {/* Show all traffic lights for a full OS experience */}
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
          <div className="flex-1 bg-transparent overflow-hidden min-h-0">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}