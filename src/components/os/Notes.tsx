import { useState } from 'react';
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
  FolderOpen
} from "lucide-react";
import { experience } from "../../lib/data";
import { cn } from "../../lib/utils";

export default function Notes() {
  const [selectedId, setSelectedId] = useState<number>(experience[0].id);
  const selectedNote = experience.find(exp => exp.id === selectedId) || experience[0];

  return (
    <div className="flex h-full w-full bg-[#0a0a0a]/95 text-white select-none overflow-hidden rounded-b-xl">
      {/* 1. Folders Sidebar */}
      <aside className="w-48 h-full bg-[#0d0d0d]/80 backdrop-blur-xl border-r border-white/5 p-3 flex flex-col gap-6">
        <div>
          <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-wider px-2 mb-2">Folders</h3>
          <nav className="space-y-0.5">
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] bg-white/10 text-white transition-colors">
              <div className="flex items-center gap-2 text-yellow-500">
                <FolderOpen size={16} />
                <span className="text-white">All Experience</span>
              </div>
              <span className="text-white/30 text-[11px]">{experience.length}</span>
            </button>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] text-white/70 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-2 group-hover:text-yellow-500 transition-colors">
                <StickyNote size={16} />
                <span className="text-white/70 group-hover:text-white">Professional</span>
              </div>
              <span className="text-white/30 text-[11px]">2</span>
            </button>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] text-white/70 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-2 group-hover:text-yellow-500 transition-colors">
                <StickyNote size={16} />
                <span className="text-white/70 group-hover:text-white">Personal</span>
              </div>
              <span className="text-white/30 text-[11px]">1</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* 2. Notes List */}
      <aside className="w-64 h-full bg-[#0a0a0a]/80 border-r border-white/5 flex flex-col">
        <header className="h-12 border-b border-white/5 flex items-center justify-between px-4">
           <div className="flex gap-2">
             <button className="p-1 hover:bg-white/5 rounded text-white/40"><Trash2 size={16} /></button>
             <button className="p-1 hover:bg-white/5 rounded text-white/40"><Plus size={16} /></button>
           </div>
           <button className="p-1 hover:bg-white/5 rounded text-white/40"><Search size={16} /></button>
        </header>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {experience.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={cn(
                "w-full text-left p-4 border-b border-white/5 transition-all relative group",
                selectedId === item.id ? "bg-yellow-500/20" : "hover:bg-white/5"
              )}
            >
              {selectedId === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />
              )}
              <h4 className="text-[13px] font-bold text-white mb-1 truncate">{item.title}</h4>
              <div className="flex items-center gap-2 text-[11px] text-white/40 mb-1">
                <span className="shrink-0">{item.date.split(' ')[0]}</span>
                <span className="truncate">{item.description}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-white/30 italic">
                 <Building2 size={10} />
                 <span className="truncate">{item.company}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* 3. Note Content */}
      <main className="flex-1 h-full bg-[#050505]/95 flex flex-col relative">
        <header className="h-12 border-b border-white/5 flex items-center justify-end px-4 gap-4">
           <button className="p-1.5 hover:bg-white/5 rounded text-white/60"><Share size={18} /></button>
           <button className="p-1.5 hover:bg-white/5 rounded text-white/60"><LayoutList size={18} /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-3 text-white/30 text-[11px] mb-8 font-medium">
                <Calendar size={12} />
                <span>Last edited: {selectedNote.date}</span>
                <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 rounded border border-yellow-500/20">Experience</span>
              </div>

              <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                {selectedNote.title}
              </h1>
              
              <div className="flex items-center gap-4 py-4 border-y border-white/5 mb-8">
                 <div className="flex items-center gap-2 group cursor-default">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                       <Building2 size={16} />
                    </div>
                    <div>
                       <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Company</p>
                       <p className="text-sm font-medium text-white/90">{selectedNote.company}</p>
                    </div>
                 </div>
                 <div className="w-px h-8 bg-white/5" />
                 <div className="flex items-center gap-2 group cursor-default">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
                       <Clock size={16} />
                    </div>
                    <div>
                       <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Role</p>
                       <p className="text-sm font-medium text-white/90">{selectedNote.role}</p>
                    </div>
                 </div>
              </div>

              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-white/80 text-base leading-relaxed mb-8">
                  {selectedNote.description}
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-yellow-500" />
                    Key Achievements
                  </h3>
                  <ul className="space-y-3">
                    {selectedNote.bullets.map((bullet, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex gap-3 text-white/70 leading-relaxed group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// Internal icons helper since some might be missing in imports
const LayoutList = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);
