import { useState, useEffect, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore, type AppId } from '../../core/store/useOSStore';
import { cn } from '../../core/lib/utils';
import { X } from 'lucide-react';

import LockScreen from './LockScreen';
import HomeScreen from './HomeScreen';
import MobileAbout from './MobileAbout';
import MobileFinder from './MobileFinder';
import MobileNotes from './MobileNotes';
import MobileTerminal from './MobileTerminal';
import MobileContact from './MobileContact';
import MobileSpotlight from './MobileSpotlight';

// Memoized shell — only re-renders when activeApp or isDarkMode actually changes.
// This prevents all 6 pre-mounted overlays from re-rendering simultaneously.
const AppOverlay = memo(function AppOverlay({
  appId, isActive, isDarkMode, textColor, onClose, title, children
}: {
  appId: string;
  isActive: boolean;
  isDarkMode: boolean;
  textColor: string;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={appId}
      initial={{ y: '100%' }}
      animate={{ y: isActive ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      className={cn(
        'absolute inset-0 flex flex-col transition-colors duration-500',
        isActive ? 'pointer-events-auto z-[250]' : 'pointer-events-none z-[200]',
        isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'
      )}
    >
      {/* Overlay header */}
      <div className={cn(
        'flex items-center justify-between px-6 pt-14 pb-3 shrink-0 transition-colors duration-500',
        isDarkMode ? 'border-b border-white/8' : 'border-b border-black/8'
      )}>
        <h2 className={cn('text-[15px] font-black transition-colors duration-500', textColor)}>
          {title}
        </h2>
        <button
          onClick={onClose}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all duration-300',
            isDarkMode ? 'bg-white/10 text-white/60 hover:text-white' : 'bg-black/8 text-zinc-600 hover:text-black'
          )}
        >
          <X size={16} />
        </button>
      </div>

      {/* Overlay content */}
      <div className="flex-1 overflow-hidden relative w-full h-full">
        {children}
      </div>

      {/* Home indicator */}
      <button
        onClick={onClose}
        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-[30px] flex items-end justify-center pb-[2px] z-[300]"
        aria-label="Home"
      >
        <div className={cn('w-full h-[5px] rounded-full transition-colors duration-500', isDarkMode ? 'bg-white/20' : 'bg-black/15')} />
      </button>
    </motion.div>
  );
});

