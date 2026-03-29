import { motion } from 'framer-motion';
import { Home, User, FolderOpen, MessageSquare, Moon, Sun } from 'lucide-react';
import { cn, triggerHaptic } from '../../core/lib/utils';
import { useOSStore } from '../../core/store/useOSStore';

export type MobileTab = 'home' | 'projects' | 'profile' | 'messages';

interface BottomTabBarProps {
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
}

const TABS = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'projects', icon: FolderOpen, label: 'Projects' },
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'messages', icon: MessageSquare, label: 'Message' },
] as const;

export default function BottomTabBar({ activeTab, onChangeTab }: BottomTabBarProps) {
  const { isDarkMode, toggleDarkMode } = useOSStore();

  return (
    <div className="absolute bottom-6 left-6 right-6 z-50">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.1 }}
        className={cn(
          'p-2.5 rounded-full backdrop-blur-2xl shadow-xl flex justify-between items-center transition-all duration-500 border',
          isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-black/10'
        )}
      >
        <div className="flex flex-1 justify-between">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  triggerHaptic();
                  onChangeTab(tab.id as MobileTab);
                }}
                className="relative flex-1 flex flex-col items-center justify-center p-2 rounded-full transition-transform active:scale-95"
              >
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <tab.icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={cn(
                      'transition-colors duration-300',
                      isActive 
                        ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                        : (isDarkMode ? 'text-white/50' : 'text-zinc-500')
                    )}
                  />
                  <span className={cn(
                    'text-[10px] font-medium transition-colors duration-300',
                    isActive
                      ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                      : (isDarkMode ? 'text-white/50' : 'text-zinc-500')
                  )}>
                    {tab.label}
                  </span>
                </div>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className={cn(
                      'absolute inset-0 rounded-full',
                      isDarkMode ? 'bg-white/10' : 'bg-black/5'
                    )}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className={cn(
          "w-px h-8 mx-1 opacity-20", 
          isDarkMode ? "bg-white" : "bg-black"
        )} />

        {/* Theme Toggle */}
        <button
          onClick={() => {
            triggerHaptic();
            toggleDarkMode();
          }}
          className="relative flex flex-col items-center justify-center p-2 px-3 rounded-full transition-transform active:scale-95"
        >
          <div className="relative z-10 flex flex-col items-center gap-1">
            {isDarkMode ? (
              <Sun size={20} strokeWidth={2} className="text-white/80" />
            ) : (
              <Moon size={20} strokeWidth={2} className="text-zinc-600" />
            )}
            <span className={cn(
              'text-[10px] font-medium transition-colors duration-300',
              isDarkMode ? 'text-white/50' : 'text-zinc-500'
            )}>
              Theme
            </span>
          </div>
        </button>
      </motion.div>
    </div>
  );
}
