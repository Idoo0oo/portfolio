import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../core/store/useOSStore';
import { experience } from '../../core/lib/data';
import { Briefcase, CheckCircle, ChevronDown } from 'lucide-react';
import { cn } from '../../core/lib/utils';

export default function MobileNotes() {
  const { isDarkMode } = useOSStore();
  const [expanded, setExpanded] = useState<number | null>(null);

  const pageBg = isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]';
  const cardBg = isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/8';
  const titleColor = isDarkMode ? 'text-white' : 'text-zinc-900';
  const subtitleColor = isDarkMode ? 'text-white/45' : 'text-zinc-500';
  const bodyColor = isDarkMode ? 'text-white/65' : 'text-zinc-600';
  const timelineLineColor = isDarkMode ? 'bg-white/10' : 'bg-black/10';
  const bulletColor = isDarkMode ? 'text-white/60' : 'text-zinc-500';

  return (
    <div className={cn('w-full h-full overflow-y-auto', pageBg)}>
      <div className="px-6 pt-5 pb-20 space-y-6">

        <div className="flex flex-col items-center justify-center text-center pb-2">
          <h1 className={cn('text-2xl font-black tracking-tight', titleColor)}>Career Timeline</h1>
          <p className={cn('text-[13px] font-medium mt-1', subtitleColor)}>Work History & Experience</p>
        </div>

        <div className="relative">
          <div className={cn('absolute left-4 top-2 bottom-2 w-[2px]', timelineLineColor)} />

          <div className="space-y-6 pl-12">
            {experience.map((exp, idx) => {
              const isOpen = expanded === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[36px] top-4 w-4 h-4 rounded-full bg-amber-500 border-2 border-[#0a0a0a] shadow-[0_0_0_3px_rgba(245,158,11,0.2)]" />

                  <div className={cn('rounded-[18px] border overflow-hidden shadow-sm', cardBg)}>
                    {/* Tap header to expand */}
                    <button
                      className="w-full text-left p-4 active:scale-[0.99] transition-transform"
                      onClick={() => setExpanded(isOpen ? null : exp.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', isDarkMode ? 'bg-amber-500/15' : 'bg-amber-500/10')}>
                          <Briefcase size={18} className="text-amber-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn('text-[10px] font-bold uppercase tracking-widest mb-0.5', subtitleColor)}>{exp.date}</p>
                          <h2 className={cn('text-[15px] font-black leading-tight', titleColor)}>{exp.title}</h2>
                          <p className={cn('text-[12px] font-semibold mt-0.5', subtitleColor)}>{exp.company} · {exp.role}</p>
                        </div>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                          <ChevronDown size={16} className={subtitleColor} />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className={cn('px-4 pb-3 border-t', isDarkMode ? 'border-white/8' : 'border-black/8')}>
                            <p className={cn('text-[13px] leading-relaxed mt-3 mb-3', bodyColor)}>{exp.description}</p>
                            <div className="space-y-2">
                              {exp.bullets.map((bullet, bIdx) => (
                                <motion.div
                                  key={bIdx}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: bIdx * 0.05 }}
                                  className="flex gap-2.5"
                                >
                                  <CheckCircle size={13} className="text-amber-500 shrink-0 mt-[2px]" />
                                  <span className={cn('text-[12px] leading-relaxed', bulletColor)}>{bullet}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
