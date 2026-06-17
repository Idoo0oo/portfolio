import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useOSStore } from '../../core/store/useOSStore';
import { cn, triggerHaptic } from '../../core/lib/utils';
import { Rocket, Sparkles, Code2 } from 'lucide-react';

interface MobileNotificationProps {
  onNavigate?: (tab: 'home' | 'projects' | 'profile' | 'messages') => void;
}

const NOTIFICATIONS = [
  {
    icon: Rocket,
    iconBg: 'bg-blue-500',
    title: 'New Project!',
    subtitle: 'Check out my latest work in the Projects tab 🚀',
    targetTab: 'projects' as const,
  },
  {
    icon: Sparkles,
    iconBg: 'bg-amber-500',
    title: 'Welcome!',
    subtitle: "Hi! I'm Ditto — a Full-Stack Developer. Explore my portfolio ✨",
    targetTab: 'home' as const,
  },
  {
    icon: Code2,
    iconBg: 'bg-emerald-500',
    title: 'Open for Work',
    subtitle: "Available for freelance & full-time. Let's connect! 💬",
    targetTab: 'messages' as const,
  },
];

export default function MobileNotification({ onNavigate }: MobileNotificationProps) {
  const { isDarkMode } = useOSStore();
  const [isVisible, setIsVisible] = useState(false);
  const dragY = useMotionValue(0);

  const [notification] = useState(() => NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)]);

  useEffect(() => {
    // Only show once per session
    const hasShown = sessionStorage.getItem('portfolio_notification_shown');
    if (hasShown) return;

    const showTimer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem('portfolio_notification_shown', 'true');
    }, 2000);

    return () => clearTimeout(showTimer);
  }, []);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleDismiss = () => {
    triggerHaptic();
    setIsVisible(false);
  };

  const handleTap = () => {
    triggerHaptic();
    setIsVisible(false);
    onNavigate?.(notification.targetTab);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -120, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -120, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          drag="y"
          dragConstraints={{ top: -100, bottom: 0 }}
          dragElastic={0.2}
          style={{ y: dragY }}
          onDragEnd={(_, info) => {
            if (info.offset.y < -40) handleDismiss();
          }}
          onClick={handleTap}
          className={cn(
            'fixed top-[55px] left-4 right-4 z-[95] rounded-[22px] p-3.5 shadow-2xl border cursor-pointer',
            'backdrop-blur-2xl transition-colors duration-500',
            isDarkMode
              ? 'bg-[#1c1c1e]/90 border-white/15 shadow-black/50'
              : 'bg-white/90 border-black/8 shadow-black/10'
          )}
        >
          <div className="flex items-start gap-3">
            {/* App Icon */}
            <div
              className={cn(
                'w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 shadow-md',
                notification.iconBg
              )}
            >
              <notification.icon size={20} className="text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4
                  className={cn(
                    'text-[13px] font-bold truncate',
                    isDarkMode ? 'text-white' : 'text-zinc-900'
                  )}
                >
                  {notification.title}
                </h4>
                <span
                  className={cn(
                    'text-[10px] font-medium shrink-0 ml-2',
                    isDarkMode ? 'text-white/40' : 'text-zinc-400'
                  )}
                >
                  now
                </span>
              </div>
              <p
                className={cn(
                  'text-[12px] font-medium mt-0.5 leading-snug',
                  isDarkMode ? 'text-white/60' : 'text-zinc-600'
                )}
              >
                {notification.subtitle}
              </p>
            </div>
          </div>

          {/* Subtle grab indicator at bottom */}
          <div className="flex justify-center mt-2">
            <div
              className={cn(
                'w-8 h-1 rounded-full',
                isDarkMode ? 'bg-white/10' : 'bg-black/10'
              )}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
