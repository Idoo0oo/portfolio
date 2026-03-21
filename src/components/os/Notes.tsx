import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Share, 
  Search, 
  Building2,
  CheckCircle2,
  Clock,
  Calendar,
  StickyNote,
  FolderOpen,
  Github,
  Link,
  Tag,
  Code
} from "lucide-react";
import { experience, projects } from "../../core/lib/data";
import { cn } from "../../core/lib/utils";

type ContentType = 'experience' | 'project';
type FolderType = 'all' | 'professional' | 'projects';

interface UnifiedItem {
  id: string | number;
  type: ContentType;
  title: string;
  date: string;
  description: string;
  company?: string;
  role?: string;
  bullets?: string[];
  tech?: string[];
  github?: string;
  demo?: string;
  category?: string;
}

export default function Notes() {
  const [activeFolder, setActiveFolder] = useState<FolderType>('all');
  
  const allItems = useMemo(() => {
    const expItems: UnifiedItem[] = experience.map(exp => ({ ...exp, type: 'experience' }));
    const projItems: UnifiedItem[] = projects.map(proj => ({ ...proj, type: 'project' }));
    return [...expItems, ...projItems].sort((a, b) => {
        // Sort by date descending (assuming YYYY-MM-DD or similar)
        return b.date.localeCompare(a.date);
    });
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFolder === 'professional') return allItems.filter(i => i.type === 'experience');
    if (activeFolder === 'projects') return allItems.filter(i => i.type === 'project');
    return allItems;
  }, [activeFolder, allItems]);

  const [selectedId, setSelectedId] = useState<string | number>(allItems[0].id);
  const selectedNote = allItems.find(item => item.id === selectedId) || allItems[0];

  return (
    <div className="flex h-full w-full bg-[#0a0a0a]/95 text-white select-none overflow-hidden rounded-b-xl border-t border-white/5">
      {/* 1. Folders Sidebar */}
      <aside className="w-52 h-full bg-[#0d0d0d]/80 backdrop-blur-xl border-r border-white/5 p-3 flex flex-col gap-6">
        <div>
          <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] px-2 mb-3">Library</h3>
          <nav className="space-y-1">
            <button 
                onClick={() => setActiveFolder('all')}
                className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-all group",
                    activeFolder === 'all' ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
            >
              <div className="flex items-center gap-2.5">
                <FolderOpen size={16} className={cn("transition-colors", activeFolder === 'all' ? "text-yellow-500" : "text-white/30 group-hover:text-yellow-500/70")} />
                <span className="font-medium">All History</span>
              </div>
              <span className="text-white/20 text-[10px] font-mono">{allItems.length}</span>
            </button>
            <button 
                onClick={() => setActiveFolder('professional')}
                className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-all group",
                    activeFolder === 'professional' ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
            >
              <div className="flex items-center gap-2.5">
                <StickyNote size={16} className={cn("transition-colors", activeFolder === 'professional' ? "text-blue-500" : "text-white/30 group-hover:text-blue-500/70")} />
                <span className="font-medium">Professional</span>
              </div>
              <span className="text-white/20 text-[10px] font-mono">{experience.length}</span>
            </button>
            <button 
                onClick={() => setActiveFolder('projects')}
                className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-all group",
                    activeFolder === 'projects' ? "bg-white/10 text-white shadow-sm" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
            >
              <div className="flex items-center gap-2.5">
                <Code size={16} className={cn("transition-colors", activeFolder === 'projects' ? "text-emerald-500" : "text-white/30 group-hover:text-emerald-500/70")} />
                <span className="font-medium">Software Projects</span>
              </div>
              <span className="text-white/20 text-[10px] font-mono">{projects.length}</span>
            </button>
          </nav>
        </div>

        {/* Categories / Tags Section */}
        <div className="mt-auto pb-4">
             <div className="px-3 py-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] text-white/20 uppercase tracking-widest font-bold mb-4">
                    <Tag size={10} />
                    Filters
                </div>
                <div className="flex flex-wrap gap-1.5 opacity-60">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] border border-white/5">React</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] border border-white/5">Cyber</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] border border-white/5">WebGL</span>
                </div>
             </div>
        </div>
      </aside>

      {/* 2. Items List */}
      <aside className="w-72 h-full bg-[#0a0a0a]/80 border-r border-white/5 flex flex-col">
        <header className="h-12 border-b border-white/5 flex items-center justify-between px-4">
           <div className="flex gap-1">
             <button className="p-1.5 hover:bg-white/5 rounded-md text-white/30 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
             <button className="p-1.5 hover:bg-white/5 rounded-md text-white/30 hover:text-[var(--color-accent)] transition-colors"><Plus size={16} /></button>
           </div>
           <div className="relative group/search">
               <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/search:text-[var(--color-accent)] transition-colors" />
               <input 
                   type="text" 
                   placeholder="Search..."
                   className="pl-7 pr-2 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] w-32 focus:w-40 focus:border-[var(--color-accent)]/50 transition-all outline-none"
               />
           </div>
        </header>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredItems.map((item) => (
            <button
              key={`${item.type}-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className={cn(
                "w-full text-left p-4 border-b border-white/5 transition-all relative group",
                selectedId === item.id ? "bg-[var(--color-accent)]/15" : "hover:bg-white/5"
              )}
            >
              {selectedId === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent-glow)]" />
              )}
              <h4 className={cn(
                  "text-[13px] font-bold mb-1 truncate group-hover:text-white transition-colors",
                  selectedId === item.id ? "text-white" : "text-white/80"
              )}>{item.title}</h4>
              <div className="flex items-center gap-2 text-[11px] text-white/40 mb-1.5">
                <span className="shrink-0 font-mono text-[10px] text-[var(--color-accent)]/60">{item.date.split('-')[0]}</span>
                <span className="truncate">{item.description}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium">
                    {item.type === 'experience' ? <Building2 size={10} className="text-blue-400/50" /> : <Code size={10} className="text-emerald-400/50" />}
                    <span className="truncate">{item.company || item.category || 'Project'}</span>
                </div>
                {item.type === 'project' && item.tech?.[0] && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500/80 border border-emerald-500/20">{item.tech[0]}</span>
                )}
              </div>
            </button>
          ))}
          {filteredItems.length === 0 && (
            <div className="p-8 text-center text-white/20 text-xs italic">
                No items in this category.
            </div>
          )}
        </div>
      </aside>

      {/* 3. Note Content */}
      <main className="flex-1 h-full bg-[#050505]/95 flex flex-col relative overflow-hidden">
        <header className="h-12 border-b border-white/5 flex items-center justify-end px-4 gap-4">
           {selectedNote.type === 'project' && selectedNote.github && (
               <a 
                href={selectedNote.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-white/60 hover:bg-white/10 hover:text-white transition-all scale-95 hover:scale-100"
               >
                  <Github size={14} />
                  Repo
               </a>
           )}
           <button className="p-1.5 hover:bg-white/5 rounded text-white/40 hover:text-white transition-colors"><Share size={18} /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-12 lg:p-16 custom-scrollbar scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedNote.type}-${selectedId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-white/30 text-[11px] font-bold tracking-widest uppercase">
                    <Calendar size={12} className="text-[var(--color-accent)]/50" />
                    <span>{selectedNote.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className={cn(
                        "px-2 py-0.5 rounded text-[9px] border",
                        selectedNote.type === 'experience' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    )}>
                        {selectedNote.type === 'experience' ? 'Resume' : 'Project'}
                    </span>
                </div>
              </div>

              <h1 className="text-5xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
                {selectedNote.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-white/5 mb-10 bg-white/[0.01] px-4 rounded-xl">
                 {selectedNote.type === 'experience' ? (
                    <>
                        <div className="flex items-center gap-3 group cursor-default">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/10 transition-transform group-hover:scale-110">
                            <Building2 size={20} />
                            </div>
                            <div>
                            <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Company</p>
                            <p className="text-base font-bold text-white/90">{selectedNote.company}</p>
                            </div>
                        </div>
                        <div className="hidden sm:block w-px h-10 bg-white/5" />
                        <div className="flex items-center gap-3 group cursor-default">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/10 transition-transform group-hover:scale-110">
                            <Clock size={20} />
                            </div>
                            <div>
                            <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Role</p>
                            <p className="text-base font-bold text-white/90">{selectedNote.role}</p>
                            </div>
                        </div>
                    </>
                 ) : (
                    <>
                        <div className="flex items-center gap-3 group cursor-default">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] border border-[var(--color-accent)]/10 transition-transform group-hover:scale-110">
                                <Tag size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Category</p>
                                <p className="text-base font-bold text-white/90">{selectedNote.category}</p>
                            </div>
                        </div>
                        <div className="hidden sm:block w-px h-10 bg-white/5" />
                        <div className="flex items-center gap-3 group cursor-default max-w-[300px]">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/10 transition-transform group-hover:scale-110">
                                <Code size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Tech Stack</p>
                                <p className="text-xs font-bold text-white/90 truncate">{selectedNote.tech?.join(', ')}</p>
                            </div>
                        </div>
                    </>
                 )}
              </div>

              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-white/70 text-lg leading-relaxed mb-10 font-medium">
                  {selectedNote.description}
                </p>
                
                {selectedNote.type === 'experience' && selectedNote.bullets && (
                    <div className="space-y-6">
                        <h3 className="text-white font-black text-xl flex items-center gap-2 tracking-tight">
                            <CheckCircle2 size={22} className="text-[var(--color-accent)]" />
                            Key Achievements
                        </h3>
                        <ul className="space-y-4">
                            {selectedNote.bullets.map((bullet, idx) => (
                            <motion.li 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className="flex gap-4 text-white/60 text-base leading-relaxed group p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all"
                            >
                                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-2.5 shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_10px_var(--color-accent-glow)]" />
                                {bullet}
                            </motion.li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedNote.type === 'project' && (
                    <div className="space-y-8 animate-in fade-in duration-700">
                        <div className="grid grid-cols-2 gap-4">
                            {selectedNote.tech?.map((t: string) => (
                                <div key={t} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-[var(--color-accent)]/20 transition-colors">
                                    <div className="p-2 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                                        <Code size={14} />
                                    </div>
                                    <span className="text-sm font-bold text-white/80">{t}</span>
                                </div>
                            ))}
                        </div>

                        {selectedNote.demo && (
                            <a 
                                href={selectedNote.demo} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-black font-black rounded-2xl hover:opacity-90 transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-[var(--color-accent-glow)]/10"
                            >
                                <Link size={20} />
                                View Live Demo
                            </a>
                        )}
                    </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
