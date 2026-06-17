import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../core/store/useOSStore';
import { cn, triggerHaptic } from '../../core/lib/utils';
import { Lock, ChevronRight } from 'lucide-react';

interface MobileLockScreenProps {
  onUnlock: () => void;
}

export default function MobileLockScreen({ onUnlock }: MobileLockScreenProps) {
  const { isDarkMode } = useOSStore();
  const [time, setTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Slide gesture
  const dragX = useMotionValue(0);
  const trackWidth = 280;
  const thumbSize = 56;
  const maxDrag = trackWidth - thumbSize - 12; // padding

  const bgOpacity = useTransform(dragX, [0, maxDrag], [1, 0]);
  const textOpacity = useTransform(dragX, [0, maxDrag * 0.5], [1, 0]);
  const scaleOut = useTransform(dragX, [maxDrag * 0.8, maxDrag], [1, 1.15]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > maxDrag * 0.75) {
      triggerHaptic();
      setIsUnlocking(true);
      sessionStorage.setItem('portfolio_unlocked', 'true');
      setTimeout(() => onUnlock(), 600);
    }
  };

  const hours = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <AnimatePresence>
      {!isUnlocking ? (
        <motion.div
          key="lockscreen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-between overflow-hidden select-none"
        >
          {/* Wallpaper */}
          <div className="absolute inset-0 z-0">
            <img
              src={isDarkMode ? '/wallpapers/macos_landscape_night.webp' : '/wallpapers/macos_landscape_day.webp'}
              alt="Wallpaper"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          </div>

          {/* Top Section: Time & Date */}
          <motion.div
            style={{ opacity: bgOpacity }}
            className="relative z-10 flex flex-col items-center pt-24 gap-1"
          >
            {/* Lock Icon */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-4"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Lock size={14} className="text-white/70" />
              </div>
            </motion.div>

            {/* Time */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[82px] font-[200] text-white leading-none tracking-tight drop-shadow-2xl"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {hours}
            </motion.h1>

            {/* Date */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-[17px] font-medium text-white/90 tracking-wide drop-shadow-lg"
            >
              {dateStr}
            </motion.p>
          </motion.div>

          {/* Bottom Section: Slide to Unlock */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ scale: scaleOut }}
            className="relative z-10 mb-16"
          >
            {/* Track */}
            <div
              className={cn(
                "relative rounded-full overflow-hidden border",
                "bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl"
              )}
              style={{ width: trackWidth, height: thumbSize + 8, padding: 4 }}
            >
              {/* Text Label */}
              <motion.div
                style={{ opacity: textOpacity }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="text-[14px] font-medium text-white/60 tracking-wide pl-8">
                  slide to unlock
                </span>
              </motion.div>

              {/* Shimmering Arrow Hints */}
              <motion.div
                style={{ opacity: textOpacity }}
                className="absolute right-16 top-1/2 -translate-y-1/2 flex items-center gap-0 pointer-events-none"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 0.6, 0.2], x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <ChevronRight size={14} className="text-white/30 -ml-2" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Draggable Thumb */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: maxDrag }}
                dragElastic={0.05}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative z-10 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing",
                  "bg-white/90 shadow-xl backdrop-blur-sm"
                )}
                style={{ x: dragX, width: thumbSize, height: thumbSize }}
              >
                <ChevronRight size={22} className="text-zinc-700" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
