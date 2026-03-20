import { useEffect, lazy, Suspense } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { cn } from "../../lib/utils";
import { motion } from 'framer-motion';

const Lanyard = lazy(() => import('./Lanyard'));
import {
  MapPin,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

const GITHUB_AVATAR = '/github-avatar.jpg';

const skills = ['React', 'TypeScript', 'Node.js', 'Three.js', 'MySQL', 'Express', 'Tailwind', 'Figma'];

const stats = [
  { label: 'Projects', value: '6+', icon: Code2, color: 'text-amber-400' },
  { label: 'Internship', value: '1', icon: Briefcase, color: 'text-blue-400' },
  { label: 'Exams Passed', value: 'UKK', icon: GraduationCap, color: 'text-[var(--color-neon)]' },
];

const socials = [
  { icon: Github, href: 'https://github.com/Idoo0oo', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/muhammad-ditto', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/mhmmdittoo._', label: 'Instagram' },
];

const funFacts = [
  { emoji: '🚀', text: 'Built my first PC at 12' },
  { emoji: '🎸', text: 'I play guitar & piano' },
  { emoji: '☕', text: 'Fuelled by Matcha & Lo-fi' },
  { emoji: '🌑', text: 'Night owl & Star gazer' },
];

export default function AboutThisMac() {
  const openApp = useOSStore((state) => state.openApp);
  const maximizedApps = useOSStore(state => state.maximizedApps);
  const maximizeApp = useOSStore(state => state.maximizeApp);

  useEffect(() => {
    if (!maximizedApps.includes('about')) {
      maximizeApp('about');
    }
  }, [maximizedApps, maximizeApp]);

  return (
    <div className="h-full bg-black/90 backdrop-blur-3xl select-none overflow-hidden flex flex-col transition-colors duration-300">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden min-h-0">

        {/* Left: 3D Lanyard */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center bg-black/40 border-r border-white/5 h-full overflow-hidden transition-colors duration-300"
        >
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[var(--color-neon)]/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="w-full h-full flex items-center justify-center">
            <Suspense fallback={
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[var(--color-neon)]/20 border-t-[var(--color-neon)] rounded-full animate-spin" />
                <span className="text-[10px] text-white/20 font-mono animate-pulse uppercase tracking-widest">Initialising 3D Rendering Engine</span>
              </div>
            }>
              <Lanyard position={[0, 0, 30]} />
            </Suspense>
          </div>

          {/* Grab hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/20 text-[11px] font-mono tracking-wider pointer-events-none transition-colors">
            <span>✦</span>
            <span>DRAG TO SWING</span>
            <span>✦</span>
          </div>
        </motion.div>

        {/* Right: Info Panel */}
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col p-8 xl:p-12 min-h-full"
          >
            {/* Header */}
            <div className="mb-7">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-3 mb-4"
              >
                <img
                  src={GITHUB_AVATAR}
                  alt="Muhammad Ditto"
                  className="w-12 h-12 rounded-full border-2 border-[var(--color-neon)]/30 object-cover"
                />
                <div>
                  <p className="text-[var(--color-neon)] text-[11px] font-bold uppercase tracking-[0.3em]">Portfolio 2026</p>
                  <p className="text-white/40 text-[11px] font-mono">github.com/Idoo0oo</p>
                </div>
              </motion.div>
 
              <h1 className="text-5xl xl:text-6xl text-white font-black tracking-tighter mb-1 leading-none">
                Ido<span className="text-[var(--color-neon)]">.</span>
              </h1>
              <p className="text-sm font-mono tracking-wide text-white/40 mb-4">Muhammad Ditto</p>
 
              <p className="text-base leading-relaxed text-white/60">
                Full-stack developer from <span className="font-medium text-white">Tangerang, Indonesia</span>. 
                Building interactive, data-driven apps with React, Node.js, and Three.js. 
                Currently completing my <span className="text-[var(--color-neon)]">UKK Digital Library System</span>.
              </p>
            </div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="grid grid-cols-3 gap-3 mb-6"
            >
              {stats.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-zinc-900/60 border border-white/5 rounded-xl p-3 flex flex-col gap-1 transition-colors hover:bg-zinc-800/60">
                  <Icon size={14} className={color} />
                  <span className={cn("text-xl font-black", color)}>{value}</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-white/40">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mb-6"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2 text-white/30">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 border rounded-full text-[11px] font-medium transition-colors cursor-default bg-zinc-900/60 border-white/5 text-white/70 hover:border-[var(--color-neon)]/40 hover:text-[var(--color-neon)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="grid grid-cols-2 gap-2 mb-7"
            >
              {funFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="border p-3 rounded-xl flex items-center gap-2.5 transition-colors bg-zinc-900/40 border-white/5 hover:bg-zinc-800/40"
                >
                  <span className="text-base">{fact.emoji}</span>
                  <span className="text-xs font-medium leading-tight text-white/70">{fact.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex items-center gap-1.5 text-xs mb-7 text-white/30"
            >
              <MapPin size={12} className="text-[var(--color-neon)]" />
              <span>Tangerang, Indonesia</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-3 mb-6"
            >
              <a
                href="/cv-muhammad-ditto.pdf"
                download
                className="flex-1 text-center px-5 py-3 text-black text-sm font-bold rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5 active:scale-95 shadow-lg bg-[var(--color-neon)] shadow-[var(--color-neon)]/15"
              >
                Download CV
              </a>
              <button
                onClick={() => openApp('contact')}
                className="flex-1 px-5 py-3 border text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5 active:scale-95 bg-zinc-900/60 border-white/5 text-white hover:bg-zinc-800/60"
              >
                Contact Me
              </button>
              <a
                href="https://github.com/Idoo0oo"
                target="_blank"
                rel="noreferrer"
                className="p-3 border rounded-xl transition-all hover:-translate-y-0.5 bg-zinc-900/60 border-white/5 text-white/50 hover:text-white hover:bg-zinc-800/60"
              >
                <ExternalLink size={16} />
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex items-center gap-3"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all border-white/5 text-white/40 hover:text-white hover:border-white/20 hover:bg-zinc-900/60"
                >
                  <Icon size={14} />
                </a>
              ))}
              <span className="ml-auto text-[10px] font-mono tracking-widest text-white/10">© 2026 IDO</span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
