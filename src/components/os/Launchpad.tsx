import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  User, 
  Mail, 
  Settings, 
  History, 
  Folder 
} from "lucide-react";
import { useOSStore, type AppId } from "../../store/useOSStore";

const apps: { id: AppId; icon: any; label: string; color: string }[] = [
  { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'bg-zinc-800' },
  { id: 'about', icon: User, label: 'About Me', color: 'bg-blue-500' },
  { id: 'projects', icon: Folder, label: 'Projects', color: 'bg-amber-500' },
  { id: 'experience', icon: History, label: 'Experience', color: 'bg-emerald-500' },
  { id: 'contact', icon: Mail, label: 'Contact', color: 'bg-rose-500' },
  { id: 'settings', icon: Settings, label: 'Settings', color: 'bg-gray-500' },
];

export default function Launchpad() {
  const isLaunchpadOpen = useOSStore((state) => state.isLaunchpadOpen);
  const toggleLaunchpad = useOSStore((state) => state.toggleLaunchpad);
  const openApp = useOSStore((state) => state.openApp);

  return (
    <AnimatePresence>
      {isLaunchpadOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={toggleLaunchpad}
          className="fixed inset-0 z-[600] bg-black/20 backdrop-blur-2xl flex flex-col items-center pt-20 px-10 cursor-default"
        >
          {/* Search Bar Placeholder */}
          <div className="w-full max-w-md mb-20 relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-white/10 border border-white/20 rounded-md py-1.5 px-4 text-white placeholder-white/40 outline-none backdrop-blur-md text-sm text-center"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Apps Grid */}
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-x-12 gap-y-16 w-full max-w-6xl">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={(e) => {
                  e.stopPropagation();
                  openApp(app.id);
                }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${app.color} flex items-center justify-center shadow-2xl group-hover:brightness-110 transition-all duration-200 group-active:scale-95`}>
                  <app.icon size={36} className="text-white" />
                </div>
                <span className="mt-3 text-white text-sm font-medium drop-shadow-md text-shadow-sm select-none">
                  {app.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
