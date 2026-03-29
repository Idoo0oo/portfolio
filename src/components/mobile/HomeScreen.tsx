import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useOSStore, type AppId } from '../../core/store/useOSStore';
import { cn } from '../../core/lib/utils';
import { FolderOpen, FileText, User, Cpu, Settings, Mail, MapPin } from 'lucide-react';
import NowPlayingWidget from './NowPlayingWidget';

interface HomeScreenProps {
  onOpenApp: (appId: AppId) => void;
}

const gridApps = [
  { id: 'terminal' as AppId, name: 'Terminal', icon: Cpu,      bg: 'bg-zinc-800',  shadow: 'shadow-zinc-800/30', badge: 0 },
  { id: 'settings' as AppId, name: 'Settings', icon: Settings, bg: 'bg-zinc-500',  shadow: 'shadow-zinc-500/30', badge: 0 },
];

const dockApps = [
  { id: 'about'      as AppId, name: 'Profile',  icon: User,       bg: 'bg-blue-500',    shadow: 'shadow-blue-500/30',    badge: 0 },
  { id: 'projects'   as AppId, name: 'Projects', icon: FolderOpen, bg: 'bg-amber-500',   shadow: 'shadow-amber-500/30',   badge: 6 },
  { id: 'experience' as AppId, name: 'Career',   icon: FileText,   bg: 'bg-emerald-600', shadow: 'shadow-emerald-600/30', badge: 3 },
  { id: 'contact'    as AppId, name: 'Mail',     icon: Mail,       bg: 'bg-sky-500',     shadow: 'shadow-sky-500/30',     badge: 1 },
];

export default function HomeScreen({ onOpenApp }: HomeScreenProps) {
  const { isDarkMode } = useOSStore();
  const [time, setTime] = useState(new Date());
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const rafId = useRef<number | null>(null);

  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (rafId.current) return; // throttle via RAF
    rafId.current = requestAnimationFrame(() => {
      const x = (e.gamma ?? 0) / 15;
      const y = (e.beta ?? 0) / 30 - 1;
      setParallax({ x, y });
      rafId.current = null;
    });
  }, []);

  const handleMouse = useCallback((e: MouseEvent) => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setParallax({ x: (e.clientX - cx) / cx * 4, y: (e.clientY - cy) / cy * 4 });
      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('deviceorientation', handleOrientation);
    // Skip mousemove on touch devices — it's dead weight on mobile
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (!isTouchDevice) window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('mousemove', handleMouse);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleOrientation, handleMouse]);

  const widgetBg = isDarkMode 
    ? 'bg-white/10 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl' 
    : 'bg-white/40 border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-2xl';

  return (
    <div className="w-full h-full flex flex-col px-6 pt-10 pb-6 relative overflow-hidden">

      {/* Ambient Glow */}
      <div className={cn(
        'absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-0',
        isDarkMode
          ? 'bg-gradient-to-t from-blue-950/60 via-purple-950/20 to-transparent'
          : 'bg-gradient-to-t from-amber-100/70 via-sky-100/20 to-transparent'
      )} />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-28 space-y-8 no-scrollbar relative z-10">

        {/* Widgets — with parallax */}
        <motion.div
          animate={{ x: parallax.x * -1.5, y: parallax.y * -1.5 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          initial={{ opacity: 0, y: 10 }}
          style={{}}
          className="grid grid-cols-2 gap-4"
        >
          {/* Clock Widget */}
          <div className={cn('p-5 rounded-[22px] border backdrop-blur-md shadow-sm aspect-square flex flex-col justify-between', widgetBg)}>
            <div>
              <p className={cn('text-xs font-bold uppercase tracking-widest', isDarkMode ? 'text-amber-500' : 'text-amber-600')}>
                {time.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <h2 className={cn('text-[42px] leading-none font-black tracking-tighter mt-1', isDarkMode ? 'text-white' : 'text-zinc-900')}>
                {time.getDate()}
              </h2>
            </div>
            <p className={cn('text-[22px] font-black tracking-tight', isDarkMode ? 'text-white' : 'text-zinc-900')}>
              {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })}
            </p>
          </div>

          {/* Location Widget */}
          <div className={cn('p-5 rounded-[22px] border backdrop-blur-md shadow-sm aspect-square flex flex-col justify-between', widgetBg)}>
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <MapPin size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className={cn('text-[14px] font-bold', isDarkMode ? 'text-white' : 'text-zinc-900')}>Tangerang</p>
              <p className={cn('text-[12px] font-medium mt-0.5', isDarkMode ? 'text-white/60' : 'text-zinc-500')}>Indonesia</p>
              <div className="flex items-center gap-1.5 mt-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-[#0a0a0a]" />
                <span className={cn('text-[10px] uppercase font-bold tracking-wider', isDarkMode ? 'text-emerald-400' : 'text-emerald-600')}>
                  Available
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Now Playing Widget */}
        <NowPlayingWidget onOpenApp={onOpenApp} />

        {/* Grid Apps */}
        <motion.div
          className="grid grid-cols-4 gap-x-2 gap-y-6"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {gridApps.map((app) => (
            <motion.button
              key={app.id}
              variants={{ hidden: { scale: 0.7, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => onOpenApp(app.id)}
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div className="relative">
                <div className={cn('w-14 h-14 rounded-[18px] flex items-center justify-center shadow-lg', app.bg, app.shadow)}>
                  <app.icon className="text-white w-7 h-7 drop-shadow" />
                </div>
                {app.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center px-1 shadow">
                    {app.badge}
                  </span>
                )}
              </div>
              <span className={cn('text-[10px] font-semibold text-center leading-tight', isDarkMode ? 'text-white/80' : 'text-white/90')}>
                {app.name}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Persistent Dock */}
      <div className="absolute bottom-6 left-6 right-6 z-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
          className={cn(
            'p-3 rounded-[28px] border backdrop-blur-2xl shadow-xl flex justify-between items-center',
            isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/40 border-black/10'
          )}
        >
          {dockApps.map((app, i) => (
            <motion.button
              key={app.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.3 + i * 0.06 }}
              onClick={() => onOpenApp(app.id)}
              className="relative group active:scale-90 transition-transform"
            >
              <div className={cn('w-14 h-14 rounded-[18px] flex items-center justify-center shadow-md', app.bg, app.shadow)}>
                <app.icon className="text-white w-7 h-7 drop-shadow" />
              </div>
              {app.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center px-1 shadow">
                  {app.badge}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
