import { useOSStore } from '../../core/store/useOSStore';
import Lanyard from '../os/Lanyard';
import { Github, Linkedin, Mail, Instagram, ArrowUpRight } from 'lucide-react';
import { cn } from '../../core/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const socialLinks = [
  { icon: Github,    href: 'https://github.com/Idoo0oo',               label: 'GitHub',    color: 'text-white bg-zinc-800' },
  { icon: Linkedin,  href: 'https://linkedin.com/in/muhammad-ditto',   label: 'LinkedIn',  color: 'text-white bg-blue-600' },
  { icon: Instagram, href: 'https://instagram.com/mhmmdittoo._',      label: 'Instagram', color: 'text-white bg-pink-600' },
  { icon: Mail,      href: 'mailto:dittosanzz05@gmail.com',             label: 'Email',     color: 'text-white bg-red-500' },
];

const skillsWithLevel = [
  { name: 'React',         level: 90 },
  { name: 'TypeScript',    level: 82 },
  { name: 'Node.js',       level: 78 },
  { name: 'Three.js',      level: 70 },
  { name: 'Tailwind CSS',  level: 88 },
  { name: 'Laravel / PHP', level: 75 },
  { name: 'Python',        level: 65 },
  { name: 'MySQL / PgSQL', level: 72 },
  { name: 'Vue.js',        level: 68 },
  { name: 'Framer Motion', level: 80 },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function MobileAbout() {
  const { isDarkMode } = useOSStore();
  // Lazy-mount guard: Three.js/WebGL should NOT run in the background.
  // We use useState so React triggers a re-render after mount.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const pageBg     = useMemo(() => isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]', [isDarkMode]);
  const cardBg     = useMemo(() => isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/8', [isDarkMode]);
  const titleColor = useMemo(() => isDarkMode ? 'text-white'    : 'text-zinc-900', [isDarkMode]);
  const subColor   = useMemo(() => isDarkMode ? 'text-white/45' : 'text-zinc-500', [isDarkMode]);
  const bodyColor  = useMemo(() => isDarkMode ? 'text-white/70' : 'text-zinc-600', [isDarkMode]);
  const trackBg    = useMemo(() => isDarkMode ? 'bg-white/8'    : 'bg-black/8',    [isDarkMode]);

  return (
    <div className={cn('w-full h-full overflow-y-auto', pageBg)}>
      <motion.div
        className="px-6 pt-5 pb-20 space-y-5"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Profile Header */}
        <motion.div variants={fadeUp} className="flex flex-col items-center justify-center text-center pb-2">
          <h1 className={cn('text-2xl font-black tracking-tight', titleColor)}>Muhammad Ditto</h1>
          <p className={cn('text-[13px] font-medium mt-1', subColor)}>Full-stack Developer & UI/UX Enthusiast</p>
        </motion.div>

        {/* 3D Lanyard — lazy mounted to avoid WebGL running in background */}
        <motion.div variants={fadeUp} className={cn('w-full h-60 rounded-[18px] border overflow-hidden relative transition-transform active:scale-[0.99]', isDarkMode ? 'bg-[#111] border-white/10' : 'bg-[#f0f0f0] border-black/8')}>
          {isMounted && <Lanyard />}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
            <span className={cn('text-[10px] font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-sm border', isDarkMode ? 'bg-black/50 text-white/80 border-white/10' : 'bg-white/80 text-zinc-700 border-black/10')}>
              Drag to interact
            </span>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div variants={fadeUp} className={cn('p-4 rounded-[18px] border transition-transform active:scale-[0.98]', cardBg)}>
          <h3 className="text-[11px] font-black uppercase tracking-widest mb-2 text-amber-500">Bio</h3>
          <p className={cn('text-[13px] leading-relaxed', bodyColor)}>
            Experienced Full-stack Developer with a passion for building scalable web applications and crafting intuitive UI/UX. Bridging the gap between robust backend logic and cinematic frontend experiences.
          </p>
        </motion.div>

        {/* Animated Skill Progress Bars */}
        <motion.div variants={fadeUp} className={cn('p-4 rounded-[18px] border', cardBg)}>
          <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 text-amber-500">Tech Stack</h3>
          <div className="space-y-3">
            {skillsWithLevel.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className={cn('text-[12px] font-semibold', titleColor)}>{skill.name}</span>
                  <span className={cn('text-[11px] font-bold', subColor)}>{skill.level}%</span>
                </div>
                <div className={cn('h-1.5 rounded-full overflow-hidden', trackBg)}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={fadeUp}>
          <h3 className={cn('text-[11px] font-black uppercase tracking-widest mb-3', subColor)}>Connect</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('flex items-center gap-3 p-3.5 rounded-[16px] border transition-all active:scale-95', cardBg)}
              >
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm', link.color)}>
                  <link.icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-[12px] font-bold truncate', titleColor)}>{link.label}</p>
                </div>
                <ArrowUpRight size={13} className={subColor} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
