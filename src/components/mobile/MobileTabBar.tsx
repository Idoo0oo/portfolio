import { motion } from 'framer-motion';
import { Home, Briefcase, FileText, User } from 'lucide-react';
import { useOSStore } from '../../core/store/useOSStore';
import { cn } from '../../core/lib/utils';

type TabId = 'home' | 'projects' | 'experience' | 'about';

interface MobileTabBarProps {
  activeTab: string;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  { id: 'home' as TabId, icon: Home, label: 'Home' },
  { id: 'projects' as TabId, icon: Briefcase, label: 'Projects' },
  { id: 'experience' as TabId, icon: FileText, label: 'Career' },
  { id: 'about' as TabId, icon: User, label: 'Profile' },
];

export default function MobileTabBar({ activeTab, onTabChange }: MobileTabBarProps) {
  const { isDarkMode } = useOSStore();

  return (
    <div className={cn(
      'w-full h-[68px] flex items-center justify-around px-2 border-t',
      isDarkMode
        ? 'bg-[#111111] border-white/[0.08]'
        : 'bg-[#ffffff] border-black/[0.08]',
      'shadow-[0_-1px_0_rgba(0,0,0,0.05)]'
    )}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-col items-center gap-[3px] py-2 px-4 group"
          >
            <div className={cn(
              'w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200',
              isActive
                ? isDarkMode ? 'bg-white/10' : 'bg-black/8'
                : 'bg-transparent'
            )}>
              <tab.icon
                size={20}
                className={cn(
                  'transition-colors duration-200',
                  isActive
                    ? isDarkMode ? 'text-white' : 'text-zinc-900'
                    : isDarkMode ? 'text-white/35' : 'text-zinc-400'
                )}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
            </div>
            <span className={cn(
              'text-[10px] font-semibold transition-colors duration-200',
              isActive
                ? isDarkMode ? 'text-white' : 'text-zinc-900'
                : isDarkMode ? 'text-white/30' : 'text-zinc-400'
            )}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className={cn(
                  'absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full',
                  isDarkMode ? 'bg-white' : 'bg-zinc-900'
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
