import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { cn } from '../../core/lib/utils';
import { useOSStore, type AppId } from '../../core/store/useOSStore';

interface NowPlayingWidgetProps {
  onOpenApp: (appId: AppId) => void;
}

const tracks = [
  {
    title: 'Currently Building',
    artist: 'Full Stack Dev · Open to Work',
    album: 'Portfolio 2025',
    gradient: 'from-blue-600 via-indigo-500 to-violet-600',
    glow: 'rgba(99,102,241,0.4)',
    emoji: '🚀',
  },
  {
    title: 'React & TypeScript',
    artist: 'Favourite Stack · 90% Proficiency',
    album: 'Tech Stack',
    gradient: 'from-cyan-500 via-sky-500 to-blue-600',
    glow: 'rgba(14,165,233,0.4)',
    emoji: '⚛️',
  },
  {
    title: 'Available for Hire',
    artist: 'Freelance & Full-time · Tangerang, ID',
    album: 'Status Update',
    gradient: 'from-emerald-500 via-teal-500 to-green-600',
    glow: 'rgba(16,185,129,0.4)',
    emoji: '📍',
  },
  {
    title: 'UI/UX Enthusiast',
    artist: 'Cinematic Interfaces · Motion Design',
    album: 'Design Philosophy',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    glow: 'rgba(236,72,153,0.4)',
    emoji: '🎨',
  },
  {
    title: '6 Projects Shipped',
    artist: 'Web Apps · Full Stack · SaaS',
    album: 'Projects',
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    glow: 'rgba(245,158,11,0.4)',
    emoji: '🏗️',
  },
];

const TRACK_DURATION = 18; // seconds per track

export default function NowPlayingWidget({ onOpenApp }: NowPlayingWidgetProps) {
  const { isDarkMode } = useOSStore();
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);   // 0–100
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);  // 1=forward, -1=backward

  const track = tracks[trackIndex];

  // Auto-advance progress
  useEffect(() => {
    if (!isPlaying) return;
    const step = 100 / (TRACK_DURATION * 20); // 20 ticks/s
    const id = setInterval(() => {
      setProgress((p) => {
        if (p + step >= 100) {
          setDirection(1);
          setTrackIndex((i) => (i + 1) % tracks.length);
          return 0;
        }
        return p + step;
      });
    }, 50);
    return () => clearInterval(id);
  }, [isPlaying, trackIndex]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setTrackIndex((i) => (i + 1) % tracks.length);
    setProgress(0);
  }, []);

  const bg = isDarkMode
    ? 'bg-white/10 border-white/15 backdrop-blur-2xl'
    : 'bg-white/50 border-white/70 backdrop-blur-2xl';

  const titleColor  = isDarkMode ? 'text-white'      : 'text-zinc-900';
  const artistColor = isDarkMode ? 'text-white/55'   : 'text-zinc-500';
  const trackBg     = isDarkMode ? 'bg-white/10'     : 'bg-black/10';

  const slideVariants = {
    enter:  (d: number) => ({ x: d > 0 ? 40  : -40,  opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -40 : 40,   opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 24 }}
      onClick={() => onOpenApp('about')}
      className={cn(
        'w-full rounded-[22px] border shadow-lg cursor-pointer active:scale-[0.98] transition-transform select-none',
        bg
      )}
    >
      <div className="p-4 flex items-center gap-4">

        {/* Album Art */}
        <div
          className="relative w-14 h-14 rounded-[14px] shrink-0 overflow-hidden shadow-lg"
          style={{ boxShadow: `0 4px 20px ${track.glow}` }}
        >
          <div className={cn('absolute inset-0 bg-gradient-to-br', track.gradient)} />
          {/* Spinning vinyl record overlay */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={trackIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.span
                className="text-2xl"
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                {track.emoji}
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={trackIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <p className={cn('text-[13px] font-black truncate leading-tight', titleColor)}>
                {track.title}
              </p>
              <p className={cn('text-[11px] font-medium mt-0.5 truncate', artistColor)}>
                {track.artist}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div
          className="flex items-center gap-1 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={goPrev}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform',
              isDarkMode ? 'text-white/70 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            )}
          >
            <SkipBack size={15} fill="currentColor" />
          </button>

          <button
            onClick={() => setIsPlaying((p) => !p)}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform',
              `bg-gradient-to-br ${track.gradient}`
            )}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.span key="pause" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}>
                  <Pause size={14} fill="white" className="text-white" />
                </motion.span>
              ) : (
                <motion.span key="play" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}>
                  <Play size={14} fill="white" className="text-white ml-0.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={goNext}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform',
              isDarkMode ? 'text-white/70 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            )}
          >
            <SkipForward size={15} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={cn('mx-4 mb-4 h-[3px] rounded-full overflow-hidden', trackBg)}>
        <motion.div
          className={cn('h-full rounded-full bg-gradient-to-r', track.gradient)}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0 }} // driven by state, no framer lag
        />
      </div>

      {/* Album label */}
      <div className="pb-3 px-4 flex items-center justify-between">
        <p className={cn('text-[9px] font-bold uppercase tracking-[0.15em]', artistColor)}>
          {track.album}
        </p>
        <div className="flex gap-[3px]">
          {tracks.map((_, i) => (
            <div
              key={i}
              className={cn(
                'rounded-full transition-all duration-300',
                i === trackIndex
                  ? cn('w-4 h-[3px]', `bg-gradient-to-r ${track.gradient}`)
                  : cn('w-[3px] h-[3px]', isDarkMode ? 'bg-white/25' : 'bg-black/20')
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
