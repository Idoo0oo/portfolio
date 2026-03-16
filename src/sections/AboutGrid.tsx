import { motion } from "motion/react";
import { Globe, Cpu, Code2 } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

export default function AboutGrid() {
  return (
    <section id="about" className="relative w-full min-h-[100dvh] md:h-[100dvh] flex items-center justify-center bg-black overflow-hidden py-20 md:py-0">
      <ScrollReveal>
      <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[70vh]">
        
        {/* Box 1: Intro Utama */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 md:row-span-2 bg-[#111] rounded-3xl p-8 border border-white/10 flex flex-col justify-end group overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-30 transition-all duration-700">
            <Code2 size={150} />
          </div>
          <h3 className="text-[var(--color-neon)] font-mono text-sm mb-4 tracking-widest uppercase">The Developer</h3>
          <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
            I turn complex problems into <span className="text-gray-500 text-xl md:text-2xl block mt-2 italic font-light">elegant, performant digital solutions.</span>
          </p>
        </motion.div>

        {/* Box 2: Location/Globe */}
        <div className="bg-[#111] rounded-3xl p-6 border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 animate-pulse">
            <Globe size={24} />
          </div>
          <p className="text-sm text-gray-400 font-mono">Based in Tangerang, Indonesia. Available for remote work worldwide.</p>
        </div>

        {/* Box 3: Tech Stack Icon */}
        <div className="bg-[#111] rounded-3xl p-6 border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
            <Cpu size={24} />
          </div>
          <p className="text-sm text-gray-400 font-mono">Modern Tech Stack: React, R3F, Node.js</p>
        </div>

        {/* Box 4: Experience Stat (Besar) */}
        <div className="md:col-span-2 bg-[#111] rounded-3xl p-8 border border-white/10 flex items-center justify-between group">
          <div>
            <h4 className="text-5xl font-bold text-white mb-2 group-hover:text-[var(--color-neon)] transition-colors">3+</h4>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Years of Experience</p>
          </div>
          <div className="text-right">
            <h4 className="text-5xl font-bold text-white mb-2 group-hover:text-[var(--color-neon)] transition-colors">15+</h4>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Projects Completed</p>
          </div>
        </div>

      </div>
      </ScrollReveal>
    </section>
  );
}