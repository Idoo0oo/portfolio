import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  User, 
  Mail, 
  Settings, 
  History, 
  Folder,
  Activity,
  Github,
} from "lucide-react";
import { useOSStore, type AppId } from "../../store/useOSStore";
import { useGitHubStats } from "../../hooks/useGitHubStats";
import { cn } from "../../lib/utils";

type IconType = React.ComponentType<{ size?: number; className?: string }>;
const apps: { id: AppId; icon: IconType; label: string; color: string }[] = [
  { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'bg-zinc-800' },
  { id: 'about', icon: User, label: 'About Me', color: 'bg-blue-500' },
  { id: 'projects', icon: Folder, label: 'Projects', color: 'bg-amber-500' },
  { id: 'experience', icon: History, label: 'Experience', color: 'bg-emerald-500' },
  { id: 'contact', icon: Mail, label: 'Contact', color: 'bg-rose-500' },
  { id: 'settings', icon: Settings, label: 'Settings', color: 'bg-gray-500' },
];

export default function Dashboard() {
  const isDashboardOpen = useOSStore((state) => state.isDashboardOpen);
  const toggleDashboard = useOSStore((state) => state.toggleDashboard);
  const openApp = useOSStore((state) => state.openApp);
  const [time, setTime] = useState(new Date());
  
  // LIVE GITHUB DATA
  const { repos, stars, commits, calendar, error } = useGitHubStats('Idoo0oo');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getRecentContributions = () => {
    if (!calendar) return null;
    // Get last 6 weeks
    return calendar.weeks.slice(-6);
  };

  const recentWeeks = getRecentContributions();

  return (
    <AnimatePresence>
      {isDashboardOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)", scale: 1.05 }}
          animate={{ opacity: 1, backdropFilter: "blur(40px)", scale: 1 }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)", scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={toggleDashboard}
          className="fixed inset-0 z-[600] bg-black/40 flex flex-col items-center justify-between py-16 px-10 cursor-default overflow-hidden"
        >
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" onClick={e => e.stopPropagation()}>
          
          {/* TIME WIDGET (2x1) */}
          <div className="lg:col-span-2 p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col justify-between hover:bg-white/[0.05] transition-all group overflow-hidden relative min-h-[160px]">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity" />
             <div className="space-y-1">
                <p className="text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-[0.4em] opacity-80">System Time</p>
                <h3 className="text-xs font-medium text-white/40">{time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
             </div>
             <h2 className="text-7xl font-black text-white leading-none tracking-tighter mt-4">
                {time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })}
             </h2>
          </div>

          {/* PROFILE CARD (1x1) */}
          <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col items-center justify-center text-center gap-3 hover:bg-white/[0.05] transition-all group min-h-[160px]">
             <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 p-0.5 border border-white/10 group-hover:scale-105 transition-transform duration-500">
                   <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                      <User size={32} className="text-white/20" />
                   </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-black flex items-center justify-center" />
             </div>
             <div className="space-y-0.5">
                <h4 className="text-base font-black text-white">Muhammad Ditto</h4>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Full-Stack Developer</p>
             </div>
             <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 text-[8px] font-bold text-[var(--color-accent)] uppercase tracking-wider">
                available for your project
             </div>
          </div>

          {/* SYSTEM STATS (1x1) */}
          <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col justify-between hover:bg-white/[0.05] transition-all group min-h-[160px]">
             <div className="flex justify-between items-start">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                   <Activity size={16} />
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Uptime</p>
                   <p className="text-xs font-bold text-white">7d 12h</p>
                </div>
             </div>
             <div className="space-y-2 mt-4">
                <div className="space-y-1">
                   <div className="flex justify-between text-[9px] font-bold">
                      <span className="text-white/40 uppercase">CPU</span>
                      <span className="text-white">12%</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "12%" }} className="h-full bg-blue-500" />
                   </div>
                </div>
                <div className="space-y-1">
                   <div className="flex justify-between text-[9px] font-bold">
                      <span className="text-white/40 uppercase">RAM</span>
                      <span className="text-white">8.4 GB</span>
                   </div>
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "26%" }} className="h-full bg-emerald-500" />
                   </div>
                </div>
             </div>
          </div>

          {/* GITHUB STATS (2x1) */}
          <div 
             onClick={() => window.open('https://github.com/Idoo0oo', '_blank')}
             className="lg:col-span-2 p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col justify-between hover:bg-white/[0.05] transition-all group overflow-hidden relative min-h-[140px] cursor-pointer"
          >
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center text-white">
                      <Github size={20} />
                   </div>
                   <div>
                      <h4 className="text-xs font-bold text-white">GitHub Activity</h4>
                      <p className="text-[9px] text-white/30 truncate">github.com/Idoo0oo</p>
                   </div>
                </div>
                
                {/* LIVE CONTRIBUTION GRID */}
                <div className="flex gap-1.5 h-10 items-end">
                   {recentWeeks ? (
                     recentWeeks.map((week, i) => (
                       <div key={i} className="flex flex-col gap-1">
                          {week.contributionDays.slice(0, 4).map((day, j) => (
                             <motion.div 
                               key={j} 
                               initial={{ scale: 0 }}
                               animate={{ scale: 1 }}
                               transition={{ delay: (i * 4 + j) * 0.01 }}
                               className="w-1.5 h-1.5 rounded-sm" 
                               style={{ backgroundColor: day.contributionCount > 0 ? day.color : 'rgba(255,255,255,0.05)' }}
                             />
                          ))}
                       </div>
                     ))
                   ) : (
                     // Mockup fallback
                     [1,2,3,4,5,6].map(i => (
                       <div key={i} className="flex flex-col gap-1">
                          {[1,2,3,4].map(j => (
                             <div key={j} className={cn("w-1.5 h-1.5 rounded-sm", Math.random() > 0.5 ? "bg-emerald-500/60" : "bg-white/5")} />
                          ))}
                       </div>
                     ))
                   )}
                </div>
             </div>
             
             <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div>
                   <p className="text-base font-black text-white">{repos || 21}</p>
                   <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Repos</p>
                </div>
                <div>
                   <p className="text-base font-black text-white">{stars > 0 ? stars : '12'}</p>
                   <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Stars</p>
                </div>
                <div>
                   <p className="text-base font-black text-white">{commits || 160}</p>
                   <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Commits</p>
                </div>
             </div>
             
             {error && !calendar && (
                <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-[8px] font-bold text-red-400 uppercase tracking-widest">Token Required for Live Stats</p>
                </div>
             )}
          </div>

          {/* MUSIC WIDGET (2x1) */}
          <div 
             onClick={() => window.open('https://open.spotify.com/', '_blank')}
             className="lg:col-span-2 p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex items-center gap-6 hover:bg-white/[0.05] transition-all group cursor-pointer overflow-hidden relative min-h-[140px]"
          >
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             
             {/* Album Art */}
             <div className="relative w-24 h-24 flex-shrink-0 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img 
                   src="/cover-music.jpg" 
                   alt="Album Art" 
                   className="w-full h-full object-cover rounded-xl" 
                />
                <div className="absolute inset-0 bg-black/20 rounded-xl" />
             </div>

             {/* Player Info */}
             <div className="flex-1 min-w-0 space-y-3 z-10">
                <div>
                   <h4 className="text-base font-black text-white truncate group-hover:text-[var(--color-accent)] transition-colors">Lalu Biru</h4>
                   <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Eleanor Whisper</p>
                </div>
                
                {/* Simulated Progress */}
                <div className="space-y-1.5">
                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                         initial={{ x: "-100%" }}
                         animate={{ x: "-30%" }}
                         transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                         className="h-full bg-gradient-to-r from-purple-500 to-blue-500" 
                      />
                   </div>
                   <div className="flex justify-between items-center px-0.5">
                      <span className="text-[8px] font-bold text-white/20">1:24</span>
                      <div className="flex items-center gap-4 text-white/40 group-hover:text-white/80 transition-colors">
                         <div className="hover:scale-110 transition-transform"><Activity size={12} className="rotate-90 opacity-20" /></div>
                         <div className="hover:scale-110 transition-transform cursor-pointer"><Settings size={14} className="opacity-40" /></div>
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-95">
                            <motion.div 
                               animate={{ scale: [1, 1.1, 1] }} 
                               transition={{ duration: 2, repeat: Infinity }}
                            >
                               <Github size={16} className="text-white" />
                            </motion.div>
                         </div>
                         <div className="text-[8px] font-black uppercase tracking-tighter text-[var(--color-accent)] opacity-80 group-hover:opacity-100">Live Now</div>
                      </div>
                      <span className="text-[8px] font-bold text-white/20">4:02</span>
                   </div>
                </div>
             </div>
             
             <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[8px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                   Open Spotify
                </div>
             </div>
          </div>

        </div>

        {/* BOTTOM APP BAR */}
        <div className="w-full max-w-4xl px-8 flex flex-col items-center" onClick={e => e.stopPropagation()}>
           <p className="text-[9px] font-bold text-white/10 uppercase tracking-[0.5em] mb-6">Quick Launcher</p>
           <div className="grid grid-cols-6 gap-6 md:gap-10">
             {apps.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.04 }}
                  onClick={() => openApp(app.id)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className={cn(
                    "w-11 h-11 md:w-13 md:h-13 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1.5 group-active:scale-95",
                    app.color
                  )}>
                    <app.icon size={22} className="text-white" />
                  </div>
                  <span className="mt-2.5 text-[8px] font-bold text-white/30 group-hover:text-white transition-colors uppercase tracking-widest opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all">
                    {app.label}
                  </span>
                </motion.div>
             ))}
           </div>
        </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
