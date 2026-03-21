import { useState } from "react";
import { motion, type Transition } from "framer-motion";
import { 
  Terminal, 
  User, 
  Mail, 
  Settings, 
  History, 
  Folder,
  LayoutGrid,
  Search,
  FileText
} from "lucide-react";
import { useOSStore, type AppId } from "../../core/store/useOSStore";
import { Dock as MagicDock, DockIcon as MagicDockIcon } from "../magicui/dock";
import { cn } from "../../core/lib/utils";
import { useSound } from "../../core/hooks/useSound";

type IconType = React.ComponentType<{ size?: number; className?: string }>;
const apps: { id: AppId; icon: IconType; label: string; color: string }[] = [
  { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'bg-zinc-800' },
  { id: 'about', icon: User, label: 'About Me', color: 'bg-blue-500' },
  { id: 'projects', icon: Folder, label: 'Projects', color: 'bg-amber-500' },
  { id: 'experience', icon: History, label: 'Experience', color: 'bg-emerald-500' },
  { id: 'contact', icon: Mail, label: 'Contact', color: 'bg-rose-500' },
  { id: 'preview', icon: FileText, label: 'Resume', color: 'bg-emerald-400' },
  { id: 'settings', icon: Settings, label: 'Settings', color: 'bg-gray-500' },
];

const bounceAnimate = { y: [0, -18, -8, -14, -4, -10, 0] };
const bounceTransition: Transition = { duration: 0.6, ease: "easeOut" };

export default function MacOSDock() {
  const openApp = useOSStore((state) => state.openApp);
  const openApps = useOSStore((state) => state.openApps);
  const maximizedApps = useOSStore((state) => state.maximizedApps);
  const toggleDashboard = useOSStore((state) => state.toggleDashboard);
  const toggleSpotlight = useOSStore((state) => state.toggleSpotlight);
  const { playSound } = useSound();
  const [bouncingApp, setBouncingApp] = useState<string | null>(null);
  const isDarkMode = useOSStore(state => state.isDarkMode);

  const isAnyAppMaximized = maximizedApps.length > 0;

  const handleClick = (id: AppId | 'dashboard' | 'spotlight') => {
    setBouncingApp(id);
    playSound('click', 0.5);
    setTimeout(() => setBouncingApp(null), 700);
    if (id === 'dashboard') toggleDashboard();
    else if (id === 'spotlight') toggleSpotlight();
    else openApp(id);
  };

  const tooltip = (label: string) => (
    <div className={cn(
      "absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 backdrop-blur-md rounded-lg text-[11px] font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-xl z-50",
      isDarkMode 
        ? "bg-black/80 text-white border border-white/10" 
        : "bg-white/80 text-black border border-black/10"
    )}>
      {label}
      <div className={cn(
        "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45",
        isDarkMode ? "bg-black/80" : "bg-white/80"
      )} />
    </div>
  );

  return (
    <div className={cn(
      "fixed bottom-4 left-1/2 -translate-x-1/2 z-[500] pointer-events-none transition-all duration-500 ease-in-out",
      isAnyAppMaximized ? "translate-y-32 opacity-0" : "translate-y-0 opacity-100"
    )}>
      <MagicDock 
        className="pointer-events-auto gap-3 h-16"
        iconSize={40}
        iconMagnification={70}
        iconDistance={140}
      >
        {/* Dashboard */}
        <MagicDockIcon className="relative group">
          <motion.div
            onClick={() => handleClick('dashboard')}
            onMouseEnter={() => playSound('hover', 0.2)}
            animate={bouncingApp === 'dashboard' ? bounceAnimate : {}}
            transition={bouncingApp === 'dashboard' ? bounceTransition : undefined}
            className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center cursor-pointer shadow-lg hover:brightness-110 transition-all duration-200"
          >
            <LayoutGrid size={24} className="text-white" />
            {tooltip('Dashboard')}
          </motion.div>
        </MagicDockIcon>

        {/* Spotlight */}
        <MagicDockIcon className="relative group">
          <motion.div
            onClick={() => handleClick('spotlight')}
            onMouseEnter={() => playSound('hover', 0.2)}
            animate={bouncingApp === 'spotlight' ? bounceAnimate : {}}
            transition={bouncingApp === 'spotlight' ? bounceTransition : undefined}
            className="w-full h-full rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center cursor-pointer shadow-lg hover:brightness-110 transition-all duration-200"
          >
            <Search size={24} className="text-white" />
            {tooltip('Spotlight')}
          </motion.div>
        </MagicDockIcon>

        {/* Separator */}
        <div className={cn(
          "w-[1px] h-10 mx-1 self-center transition-colors",
          isDarkMode ? "bg-white/20" : "bg-white/20"
        )} />

        {/* App Icons */}
        {apps.map((app) => {
          const isOpen = openApps.includes(app.id);
          return (
            <MagicDockIcon key={app.id} className="relative group">
              <motion.div
                onClick={() => handleClick(app.id)}
                onMouseEnter={() => playSound('hover', 0.2)}
                animate={bouncingApp === app.id ? bounceAnimate : {}}
                transition={bouncingApp === app.id ? bounceTransition : undefined}
                className={`w-full h-full rounded-xl ${app.color} flex items-center justify-center cursor-pointer shadow-lg hover:brightness-110 transition-all duration-200 relative`}
              >
                <app.icon size={24} className="text-white" />
                {tooltip(app.label)}
              </motion.div>

              {/* Open Indicator Dot */}
              {isOpen && (
                <div className={cn(
                  "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300",
                  isDarkMode ? "bg-white/90 shadow-[0_0_8px_white]" : "bg-black/60 shadow-[0_0_4px_black/20]"
                )} />
              )}
            </MagicDockIcon>
          );
        })}
      </MagicDock>
    </div>
  );
}
