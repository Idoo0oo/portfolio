import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from "../../store/useOSStore";
import { cn } from "../../lib/utils";
import { 
  BarChart3, 
  Cloud, 
  MapPin, 
  Clock, 
  Calendar as CalendarIcon,
  Code2,
  ExternalLink
} from "lucide-react";

export default function Widgets() {
  const isWidgetsOpen = useOSStore((state) => state.isWidgetsOpen);
  const toggleWidgets = useOSStore((state) => state.toggleWidgets);
  const isDarkMode = useOSStore((state) => state.isDarkMode);

  const techStack = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Node.js', level: 85 },
    { name: 'Three.js', level: 75 },
    { name: 'Framer Motion', level: 90 },
  ];

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
              "fixed top-12 right-4 bottom-4 w-[280px] z-[551] backdrop-blur-2xl border rounded-[2.5rem] p-5 shadow-2xl overflow-y-auto custom-scrollbar transition-colors duration-300",
              isDarkMode 
                ? "bg-[#1e1e1e]/70 border-white/10" 
                : "bg-white/70 border-black/5"
            )}
          >
            <div className="flex flex-col gap-4">
              {/* Date & Time Widget */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-rose-500 text-[10px] font-bold uppercase tracking-wider">Date</span>
                    <span className={cn("text-xl font-bold", isDarkMode ? "text-white" : "text-black")}>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <CalendarIcon size={24} className={isDarkMode ? "text-white/20" : "text-black/10"} />
                </div>
                <div className={cn("h-[1px] my-3", isDarkMode ? "bg-white/5" : "bg-black/5")} />
                <div className={cn("flex items-center gap-2 text-xs", isDarkMode ? "text-white/60" : "text-black/60")}>
                  <Clock size={14} />
                  <span>Next: Finish Portfolio Refactor</span>
                </div>
              </div>

              {/* Tech Stack Widget */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={18} className="text-blue-400" />
                  <span className="text-white text-sm font-bold">Tech Stack</span>
                </div>
                <div className="space-y-3">
                  {techStack.map(tech => (
                    <div key={tech.name} className="space-y-1">
                      <div className="flex justify-between text-[10px] text-white/60">
                        <span>{tech.name}</span>
                        <span>{tech.level}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${tech.level}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status & Location Widget */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-emerald-400" />
                    <span className="text-white text-[11px] font-medium">Tangerang, ID</span>
                  </div>
                  <Cloud size={16} className="text-white/30" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-white/80">Available for Work</span>
                </div>
              </div>

              {/* Links Widget */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={18} className="text-amber-400" />
                  <span className="text-white text-sm font-bold">Quick Links</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a href="#" className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-[10px] text-white/80">
                    GitHub <ExternalLink size={10} />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-[10px] text-white/80">
                    LinkedIn <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={toggleWidgets}
                className="text-[10px] text-white/20 hover:text-white/40 transition-colors uppercase tracking-[0.2em]"
              >
                Edit Widgets
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
