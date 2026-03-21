import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  LayoutList, 
  LayoutGrid,
  Clock,
  Star,
  Monitor,
  FileCode,
  Folder,
  ArrowUpRight,
  ExternalLink,
  Info
} from "lucide-react";
import { projects } from "../../core/lib/data";
import { cn } from "../../core/lib/utils";

type ViewMode = 'grid' | 'list' | 'columns';

export default function Finder() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const categories = [
    { name: 'Recents', icon: Clock },
    { name: 'Starred', icon: Star },
    { name: 'All Projects', icon: Monitor },
    { name: 'Web Apps', icon: FileCode },
    { name: 'Mobile Apps', icon: FileCode },
  ];

  const filteredProjects = projects.filter(project => {
    // 1. Search filter
    const q = searchQuery.toLowerCase();
    const matchesSearch = (
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tech.some(t => t.toLowerCase().includes(q))
    );
    if (!matchesSearch) return false;

    // 2. Category filter
    if (selectedCategory === 'All Projects') return true;
    if (selectedCategory === 'Starred') return project.isStarred;
    if (selectedCategory === 'Recents') {
      // Show projects from 2026 or the 3 most recent
      const projectDate = new Date(project.date);
      const isRecent = projectDate.getFullYear() >= 2026;
      return isRecent;
    }
    if (selectedCategory === 'Web Apps') return project.category === 'Web App';
    if (selectedCategory === 'Mobile Apps') return project.category === 'Mobile App';

    return true;
  }).sort((a, b) => {
    // For Recents, sort by date descending
    if (selectedCategory === 'Recents') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  return (
    <div className="flex h-full w-full bg-[#0a0a0a]/95 text-white select-none overflow-hidden rounded-b-xl">
      {/* Sidebar */}
      <aside className="w-56 h-full bg-white/5 backdrop-blur-xl border-r border-white/5 p-3 flex flex-col gap-6">
        <div>
          <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-wider px-2 mb-2">Favorites</h3>
          <nav className="space-y-0.5">
            {categories.slice(0, 3).map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors",
                  selectedCategory === cat.name ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                )}
              >
                <cat.icon size={16} className={cn(selectedCategory === cat.name ? "text-blue-400" : "text-blue-500/70")} />
                {cat.name}
              </button>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-wider px-2 mb-2">Tags</h3>
          <nav className="space-y-0.5">
            {categories.slice(3).map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors",
                  selectedCategory === cat.name ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                )}
              >
                <cat.icon size={16} className={cn(selectedCategory === cat.name ? "text-emerald-400" : "text-emerald-500/70")} />
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Toolbar */}
        <header className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4">
              <button className="p-1 hover:bg-white/5 rounded text-white/30"><ChevronLeft size={18} /></button>
              <button className="p-1 hover:bg-white/5 rounded text-white/30"><ChevronRight size={18} /></button>
            </div>
            <h2 className="text-[13px] font-bold text-white/90">{selectedCategory}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/5 rounded-md border border-white/5 overflow-hidden">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-1.5 hover:bg-white/5 transition-colors", viewMode === 'grid' && "bg-white/10 text-blue-400")}
              >
                <LayoutGrid size={14} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-1.5 border-l border-white/5 hover:bg-white/5 transition-colors", viewMode === 'list' && "bg-white/10 text-blue-400")}
              >
                <LayoutList size={14} />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-white/30" size={14} />
              <input 
                type="text" 
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/5 rounded-md pl-7 pr-3 py-1 text-[12px] w-48 focus:outline-none focus:bg-white/10 focus:border-white/10 transition-all font-medium"
              />
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layoutId={String(project.id)}
                  onClick={() => setSelectedProject(project)}
                  className={cn(
                    "flex flex-col items-center group cursor-pointer p-2 rounded-lg transition-colors",
                    selectedProject?.id === project.id ? "bg-blue-500/20" : "hover:bg-white/5"
                  )}
                >
                  <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
                    <Folder size={64} className="text-blue-500/80 fill-blue-500/10 group-hover:fill-blue-500/20 transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center pt-2">
                       {/* App icon or technology icon would go here */}
                       <FileCode size={20} className="text-white/60" />
                    </div>
                  </div>
                  <span className="text-[11px] text-white/90 text-center font-medium line-clamp-2 px-1 rounded-sm bg-transparent group-hover:bg-blue-500/40 transition-colors">
                    {project.title}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="w-full">
              <table className="w-full text-left text-[11px]">
                <thead className="text-white/30 border-b border-white/5 sticky top-0 bg-[#0a0a0a] z-10">
                  <tr>
                    <th className="py-2 pl-2 font-medium w-64">Name</th>
                    <th className="py-2 font-medium">Technology</th>
                    <th className="py-2 font-medium text-right pr-4">Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {filteredProjects.map((project) => (
                    <tr 
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className={cn(
                        "hover:bg-white/[0.02] cursor-pointer transition-colors group relative",
                        selectedProject?.id === project.id 
                          ? "bg-[var(--color-accent)]/10" 
                          : "hover:bg-white/[0.02]"
                      )}
                    >
                      {selectedProject?.id === project.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-accent)] shadow-[2px_0_10px_var(--color-accent-glow)]" />
                      )}
                      <td className="py-2 pl-2 flex items-center gap-2">
                        <Folder size={16} className="text-blue-500/70" />
                        <span className="text-white/90">{project.title}</span>
                      </td>
                      <td className="py-2 text-white/50">{project.tech.join(', ')}</td>
                      <td className="py-2 text-white/30 text-right pr-4 italic">6.4 MB</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <footer className="h-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-center px-4">
          <span className="text-[10px] text-white/30">{filteredProjects.length} items, 1.2 TB available</span>
        </footer>
      </div>

      {/* Info Sidebar (Inspector) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.aside
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-64 h-full bg-white/5 backdrop-blur-xl border-l border-white/5 p-4 flex flex-col gap-6"
          >
            <div className="flex-1 overflow-y-auto pr-1 -mr-2 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
              <div className="flex flex-col items-center gap-4 text-center mb-6">
                 <div className="w-24 h-24 bg-white/5 rounded-xl border border-white/10 p-2 flex items-center justify-center relative overflow-hidden group/img shrink-0">
                   <img src={selectedProject.image} alt="" className="w-full h-full object-cover rounded-lg group-hover/img:scale-110 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <ArrowUpRight size={24} className="text-white" />
                   </div>
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{selectedProject.title}</h3>
                    <p className="text-[10px] text-white/40 italic">Portfolio Project • 6.4 MB</p>
                 </div>
              </div>
  
              <div className="space-y-4 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Description</span>
                  <p className="text-[12px] text-white/70 leading-relaxed line-clamp-4">
                    {selectedProject.description}
                  </p>
                </div>
  
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Technology Stack</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedProject.tech.map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5 text-[9px] text-white/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 flex flex-col gap-2 border-t border-white/5 pb-2">
              <div className="flex gap-2">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-[var(--color-accent)] hover:brightness-110 text-white rounded-md text-[11px] font-bold transition-all"
                  title="View Source on GitHub"
                >
                  Repo <ArrowUpRight size={12} />
                </a>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 bg-white/5 hover:bg-white/10 text-white/60 rounded-md transition-colors"
                >
                  <Info size={14} />
                </button>
              </div>
              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-1.5 bg-[var(--color-neon)]/10 hover:bg-[var(--color-neon)]/20 text-[var(--color-neon)] border border-[var(--color-neon)]/30 rounded-md text-[11px] font-bold transition-colors"
                >
                  Live Demo <ExternalLink size={12} />
                </a>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
