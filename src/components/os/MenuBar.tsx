import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Wifi, 
  Battery, 
  Search, 
  LayoutGrid, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX 
} from "lucide-react";
import { useOSStore } from "../../store/useOSStore";
import AppleLogo from "./AppleLogo";
import { cn } from "../../lib/utils";

export default function MenuBar() {
  const [time, setTime] = useState(new Date());
  const focusedApp = useOSStore((state) => state.focusedApp);
  const {
    isDarkMode,
    toggleDarkMode,
    isSoundEnabled,
    toggleSound,
    toggleSpotlight,
    toggleDashboard,
    toggleWidgets,
    isWidgetsOpen,
  } = useOSStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    const dateStr = date.toLocaleDateString('en-US', options);
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return `${dateStr}, ${timeStr}`;
  };

  const appTitle = focusedApp ? (focusedApp === 'about' ? 'Mac' : focusedApp.charAt(0).toUpperCase() + focusedApp.slice(1)) : "Finder";

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-4 z-[500] text-[12px] font-medium shadow-sm border-b transition-all duration-300",
      isDarkMode
        ? cn("glass-dark border-white/5", isWidgetsOpen ? "text-white bg-black/80" : "text-white/90")
        : cn("bg-white/40 backdrop-blur-3xl border-black/10", isWidgetsOpen ? "text-zinc-950 bg-white/40 shadow-md" : "text-zinc-800")
    )}>
      {/* Left Side */}
      <div className="flex items-center space-x-1">
        <div
          onClick={() => useOSStore.getState().openApp('about')}
          className="px-3 hover:bg-white/10 rounded cursor-pointer transition-colors duration-100 py-1"
        >
          <AppleLogo size={14} />
        </div>
        <div className={cn(
          "px-3 font-bold rounded cursor-pointer transition-colors duration-100 py-1",
          isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
        )}>
          {appTitle}
        </div>
        <div className="hidden sm:flex items-center space-x-0.5">
          <span className="px-3 hover:bg-white/10 rounded cursor-pointer transition-colors duration-100 py-1">File</span>
          <span className="px-3 hover:bg-white/10 rounded cursor-pointer transition-colors duration-100 py-1">Edit</span>
          <span className="px-3 hover:bg-white/10 rounded cursor-pointer transition-colors duration-100 py-1">View</span>
          <span className="px-3 hover:bg-white/10 rounded cursor-pointer transition-colors duration-100 py-1">Go</span>
          <span className="px-3 hover:bg-white/10 rounded cursor-pointer transition-colors duration-100 py-1">Window</span>
          <span className="px-3 hover:bg-white/10 rounded cursor-pointer transition-colors duration-100 py-1">Help</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 pr-2 border-r border-white/10 h-5">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={cn(
              "rounded cursor-pointer p-1 transition-colors duration-100 relative w-6 h-6 flex items-center justify-center overflow-hidden",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
            )}
            title={isSoundEnabled ? "Mute Sounds" : "Unmute Sounds"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isSoundEnabled ? 'volume' : 'mute'}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isSoundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={cn(
              "rounded cursor-pointer p-1 transition-colors duration-100 relative w-6 h-6 flex items-center justify-center overflow-hidden",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
            )}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDarkMode ? 'sun' : 'moon'}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
              </motion.div>
            </AnimatePresence>
          </button>
          
          <Wifi size={14} className="hover:bg-white/10 rounded cursor-pointer p-1 transition-colors duration-100" />
          <Battery size={14} className="rotate-90 hover:bg-white/10 rounded cursor-pointer p-1 transition-colors duration-100" />
          
          <Search
            onClick={toggleSpotlight}
            size={14}
            className="hover:bg-white/10 rounded cursor-pointer p-1 transition-colors duration-100"
          />
          <LayoutGrid
            onClick={toggleDashboard}
            size={14}
            className="hover:bg-white/10 rounded cursor-pointer p-1 transition-colors duration-100"
          />
        </div>
        <div
          onClick={toggleWidgets}
          className="flex items-center space-x-2 px-2 hover:bg-white/10 rounded cursor-pointer transition-colors duration-100 py-1 active:bg-white/20"
        >
          <span>{formatDate(time)}</span>
        </div>
      </div>
    </div>
  );
}