export default function MobileOS() {
  const [isLocked, setIsLocked] = useState(true);
  const { isDarkMode, openApp, toggleDarkMode, accentColor, setAccentColor } = useOSStore();
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  const wallpaper = "/wallpapers/wallpaper_mobile.webp";

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => setIsLocked(false);

  const handleOpenApp = (appId: AppId) => {
    openApp(appId);
    setActiveApp(appId);
  };

  const handleCloseApp = () => {
    setActiveApp(null);
  };

  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  const textColor = isDarkMode ? 'text-white' : 'text-zinc-900';

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'projects': return <MobileFinder />;
      case 'experience': return <MobileNotes />;
      case 'about': return <MobileAbout />;
      case 'terminal': return <MobileTerminal onClose={handleCloseApp} />;
      case 'contact': return <MobileContact />;
      case 'settings': {
        const ACCENT_COLORS = [
          { name: 'Emerald', value: '#10b981' },
          { name: 'Blue',    value: '#3b82f6' },
          { name: 'Pink',    value: '#ec4899' },
          { name: 'Amber',   value: '#f59e0b' },
          { name: 'Red',     value: '#ef4444' },
          { name: 'Violet',  value: '#8b5cf6' },
        ];
        const row = cn('p-4 rounded-[18px] border flex items-center justify-between transition-colors duration-700', isDarkMode ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10');
        const label = cn('text-[15px] font-bold transition-colors duration-700', textColor);
        const toggleEl = (on: boolean, click: () => void) => (
          <button onClick={click} className={cn('w-12 h-7 rounded-full transition-colors duration-700 relative', on ? 'bg-emerald-500' : 'bg-black/20')}>
            <div className={cn('absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-500 shadow-sm', on ? 'translate-x-6' : 'translate-x-1')} />
          </button>
        );
        return (
          <div className="p-6 space-y-3">
            {/* Dark Mode */}
            <div className={row}>
              <span className={label}>Dark Mode</span>
              {toggleEl(isDarkMode, toggleDarkMode)}
            </div>
            {/* Accent Color Picker */}
            <div className={cn('p-4 rounded-[18px] border transition-colors duration-700 space-y-3', isDarkMode ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10')}>
              <span className={label}>Accent Color</span>
              <div className="flex gap-3 flex-wrap">
                {ACCENT_COLORS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => setAccentColor(c.value)}
                    title={c.name}
                    className="w-8 h-8 rounded-full transition-transform active:scale-90 ring-offset-2 ring-offset-transparent"
                    style={{ backgroundColor: c.value, outline: accentColor === c.value ? `3px solid ${c.value}` : 'none', outlineOffset: '3px' }}
                  />
                ))}
              </div>
            </div>
            <p className={cn('text-xs px-2 transition-colors duration-700', isDarkMode ? 'text-white/40' : 'text-zinc-400')}>
              Accent color customises highlights throughout the UI.
            </p>
          </div>
        );
      }
      default: return null;
    }
  };

  const getAppTitle = (id: AppId) => {
    switch (id) {
      case 'projects': return '📂  Projects';
      case 'experience': return '📝  Career';
      case 'about': return '👤  Profile';
      case 'terminal': return '⌨️  Terminal';
      case 'contact': return '✉️  Contact';
      case 'settings': return '⚙️  Settings';
      default: return '';
    }
  };

  return (
    <div className={cn('fixed inset-0 w-full h-full overflow-hidden select-none bg-black')}>

      {/* ─── GLOBAL SCALING CONTAINER ─── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        animate={{ 
          scale: activeApp ? 0.93 : 1,
          opacity: activeApp ? 0.4 : 1,
          borderRadius: activeApp ? '32px' : '0px'
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      >
        {/* Global Wallpaper — static, no filter transition (filter causes full repaint) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${wallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center',
          }}
        />
        {/* Dark overlay — opacity transition is GPU-composited, zero repaint cost */}
        <div
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-700"
          style={{ opacity: isDarkMode ? 0.6 : 0 }}
        />

        {/* ─── Status Bar ─── */}
        <div className={cn(
          'absolute top-0 left-0 right-0 h-12 z-[100] pointer-events-none transition-colors duration-500',
          'flex items-center justify-between px-6',
          'text-white drop-shadow-md'
        )}>
          {isLocked
            ? <div />
            : <span className="text-[13px] font-black tabular-nums">{timeStr}</span>
          }
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-[2px] h-[12px]">
              {[4, 6, 8, 10].map((h, i) => (
                <div key={i} className={cn('w-[3px] rounded-[1px] bg-current', i >= 3 && 'opacity-30')} style={{ height: h }} />
              ))}
            </div>
            <div className="w-[22px] h-[11px] rounded-[3px] border border-current relative flex items-center px-[2px]">
              <div className="h-[5px] w-[75%] rounded-[1px] bg-current" />
              <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[5px] bg-current rounded-r-sm" />
            </div>
          </div>
        </div>

        {/* ─── Main Content (Home Screen & Lock Screen) ─── */}
        <AnimatePresence mode="wait">
          {isLocked ? (
            <motion.div
              key="lock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(16px)' }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-10"
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[20px] -z-10" />
              <LockScreen onUnlock={handleUnlock} />
            </motion.div>
          ) : (
            <motion.div
              key="os"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col pt-12 z-10"
            >
              <motion.div
                className="flex-1 relative overflow-hidden"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 60) setSpotlightOpen(true);
                }}
              >
                <HomeScreen onOpenApp={handleOpenApp} />
              </motion.div>

              {/* Home indicator (Swipe / click up metaphor) */}
              <button 
                onClick={handleCloseApp}
                className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-[30px] flex items-end justify-center pb-[2px] z-[300]"
                aria-label="Home"
              >
                <div className={cn('w-full h-[5px] rounded-full bg-white/40 drop-shadow-sm')} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ─── Pre-mounted App Overlays ─── */}
      {['projects', 'experience', 'about', 'terminal', 'contact', 'settings'].map((appId) => (
        <AppOverlay
          key={appId}
          appId={appId}
          isActive={activeApp === appId}
          isDarkMode={isDarkMode}
          textColor={textColor}
          onClose={handleCloseApp}
          title={getAppTitle(appId as AppId)}
        >
          {renderAppContent(appId as AppId)}
        </AppOverlay>
      ))}
      {/* ─── Spotlight ─── */}
      <AnimatePresence>
        {spotlightOpen && (
          <MobileSpotlight onClose={() => setSpotlightOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
