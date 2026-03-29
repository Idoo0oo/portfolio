import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../core/store/useOSStore';
import { cn } from '../../core/lib/utils';
import { Search, FolderOpen, FileText, User, X } from 'lucide-react';
import { projects } from '../../core/lib/data';
import { experience } from '../../core/lib/data';

interface MobileSpotlightProps {
  onClose: () => void;
}

const skills = ['React', 'TypeScript', 'Node.js', 'Three.js', 'Tailwind', 'Laravel', 'PHP', 'Python', 'Vue.js', 'PostgreSQL'];

export default function MobileSpotlight({ onClose }: MobileSpotlightProps) {
  const { isDarkMode } = useOSStore();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const projectHits = projects.filter(p =>
      p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tech.some(t => t.toLowerCase().includes(q))
    ).map(p => ({ type: 'project' as const, icon: FolderOpen, color: 'text-amber-500', label: p.title, sub: p.tech.slice(0, 3).join(' · ') }));

    const expHits = experience.filter(e =>
      e.title.toLowerCase().includes(q) || e.company.toLowerCase().includes(q)
    ).map(e => ({ type: 'exp' as const, icon: FileText, color: 'text-emerald-500', label: e.title, sub: e.company }));

    const skillHits = skills.filter(s => s.toLowerCase().includes(q))
      .map(s => ({ type: 'skill' as const, icon: User, color: 'text-blue-400', label: s, sub: 'Tech Stack' }));

    return [...projectHits, ...expHits, ...skillHits].slice(0, 6);
  }, [query]);

  const bg = isDarkMode ? 'bg-[#0d0d0d]/95' : 'bg-white/95';
  const inputBg = isDarkMode ? 'bg-white/8 text-white placeholder:text-white/30' : 'bg-black/6 text-zinc-900 placeholder:text-zinc-400';
  const rowHover = isDarkMode ? 'hover:bg-white/6' : 'hover:bg-black/4';
  const subColor = isDarkMode ? 'text-white/40' : 'text-zinc-400';
  const labelColor = isDarkMode ? 'text-white' : 'text-zinc-900';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 z-[400] backdrop-blur-sm flex flex-col pt-12"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        onClick={e => e.stopPropagation()}
        className={cn('mx-5 rounded-[22px] overflow-hidden shadow-2xl border', bg, isDarkMode ? 'border-white/10' : 'border-black/8')}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-inherit">
          <Search size={16} className={isDarkMode ? 'text-white/40' : 'text-zinc-400'} />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search projects, skills, career..."
            className={cn('flex-1 bg-transparent text-[14px] outline-none font-medium', inputBg)}
          />
          {query && (
            <button onClick={() => setQuery('')} className={cn('p-1 rounded-full', isDarkMode ? 'bg-white/10' : 'bg-black/8')}>
              <X size={12} className={isDarkMode ? 'text-white' : 'text-zinc-600'} />
            </button>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              {results.map((r, i) => (
                <motion.div
                  key={r.label + i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn('flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors', rowHover)}
                >
                  <r.icon size={16} className={r.color} />
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-[13px] font-semibold truncate', labelColor)}>{r.label}</p>
                    <p className={cn('text-[11px] truncate', subColor)}>{r.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {query && results.length === 0 && (
          <div className="px-4 py-8 flex flex-col items-center gap-2">
            <Search size={24} className={isDarkMode ? 'text-white/20' : 'text-zinc-300'} />
            <p className={cn('text-[13px] font-medium', subColor)}>No results for "{query}"</p>
          </div>
        )}

        {!query && (
          <div className="px-4 py-4">
            <p className={cn('text-[11px] font-bold uppercase tracking-widest mb-2', subColor)}>Quick Actions</p>
            {[{ icon: FolderOpen, color: 'text-amber-500', label: 'View All Projects' }, { icon: FileText, color: 'text-emerald-500', label: 'Career Timeline' }, { icon: User, color: 'text-blue-400', label: 'Profile' }].map(q => (
              <div key={q.label} className={cn('flex items-center gap-3 py-2.5 cursor-pointer rounded-[12px] px-2 -mx-2 transition-colors', rowHover)}>
                <q.icon size={15} className={q.color} />
                <p className={cn('text-[13px] font-medium', labelColor)}>{q.label}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
