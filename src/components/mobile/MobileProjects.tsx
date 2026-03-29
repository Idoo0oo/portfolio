import { motion } from 'framer-motion';
import { projects } from '../../core/lib/data';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { triggerHaptic } from '../../core/lib/utils';

export default function MobileProjects() {

  return (
    <div className="w-full h-full bg-black overflow-y-auto overflow-x-hidden snap-y snap-mandatory no-scrollbar relative">
      
      {/* Floating Header indicator */}
      <div className="fixed top-2 left-0 w-full px-6 pt-safe-top z-20 pointer-events-none flex justify-between items-center">
         <h2 className="text-white text-xl font-black tracking-tight drop-shadow-lg">Projects</h2>
         <span className="text-white/70 text-[10px] font-black uppercase tracking-widest drop-shadow-md bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">Wiping down</span>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="w-full h-[100dvh] shrink-0 snap-start snap-always relative flex flex-col justify-end">
          
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Foreground Title/Data (Bottom aligned) */}
          <div className="relative z-10 w-full px-6 pb-[130px]"> {/* pb is large to account for BottomTabBar gap */}
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.8 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00E5FF] mb-2 block drop-shadow-md">
                {project.category}
              </span>
              <h1 className="text-4xl font-black text-white leading-tight drop-shadow-lg mb-2">
                {project.title}
              </h1>
              <p className="text-[14px] font-medium text-white/80 mb-5 line-clamp-3 leading-relaxed drop-shadow-md pr-4">
                {project.description}
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={triggerHaptic}
                  className="flex-1 py-3.5 rounded-full flex justify-center items-center gap-2 font-bold text-[13px] bg-white text-black active:scale-95 transition-transform shadow-lg"
                >
                  Source <ArrowUpRight size={16} />
                </a>
                
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={triggerHaptic}
                    className="flex-1 py-3.5 rounded-full flex justify-center items-center gap-2 font-bold text-[13px] bg-blue-600 text-white active:scale-95 transition-transform shadow-lg border border-blue-500/50"
                  >
                     Live Demo <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}
