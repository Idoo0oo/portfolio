import { useEffect, useState, Component, type ErrorInfo, type ReactNode } from 'react';
import { useOSStore } from '../../core/store/useOSStore';
import { cn } from "../../core/lib/utils";
import { motion } from 'framer-motion';

class ErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode, fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Rendering Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

import Lanyard from './Lanyard';
import {
  MapPin,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  Code2,
  Briefcase,
  GraduationCap,
  Globe,
  Headphones,
  Coffee,
  Gamepad2,
} from 'lucide-react';
import { BrandIcons } from './BrandIcons';

const GITHUB_AVATAR = '/github-avatar.jpg';

const skills = [
  { name: 'React', icon: BrandIcons.React, color: 'text-blue-400' },
  { name: 'TypeScript', icon: BrandIcons.TypeScript, color: 'text-blue-600' },
  { name: 'Node.js', icon: BrandIcons.Nodejs, color: 'text-green-500' },
  { name: 'Three.js', icon: BrandIcons.Threejs, color: 'text-white' },
  { name: 'Tailwind', icon: BrandIcons.Tailwind, color: 'text-cyan-400' },
  { name: 'Laravel', icon: BrandIcons.Laravel, color: 'text-red-500' },
  { name: 'PHP', icon: BrandIcons.PHP, color: 'text-indigo-400' },
  { name: 'Python', icon: BrandIcons.Python, color: 'text-yellow-400' },
  { name: 'Javascript', icon: BrandIcons.Javascript, color: 'text-yellow-300' },
  { name: 'Vue.js', icon: BrandIcons.Vue, color: 'text-emerald-500' },
  { name: 'MySQL', icon: BrandIcons.MySQL, color: 'text-blue-500' },
  { name: 'PostgreSQL', icon: BrandIcons.PostgreSQL, color: 'text-blue-400' },
  { name: 'Express', icon: BrandIcons.Express, color: 'text-gray-400' },
  { name: 'Bootstrap', icon: BrandIcons.Bootstrap, color: 'text-purple-500' },
  { name: 'Framer Motion', icon: BrandIcons.FramerMotion, color: 'text-pink-500' },
  { name: 'Figma', icon: BrandIcons.Figma, color: 'text-orange-400' },
  { name: 'Git', icon: BrandIcons.Git, color: 'text-orange-600' },
  { name: 'GitHub', icon: Github, color: 'text-white' },
];

const stats = [
  { label: 'Projects', value: '6+', icon: Code2, color: 'text-amber-400' },
  { label: 'Internship', value: '1', icon: Briefcase, color: 'text-blue-400' },
  { label: 'Exams Passed', value: 'UKK', icon: GraduationCap, color: 'text-[var(--color-accent)]' },
];

const socials = [
  { icon: Github, href: 'https://github.com/Idoo0oo', label: 'GitHub', color: 'text-white' },
  { icon: Linkedin, href: 'https://linkedin.com/in/muhammad-ditto', label: 'LinkedIn', color: 'text-blue-400' },
  { icon: Instagram, href: 'https://instagram.com/mhmmdittoo._', label: 'Instagram', color: 'text-pink-400' },
];

const funFacts = [
  { icon: Globe, text: 'Politic Enthusiast', color: 'text-emerald-400' },
  { icon: Headphones, text: 'Music Is My Escape', color: 'text-rose-400' },
  { icon: Coffee, text: 'Americano Is My Fuel', color: 'text-amber-400' },
  { icon: Gamepad2, text: 'MOBA & FPS Player', color: 'text-cyan-400' },
];

