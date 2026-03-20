import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Folder, ExternalLink } from 'lucide-react';
import { useOSStore, type AppId } from "../../store/useOSStore";
import { cn } from "../../lib/utils";
import { projects, experience } from "../../lib/data";
import { 
  Terminal, 
  User, 
  Mail, 
  Settings, 
  History,
} from "lucide-react";

const apps: { id: AppId; icon: any; label: string; color: string; description: string }[] = [
  { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'bg-zinc-800', description: 'Command line interface' },
  { id: 'about', icon: User, label: 'About Me', color: 'bg-blue-500', description: 'Who is Ido?' },
  { id: 'projects', icon: Folder, label: 'Projects', color: 'bg-amber-500', description: 'Browse all projects' },
  { id: 'experience', icon: History, label: 'Experience', color: 'bg-emerald-500', description: 'Work history & timeline' },
  { id: 'contact', icon: Mail, label: 'Contact', color: 'bg-rose-500', description: 'Send a message' },
  { id: 'settings', icon: Settings, label: 'Settings', color: 'bg-gray-500', description: 'OS preferences' },
];

export default function Spotlight() {
  const isSpotlightOpen = useOSStore((state) => state.isSpotlightOpen);
  const toggleSpotlight = useOSStore((state) => state.toggleSpotlight);
  const openApp = useOSStore((state) => state.openApp);
  const isDarkMode = useOSStore((state) => state.isDarkMode);
  
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.toLowerCase();

  const filteredApps = apps.filter(app =>
    app.label.toLowerCase().includes(q) || app.description.toLowerCase().includes(q)
  );

  const filteredProjects = q.length >= 2
    ? projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some(t => t.toLowerCase().includes(q))
      )
    : [];

  const filteredExp = q.length >= 2
    ? experience.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q)
      )
    : [];

  const totalResults = filteredApps.length + filteredProjects.length + filteredExp.length;

  useEffect(() => {
    if (isSpotlightOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSpotlightOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredApps.length));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + filteredApps.length) % Math.max(1, filteredApps.length));
    } else if (e.key === 'Enter') {
      if (filteredApps[selectedIndex]) {
        openApp(filteredApps[selectedIndex].id);
        toggleSpotlight();
      }
    } else if (e.key === 'Escape') {
      toggleSpotlight();
    }
  };

  return (
    <AnimatePresence>
      {isSpotlightOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSpotlight}
            className="fixed inset-0 z-[700] bg-black/10"
          />

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[600px] z-[701] backdrop-blur-xl rounded-xl border shadow-2xl overflow-hidden transition-colors duration-300",
              isDarkMode 
                ? "bg-[#1e1e1e]/80 border-white/20" 
                : "bg-white/80 border-black/10"
            )}
          >
            <div className={cn(
              "flex items-center px-4 py-4 border-b",
              isDarkMode ? "border-white/10" : "border-black/5"
            )}>
              <Search size={22} className={cn("mr-3", isDarkMode ? "text-white/50" : "text-black/30")} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search apps, projects, experience..."
                className={cn(
                  "flex-1 bg-transparent border-none outline-none text-xl transition-colors",
                  isDarkMode ? "text-white placeholder-white/30" : "text-black placeholder-black/20"
                )}
              />
              <div className="flex items-center gap-1 opacity-40">
                <Command size={14} className={isDarkMode ? "text-white" : "text-black"} />
                <span className={cn("text-xs", isDarkMode ? "text-white" : "text-black")}>K</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[420px] overflow-y-auto p-2 custom-scrollbar">
              {totalResults === 0 && query.length > 0 ? (
                <div className={cn("py-10 text-center text-sm", isDarkMode ? "text-white/40" : "text-black/40")}>
                  No results found for "{query}"
                </div>
              ) : (
                <>
                  {/* Apps Section */}
                  {filteredApps.length > 0 && (
                    <div className="mb-2">
                      <div className={cn("px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-1", isDarkMode ? "text-white/40" : "text-black/40")}>
                        Applications
                      </div>
                      {filteredApps.map((app, index) => (
                        <div
                          key={app.id}
                          onClick={() => { openApp(app.id); toggleSpotlight(); }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-colors group ${
                            index === selectedIndex ? 'bg-blue-600' : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5')
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg ${app.color} flex items-center justify-center mr-3 shadow-lg transition-transform duration-200 group-hover:scale-110`}>
                            <app.icon size={18} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <span className={cn("text-sm font-medium transition-colors", 
                              index === selectedIndex ? "text-white" : (isDarkMode ? "text-white" : "text-black")
                            )}>{app.label}</span>
                            <p className={cn("text-[11px] transition-colors", 
                              index === selectedIndex ? "text-white/70" : (isDarkMode ? "text-white/40" : "text-black/40")
                            )}>{app.description}</p>
                          </div>
                          {index === selectedIndex && (
                            <div className="ml-auto text-white/50 text-xs">↵ Open</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Projects Section */}
                  {filteredProjects.length > 0 && (
                    <div className="mb-2">
                      <div className={cn("px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-1", isDarkMode ? "text-white/40" : "text-black/40")}>
                        Projects
                      </div>
                      {filteredProjects.map((project) => (
                        <div
                          key={project.id}
                          onClick={() => { openApp('projects'); toggleSpotlight(); }}
                          className={cn("flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-colors group", isDarkMode ? "hover:bg-white/5" : "hover:bg-black/5")}
                        >
                          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mr-3">
                            <Folder size={16} className="text-amber-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-black")}>{project.title}</span>
                            <p className={cn("text-[11px] truncate", isDarkMode ? "text-white/40" : "text-black/40")}>{project.tech.join(' · ')}</p>
                          </div>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={cn("ml-2 p-1 transition-colors opacity-0 group-hover:opacity-100", isDarkMode ? "text-white/30 hover:text-white" : "text-black/30 hover:text-black")}
                          >
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Experience Section */}
                  {filteredExp.length > 0 && (
                    <div className="mb-2">
                      <div className={cn("px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-1", isDarkMode ? "text-white/40" : "text-black/40")}>
                        Experience
                      </div>
                      {filteredExp.map((exp) => (
                        <div
                          key={exp.id}
                          onClick={() => { openApp('experience'); toggleSpotlight(); }}
                          className={cn("flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-colors", isDarkMode ? "hover:bg-white/5" : "hover:bg-black/5")}
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mr-3">
                            <History size={16} className="text-emerald-400" />
                          </div>
                          <div>
                            <span className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-black")}>{exp.title}</span>
                            <p className={cn("text-[11px]", isDarkMode ? "text-white/40" : "text-black/40")}>{exp.company} · {exp.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </>
              )}
            </div>
            
            <div className={cn("px-4 py-2 border-t flex items-center justify-between", isDarkMode ? "bg-black/20 border-white/5" : "bg-black/5 border-black/5")}>
              <span className={cn("text-[10px]", isDarkMode ? "text-white/30" : "text-black/40")}>↑↓ navigate · ↵ open · esc close</span>
              {query.length >= 2 && totalResults > 0 && (
                <span className={cn("text-[10px]", isDarkMode ? "text-white/30" : "text-black/40")}>{totalResults} result{totalResults !== 1 ? 's' : ''}</span>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
