import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from "../../core/store/useOSStore";
import { cn } from "../../core/lib/utils";
import { 
  Cloud, 
  MapPin, 
  Clock, 
  Calendar as CalendarIcon,
  Code2,
  ExternalLink,
  ClipboardCheck
} from "lucide-react";

export default function Widgets() {
  const isWidgetsOpen = useOSStore((state) => state.isWidgetsOpen);
  const toggleWidgets = useOSStore((state) => state.toggleWidgets);
  const isDarkMode = useOSStore((state) => state.isDarkMode);


  return (
    <AnimatePresence>
      {isWidgetsOpen && (
        <>
          {/* Backdrop (Invisible but clickable to close) */}
          <div 
            onClick={toggleWidgets}
            className="fixed inset-0 z-[550]"
          />

          {/* Widgets Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed top-12 right-4 bottom-4 w-[280px] z-[551] backdrop-blur-2xl border rounded-[2.5rem] shadow-2xl transition-colors duration-300 overflow-hidden flex flex-col",
              isDarkMode 
                ? "bg-[#1e1e1e]/70 border-white/10" 
                : "bg-white/70 border-black/5"
            )}
          >
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
              <div className="flex flex-col gap-4">
              {/* Date & Time Widget */}
              <div className={cn(
                "rounded-2xl p-4 border shadow-xl transition-colors",
                isDarkMode ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col">
                    <span className="text-rose-500 text-[10px] font-bold uppercase tracking-wider">System Time</span>
                    <span className={cn("text-[11px] font-bold", isDarkMode ? "text-white/60" : "text-black/60")}>
                      {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                    </span>
                  </div>
                  <CalendarIcon size={20} className={isDarkMode ? "text-white/20" : "text-black/20"} />
                </div>
                <div className="space-y-1">
                  <h4 className={cn("text-2xl font-black tracking-tighter", isDarkMode ? "text-white" : "text-zinc-900")}>
                    {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </h4>
                  <div className={cn("text-xs font-bold font-mono px-2 py-1 rounded-md inline-block", isDarkMode ? "bg-white/10 text-white" : "bg-black/10 text-zinc-900")}>
                    {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                  </div>
                </div>
                <div className={cn("h-[1px] my-3", isDarkMode ? "bg-white/5" : "bg-black/10")} />
                <div className={cn("flex items-center gap-2 text-[10px]", isDarkMode ? "text-white/40" : "text-black/50")}>
                  <Clock size={12} />
                  <span>Next: Project Milestone Review</span>
                </div>
              </div>

              {/* Current Mission Widget */}
              <div className={cn(
                "rounded-2xl p-4 border shadow-xl relative overflow-hidden group/mission",
                isDarkMode ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
              )}>
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <ClipboardCheck size={18} className="text-amber-400 group-hover/mission:scale-110 transition-transform" />
                      <motion.div 
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-amber-400 blur-sm rounded-full -z-10"
                      />
                    </div>
                    <span className={cn("text-xs font-black uppercase tracking-widest", isDarkMode ? "text-white/40" : "text-black/40")}>Current Mission</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                    <span className="text-[9px] font-black text-rose-500 uppercase">Active</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className={cn("text-lg font-black tracking-tight leading-tight", isDarkMode ? "text-white" : "text-zinc-900")}>
                      Refining Portfolio UI <br/>
                      <span className="text-amber-500 text-sm">& Experience UX</span>
                    </h4>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] items-end">
                      <span className={isDarkMode ? "text-white/40" : "text-black/40"}>Mission Progress</span>
                      <span className="font-mono text-amber-500">85%</span>
                    </div>
                    <div className={cn("w-full h-1.5 rounded-full overflow-hidden", isDarkMode ? "bg-white/5" : "bg-black/5")}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-amber-500 to-rose-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className={cn("p-2 rounded-xl", isDarkMode ? "bg-white/5" : "bg-black/5")}>
                      <div className="text-[8px] font-bold text-white/30 uppercase mb-1">Target</div>
                      <div className={cn("text-[10px] font-bold", isDarkMode ? "text-white/80" : "text-zinc-700")}>Production Ready</div>
                    </div>
                    <div className={cn("p-2 rounded-xl", isDarkMode ? "bg-white/5" : "bg-black/5")}>
                      <div className="text-[8px] font-bold text-white/30 uppercase mb-1">Est. Completion</div>
                      <div className={cn("text-[10px] font-bold", isDarkMode ? "text-white/80" : "text-zinc-700")}>Q1 2026</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Location Widget */}
              <div className={cn(
                "rounded-2xl p-4 border shadow-xl",
                isDarkMode ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
              )}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-emerald-400" />
                    <span className={cn("text-[11px] font-medium", isDarkMode ? "text-white" : "text-zinc-900")}>Tangerang, ID</span>
                  </div>
                  <Cloud size={16} className={isDarkMode ? "text-white/30" : "text-black/20"} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className={cn("text-[11px]", isDarkMode ? "text-white/80" : "text-zinc-700")}>Available for Work</span>
                </div>
              </div>

              {/* Links Widget */}
              <div className={cn(
                "rounded-2xl p-4 border shadow-xl",
                isDarkMode ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
              )}>
                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={18} className="text-amber-400" />
                  <span className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-zinc-900")}>Quick Links</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a href="#" className={cn(
                    "flex items-center justify-between p-2 rounded-lg transition-colors text-[10px]",
                    isDarkMode ? "bg-white/10 text-white/90 hover:bg-white/20" : "bg-black/10 text-zinc-800 hover:bg-black/20"
                  )}>
                    GitHub <ExternalLink size={10} />
                  </a>
                  <a href="#" className={cn(
                    "flex items-center justify-between p-2 rounded-lg transition-colors text-[10px]",
                    isDarkMode ? "bg-white/10 text-white/90 hover:bg-white/20" : "bg-black/10 text-zinc-800 hover:bg-black/20"
                  )}>
                    LinkedIn <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