export default function AboutThisMac() {
  const openApp = useOSStore((state) => state.openApp);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for the 0.8s entry animation to fully complete before starting WebGL
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[var(--color-accent)]/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="w-full h-full flex items-center justify-center">
            <ErrorBoundary fallback={
              <div className="flex flex-col items-center gap-3 text-white/40">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-500/50">3D Context Loss / Rendering Error</span>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-3 py-1 border border-white/10 rounded-lg text-[9px] hover:bg-white/5 transition-colors"
                >
                  RELOAD ENGINE
                </button>
              </div>
            }>
              {isReady ? (
                <Lanyard key="lanyard-3d-main" position={[0, 0, 30]} />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[var(--color-accent)]/20 border-t-[var(--color-accent)] rounded-full animate-spin" />
                  <span className="text-[10px] text-white/20 font-mono animate-pulse uppercase tracking-widest">Initialising 3D Rendering Engine</span>
                </div>
              )}
            </ErrorBoundary>
          </div>

          {/* Grab hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/20 text-[11px] font-mono tracking-wider pointer-events-none transition-colors">
            <span>CURSOR MOVEMENT FOR SWING</span>
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
                  className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)]/30 object-cover"
                />
                <div>
                  <p className="text-[var(--color-accent)] text-[11px] font-bold uppercase">Muhammad Ditto Alfiansyah</p>
                  <p className="text-white/40 text-[11px] font-mono">github.com/Idoo0oo</p>
                </div>
              </motion.div>
 
              <h1 className="text-5xl xl:text-6xl text-white font-black tracking-tighter mb-1 leading-none">
                Ido<span className="text-[var(--color-accent)]">.</span>
              </h1>
              <p className="text-sm font-mono tracking-wide text-white/40 mb-4">Muhammad Ditto</p>
 
              <p className="text-base leading-relaxed text-white/60">
                Full-stack developer from <span className="font-medium text-white">Tangerang, Indonesia</span>. 
                Building interactive, data-driven apps with React, Node.js, and Three.js. 
                Currently completing my <span className="text-[var(--color-accent)]">UKK Digital Library System</span>.
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
              <div className="flex flex-wrap gap-4">
                {skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover="hover"
                    initial="initial"
                    className="flex items-center gap-0 overflow-hidden px-2.5 py-1.5 border rounded-full text-[11px] font-medium transition-all cursor-default bg-zinc-900/60 border-white/5 hover:border-[var(--color-accent)]/40 hover:bg-zinc-800/60 group px-3"
                  >
                    <skill.icon size={13} className={cn("transition-colors", skill.color)} />
                    <motion.span
                      variants={{
                        initial: { width: 0, opacity: 0, marginLeft: 0 },
                        hover: { width: 'auto', opacity: 1, marginLeft: 8 }
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="whitespace-nowrap text-white/90 font-medium"
                    >
                      {skill.name}
                    </motion.span>
                  </motion.div>
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
                  className="border p-3 rounded-xl flex items-center gap-2.5 transition-all bg-zinc-900/40 border-white/5 hover:bg-zinc-800/40 hover:border-white/10 group"
                >
                  <div className={cn("p-1.5 rounded-lg bg-white/5 transition-colors group-hover:bg-white/10", fact.color)}>
                    <fact.icon size={16} strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-medium leading-tight text-white/70 group-hover:text-white transition-colors">{fact.text}</span>
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
              <MapPin size={12} className="text-[var(--color-accent)]" />
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
                className="flex-1 text-center px-5 py-3 text-black text-sm font-bold rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5 active:scale-95 shadow-lg bg-[var(--color-accent)] shadow-[var(--color-accent)]/15"
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
              className="flex items-center gap-5 mt-5 pb-6"
            >
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover="hover"
                  initial="initial"
                  className="h-10 border rounded-xl flex items-center justify-center transition-all bg-zinc-900/60 border-white/5 hover:bg-zinc-800/60 hover:border-white/20 group px-3 overflow-hidden"
                >
                  <Icon size={16} className={cn("transition-colors", color)} />
                  <motion.span
                    variants={{
                      initial: { width: 0, opacity: 0, marginLeft: 0 },
                      hover: { width: 'auto', opacity: 1, marginLeft: 10 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="whitespace-nowrap text-xs font-bold text-white/90"
                  >
                    {label}
                  </motion.span>
                </motion.a>
              ))}
              <span className="ml-auto text-[10px] font-mono tracking-widest text-white/10 uppercase">© 2026 Muhammad Ditto Alfiansyah - All Rights Reserved</span>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
