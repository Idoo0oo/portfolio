import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore } from '../../core/store/useOSStore';
import { cn } from '../../core/lib/utils';
import BottomTabBar, { type MobileTab } from './BottomTabBar';

// Tab Views
import MobileHome from './MobileHome';
import MobileProjects from './MobileProjects';
import MobileProfile from './MobileProfile';
import MobileMessages from './MobileMessages';

// Tab transition settings
const viewVariants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export default function MobileOS() {
  const { isDarkMode } = useOSStore();
  const [activeTab, setActiveTab] = useState<MobileTab>('home');

  return (
    <div className={cn(
      'fixed inset-0 w-full h-full overflow-hidden select-none transition-colors duration-700',
      isDarkMode ? 'bg-[#000000]' : 'bg-[#f8f9fa]'
    )}>

      {/* Subtle Noise Texture overlay (Performance friendly) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Main Content Area */}
      <motion.div
        key="os"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-10 flex flex-col pt-safe-top pb-safe-bottom"
      >
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0"
            >
              {activeTab === 'home' && <MobileHome onNavigate={setActiveTab} />}
              {activeTab === 'projects' && <MobileProjects />}
              {activeTab === 'profile' && <MobileProfile />}
              {activeTab === 'messages' && <MobileMessages />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Bar */}
        <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
      </motion.div>
    </div>
  );
}
