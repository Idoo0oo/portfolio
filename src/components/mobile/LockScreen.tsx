import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../core/lib/utils';
import { Lock, ChevronUp, FolderOpen, Briefcase, MapPin } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

const notifications = [
  { icon: FolderOpen, color: 'bg-amber-500', label: 'Portfolio', msg: '6 new projects available', time: 'now' },
  { icon: Briefcase, color: 'bg-blue-500',   label: 'Career',    msg: 'Open for full-time & freelance', time: '2m ago' },
  { icon: MapPin,    color: 'bg-emerald-500', label: 'Status',    msg: '📍 Available · Tangerang, ID', time: '5m ago' },
];

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-16 overflow-hidden">
      {/* Top Section: Time & Date */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2"
      >
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/60">
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="text-8xl font-black tracking-tighter text-white">
          {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })}
        </h1>
      </motion.div>

      {/* Notification Bubbles */}
      <div className="w-full px-6 space-y-2.5 pointer-events-none">
        {notifications.map((notif, i) => (
          <motion.div
            key={notif.label}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 300, damping: 24 }}
            className="flex items-center gap-3 px-4 py-3 rounded-[18px] backdrop-blur-2xl bg-white/10 border border-white/15 shadow-lg"
          >
            <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm', notif.color)}>
              <notif.icon size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-black text-white/60 uppercase tracking-wider">{notif.label}</p>
                <p className="text-[10px] text-white/40 font-semibold">{notif.time}</p>
              </div>
              <p className="text-[13px] font-semibold text-white/90 truncate mt-0.5">{notif.msg}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Section: Swipe to Unlock */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center gap-3 mt-12"
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.4}
          onDragEnd={(_, info) => {
            if (info.offset.y < -120) onUnlock();
          }}
          className={cn(
            "group relative w-16 h-16 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing",
            "bg-white/10 border border-white/20 backdrop-blur-xl"
          )}
        >
          <Lock className="text-white w-5 h-5" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white rounded-full -z-10 pointer-events-none"
          />
        </motion.div>

        <div className="flex flex-col items-center -space-y-4 opacity-50 mt-2 pointer-events-none">
          <motion.div animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>
            <ChevronUp className="w-5 h-5 text-white" />
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>
            <ChevronUp className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 animate-pulse mt-2">
          Swipe up to unlock
        </p>
      </motion.div>

      <div className="absolute bottom-2 w-32 h-1 bg-white/20 rounded-full" />
    </div>
  );
}
