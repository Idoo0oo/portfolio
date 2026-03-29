import { motion } from 'framer-motion';
import { useOSStore } from '../../core/store/useOSStore';
import { projects } from '../../core/lib/data';
import { ExternalLink, Github, Tag } from 'lucide-react';
import { cn } from '../../core/lib/utils';
import { useState } from 'react';

const CATEGORIES = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

export default function MobileFinder() {
  const { isDarkMode } = useOSStore();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  const pageBg = isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]';
  const cardBg = isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/8';
  const titleColor = isDarkMode ? 'text-white' : 'text-zinc-900';
  const subtitleColor = isDarkMode ? 'text-white/45' : 'text-zinc-500';
  const bodyColor = isDarkMode ? 'text-white/70' : 'text-zinc-600';
  const dividerColor = isDarkMode ? 'border-white/8' : 'border-black/8';
  const tagBg = isDarkMode ? 'bg-white/8 text-white/60' : 'bg-black/6 text-zinc-600';
  const iconColor = isDarkMode ? 'text-white/40 hover:text-white' : 'text-zinc-400 hover:text-zinc-900';
  const chipBase = isDarkMode ? 'border-white/10 text-white/60' : 'border-black/10 text-zinc-500';
  const chipActive = isDarkMode ? 'bg-white text-black border-transparent' : 'bg-zinc-900 text-white border-transparent';

  return (
    <div className={cn('w-full h-full overflow-y-auto', pageBg)}>
      <div className="px-6 pt-5 pb-20">

        {/* Header */}
        <div className="flex items-end justify-between mb-4">
          <h1 className={cn('text-2xl font-black tracking-tight', titleColor)}>All Projects</h1>
          <span className={cn('text-[11px] font-semibold pb-1', subtitleColor)}>{filtered.length} total</span>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all',
                activeCategory === cat ? chipActive : chipBase
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className={cn('rounded-[18px] border overflow-hidden shadow-sm transition-transform active:scale-[0.98]', cardBg)}
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] font-black uppercase tracking-wider bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className={cn('text-base font-bold leading-tight', titleColor)}>{project.title}</h2>
                  <div className="flex gap-2 shrink-0 mt-0.5">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className={cn('p-1 -mr-1 transition-colors', iconColor)}>
                        <Github size={16} />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className={cn('p-1 transition-colors', iconColor)}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <p className={cn('text-[13px] leading-relaxed line-clamp-2', bodyColor)}>{project.description}</p>
                <div className={cn('pt-3 border-t flex flex-wrap gap-1.5', dividerColor)}>
                  {project.tech.map(t => (
                    <span key={t} className={cn('flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full', tagBg)}>
                      <Tag size={8} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
