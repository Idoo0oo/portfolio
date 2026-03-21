import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOSStore } from "../../core/store/useOSStore";
import AppleLogo from "./AppleLogo";
import { cn } from "../../core/lib/utils";

export default function BootScreen() {
  const [progress, setProgress] = useState(0);
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const boot = useOSStore((state) => state.boot);

  const handlePowerOn = () => {
    setIsPoweredOn(true);
  };

  useEffect(() => {
    if (!isPoweredOn) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // 800ms delay after bar is full before showing desktop
          setTimeout(boot, 800); 
          return 100;
        }
        // Much slower: ~2-4 seconds total boot time
        return prev + Math.random() * 4 + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [boot, isPoweredOn]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      onClick={!isPoweredOn ? handlePowerOn : undefined}
      className={cn(
        "fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center transition-colors duration-1000 overflow-hidden",
        !isPoweredOn ? "cursor-pointer" : "cursor-default"
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Symmetrical Stack */}
      <div className="relative flex flex-col items-center gap-10">
        <motion.div
          animate={!isPoweredOn ? { 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.02, 1]
          } : {
            opacity: 1,
            scale: 1,
          }}
          transition={!isPoweredOn ? { 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          } : { duration: 0.6 }}
          className="text-white"
        >
          <AppleLogo size={90} />
        </motion.div>

        {/* Loading area - No Absolute positioning to ensure same axis */}
        <div className="h-4 flex flex-col items-center justify-center">
          {isPoweredOn ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div 
                className="h-full bg-white transition-all duration-300"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </motion.div>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-white/20 text-[10px] font-medium uppercase tracking-widest"
            >
              Click to Start
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
