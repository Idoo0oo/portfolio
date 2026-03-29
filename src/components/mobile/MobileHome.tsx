import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useOSStore } from '../../core/store/useOSStore';
import { cn } from '../../core/lib/utils';
import { MapPin, Code2, ArrowRight, Sparkles, Music } from 'lucide-react';
import { projects } from '../../core/lib/data';

interface MobileHomeProps {
  onNavigate: (tab: 'home' | 'projects' | 'profile' | 'messages') => void;
}

const SONGS = [
  { title: "fianeruuu", artist: "funeruuu", cover: "/fianeruuu.png" },
  { title: "Lalu Biru", artist: "Eleanor Whisper", cover: "/lalubiru.jfif" },
  { title: "Gemilang", artist: "Perunggu", cover: "/gemilang.jfif" }
];

export default function MobileHome({ onNavigate }: MobileHomeProps) {
  const { isDarkMode } = useOSStore();
  const topProjects = projects.filter(p => p.isStarred).slice(0, 2);
  const randomSong = useMemo(() => SONGS[Math.floor(Math.random() * SONGS.length)], []);

  const bg = cn(
    'transition-all duration-500 backdrop-blur-2xl',
    isDarkMode 
      ? 'bg-white/10 border-white/20 shadow-xl' 
      : 'bg-white/70 border-white/60 shadow-md'
  );

  const textPrimary = cn('transition-colors duration-500', isDarkMode ? 'text-white' : 'text-zinc-900');
  const textSecondary = cn('transition-colors duration-500', isDarkMode ? 'text-white/60' : 'text-zinc-600');

  return (
    <div className="w-full h-full flex flex-col px-6 pt-16 pb-32 relative overflow-hidden overflow-y-auto no-scrollbar">
      
      {/* Header Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-6 mt-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <h1 className={cn('text-3xl font-black tracking-tight leading-none', textPrimary)}>
            Hi, I'm Ditto
          </h1>
          <Sparkles size={24} className="text-amber-500" />
        </div>
        <p className={cn('text-[15px] font-medium leading-relaxed', textSecondary)}>
          Full-Stack Developer crafting cinematic & robust web experiences.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Status Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={cn('p-5 rounded-[24px] border col-span-1 flex flex-col justify-between aspect-square', bg)}
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <MapPin size={20} className="text-emerald-500" />
          </div>
          <div>
            <p className={cn('text-[15px] font-bold', textPrimary)}>Tangerang</p>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-[#0a0a0a]" />
              <span className={cn('text-[10px] uppercase font-bold tracking-wider', isDarkMode ? 'text-emerald-400' : 'text-emerald-600')}>
                Available
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stack Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          onClick={() => onNavigate('profile')}
          className={cn('p-5 rounded-[24px] border col-span-1 flex flex-col justify-between aspect-square active:scale-95 transition-transform', bg)}
        >
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Code2 size={20} className="text-blue-500" />
          </div>
          <div>
            <p className={cn('text-[15px] font-bold line-clamp-1', textPrimary)}>Tech Stack</p>
            <p className={cn('text-[12px] font-medium line-clamp-1 mt-0.5', textSecondary)}>React, Node, TS</p>
          </div>
        </motion.div>

        {/* Now Playing Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: 'spring' }}
          className={cn('p-4 rounded-[24px] border col-span-2 flex items-center gap-4', bg)}
        >
          {/* Spinning Cover */}
          <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border border-white/10 shadow-sm">
            <motion.img 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              src={randomSong.cover} 
              alt={randomSong.title} 
              className="w-full h-full object-cover" 
            />
            {/* Vinyl inner circle hole */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5' }} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Music size={11} className={cn(isDarkMode ? 'text-blue-400' : 'text-blue-600')} />
              <span className={cn('text-[9px] font-extrabold uppercase tracking-widest', isDarkMode ? 'text-blue-400' : 'text-blue-600')}>
                Now Playing
              </span>
            </div>
            <h3 className={cn('text-[14px] font-black truncate leading-tight', textPrimary)}>
              {randomSong.title}
            </h3>
            <p className={cn('text-[11px] font-semibold truncate', textSecondary)}>
              {randomSong.artist}
            </p>
          </div>

          {/* Audio Visualizer */}
          <div className="flex items-end gap-[3px] h-6 shrink-0 py-1 px-2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ['30%', '100%', '40%', '80%', '30%'] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.8 + (i * 0.1), 
                  ease: "easeInOut",
                  delay: i * 0.15 
                }}
                className={cn('w-1 rounded-full', isDarkMode ? 'bg-blue-400' : 'bg-blue-600')}
                style={{ transformOrigin: 'bottom' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Featured Projects Header */}
        <div className="col-span-2 flex items-center justify-between mt-4 mb-2">
          <h2 className={cn('text-[18px] font-black', textPrimary)}>Featured Work</h2>
          <button 
            onClick={() => onNavigate('projects')}
            className={cn('text-[12px] font-bold flex items-center gap-1 active:opacity-70', isDarkMode ? 'text-blue-400' : 'text-blue-600')}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        {/* Featured Projects Cards */}
        {topProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (idx * 0.1), duration: 0.4 }}
            onClick={() => onNavigate('projects')}
            className={cn('col-span-2 p-3 rounded-[24px] border flex gap-4 active:scale-[0.98] transition-all', bg)}
          >
            <div className="w-24 h-24 rounded-[16px] overflow-hidden shrink-0 relative group">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0 pr-2">
              <span className={cn('text-[10px] font-extrabold uppercase tracking-widest text-blue-500 mb-1')}>
                {project.category}
              </span>
              <h3 className={cn('text-[16px] font-black truncate', textPrimary)}>
                {project.title}
              </h3>
              <p className={cn('text-[13px] line-clamp-2 mt-1 leading-snug', textSecondary)}>
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}
