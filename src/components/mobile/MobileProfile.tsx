import { useOSStore } from '../../core/store/useOSStore';
import { Github, Linkedin, Mail, Instagram, ArrowUpRight, Briefcase, CheckCircle, QrCode, Copy, UserRound, Download, Image } from 'lucide-react';
import { cn, triggerHaptic } from '../../core/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { experience } from '../../core/lib/data';
import MobileGallery from './MobileGallery';

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
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function MobileProfile() {
  const { isDarkMode } = useOSStore();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const pageBg     = useMemo(() => cn('transition-colors duration-500', isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'), [isDarkMode]);
  const cardBg     = useMemo(() => cn('transition-all duration-500', isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/8'), [isDarkMode]);
  const titleColor = useMemo(() => cn('transition-colors duration-500', isDarkMode ? 'text-white' : 'text-zinc-900'), [isDarkMode]);
  const subColor   = useMemo(() => cn('transition-colors duration-500', isDarkMode ? 'text-white/45' : 'text-zinc-500'), [isDarkMode]);
  const bodyColor  = useMemo(() => cn('transition-colors duration-500', isDarkMode ? 'text-white/70' : 'text-zinc-600'), [isDarkMode]);

  // Card State
  const [showQR, setShowQR] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const handleCopy = async () => {
    const textToCopy = 'https://mhmmditto.vercel.app';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for non-secure contexts (HTTP local testing on mobile)
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        
        // Prevent virtual keyboard from appearing on mobile devices
        textArea.setAttribute('readonly', '');
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999); // iOS compat
        
        document.execCommand('copy');
        textArea.remove();
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    } finally {
      // Trigger UI reaction regardless
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className={cn('w-full h-full overflow-y-auto no-scrollbar pt-16 pb-32', pageBg)}>
      <motion.div
        className="px-6 space-y-6"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Profile Title */}
        <motion.div variants={fadeUp} className="flex justify-between w-full items-center mb-2 px-2">
          <h1 className={cn('text-2xl font-black tracking-tight', titleColor)}>Profile</h1>
        </motion.div>

        {/* 3D Flip Card & Actions */}
        <motion.div variants={fadeUp} className="w-full relative px-2 mb-8" style={{ perspective: 1200 }}>
          <motion.div
            animate={{ rotateY: showQR ? 180 : 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="relative w-full aspect-[4/5] max-w-[300px] mx-auto rounded-3xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front (Photo) */}
            <div 
              className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0a]"
              style={{ backfaceVisibility: 'hidden', border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' }}
            >
              <img src="/github-avatar.jpg" alt="Profile" className="w-full h-full object-cover opacity-90" />
              <div 
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-300",
                  showQR ? "opacity-0" : "opacity-100"
                )} 
              />
              <div 
                className={cn(
                  "absolute bottom-5 left-5 right-5 text-white z-10 pointer-events-none transition-opacity duration-300",
                  showQR ? "opacity-0" : "opacity-100"
                )}
              >
                <h2 className="text-xl font-black drop-shadow-md">Muhammad Ditto</h2>
                <p className="text-[13px] font-medium text-white/80 drop-shadow-sm mt-0.5">Full-stack Developer</p>
              </div>
            </div>

            {/* Back (QR Code) */}
            <div 
              className={cn("absolute inset-0 w-full h-full rounded-3xl border shadow-2xl flex flex-col items-center justify-center p-6", isDarkMode ? "bg-[#111] border-white/10" : "bg-white border-black/10")}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <h3 className={cn("text-lg font-black mb-5 tracking-tight", titleColor)}>Connect via Link</h3>
              <div className="w-44 h-44 bg-white rounded-2xl p-2 shadow-inner border border-zinc-200">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://mhmmditto.vercel.app&color=000000&bgcolor=ffffff" alt="QR Code" className="w-full h-full rounded-xl mix-blend-multiply" />
              </div>
              <p className={cn("text-[10px] font-extrabold uppercase tracking-widest mt-6", subColor)}>Scan to Visit</p>
            </div>
          </motion.div>

          {/* Action Buttons (Bento Grid) */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            <button 
              onClick={() => {
                triggerHaptic();
                setShowQR(!showQR);
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-2.5 aspect-[5/3] rounded-[20px] shadow-sm transition-all active:scale-95 border",
                isDarkMode ? "bg-[#222] text-white border-white/10" : "bg-white text-zinc-900 border-black/10"
              )}
            >
              {showQR ? <UserRound size={22} className="opacity-80" /> : <QrCode size={22} className="opacity-80" />}
              <span className="text-[11px] font-bold tracking-wide">{showQR ? "Profile" : "Show QR"}</span>
            </button>
            
            <button 
              onClick={() => {
                triggerHaptic();
                handleCopy();
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-2.5 aspect-[5/3] rounded-[20px] shadow-sm transition-all active:scale-95 border",
                isDarkMode ? "bg-white text-black border-transparent" : "bg-zinc-900 text-white border-transparent"
              )}
            >
              {isCopied ? <CheckCircle size={22} className="text-emerald-500" /> : <Copy size={22} className="opacity-90" />}
              <span className="text-[11px] font-bold tracking-wide">{isCopied ? "Copied!" : "Copy Link"}</span>
            </button>
            
            <a 
              href="/cv-muhammad-ditto.pdf"
              download="CV-Muhammad-Ditto.pdf"
              onClick={() => triggerHaptic()}
              className={cn(
                "flex flex-col items-center justify-center gap-2.5 aspect-[5/3] rounded-[20px] shadow-sm transition-all active:scale-95 border",
                isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border-emerald-500/20"
              )}
            >
              <Download size={22} className="opacity-90" />
              <span className="text-[11px] font-bold tracking-wide">Get CV</span>
            </a>
            
            <button 
              onClick={() => {
                triggerHaptic();
                setShowGallery(true);
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-2.5 aspect-[5/3] rounded-[20px] shadow-sm transition-all active:scale-95 border",
                isDarkMode ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-amber-50 text-amber-600 border-amber-500/20"
              )}
            >
              <Image size={22} className="opacity-90" />
              <span className="text-[11px] font-bold tracking-wide">Gallery</span>
            </button>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div variants={fadeUp} className={cn('p-5 rounded-[24px] border shadow-sm', cardBg)}>
          <h3 className="text-[12px] font-black uppercase tracking-widest mb-3 text-amber-500">About Me</h3>
          <p className={cn('text-[14px] leading-relaxed', bodyColor)}>
            Experienced Full-stack Developer with a passion for building scalable web applications and crafting intuitive UI/UX. Bridging the gap between robust backend logic and cinematic frontend experiences.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={fadeUp}>
          <h3 className={cn('text-[12px] font-black uppercase tracking-widest mb-3', subColor)}>Connect</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('flex items-center gap-3 p-3.5 rounded-[18px] border transition-all active:scale-95 shadow-sm', cardBg)}
              >
                <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm', link.color)}>
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

        {/* Animated Skill Progress Bars (Apple Watch Rings Style) */}
        <motion.div variants={fadeUp} className={cn('p-5 py-6 rounded-[24px] border shadow-sm', cardBg)}>
          <h3 className="text-[12px] font-black uppercase tracking-widest mb-6 text-center text-teal-400">Tech Stack Mastery</h3>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-6">
            {skillsWithLevel.map((skill, i) => {
              const radius = 28;
              const strokeWidth = 5;
              const normalizedRadius = radius - strokeWidth * 2;
              const circumference = normalizedRadius * 2 * Math.PI;
              const strokeDashoffset = circumference - (skill.level / 100) * circumference;
              
              // Vibrant specific colors for aesthetic rings
              const colors = ['#00E5FF', '#00E676', '#D500F9', '#FFD600', '#FF3D00'];
              const ringColor = colors[i % colors.length];

              return (
                <div key={skill.name} className="flex flex-col items-center gap-2">
                  <div className="relative w-[60px] h-[60px] flex items-center justify-center font-bold">
                    <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90 drop-shadow-md">
                      <circle
                        stroke={isDarkMode ? '#222' : '#e5e5e5'}
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        r={normalizedRadius}
                        cx="30"
                        cy="30"
                      />
                      <motion.circle
                        stroke={ringColor}
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference + ' ' + circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.1, type: 'spring', bounce: 0.2 }}
                        r={normalizedRadius}
                        cx="30"
                        cy="30"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                      />
                    </svg>
                    <span className={cn('absolute text-[11px]', titleColor)}>{skill.level}%</span>
                  </div>
                  <span className={cn('text-[9px] font-black uppercase tracking-widest', subColor)}>{skill.name}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div variants={fadeUp} className="pt-2">
          <h3 className={cn('text-[12px] font-black uppercase tracking-widest mb-4', subColor)}>Experience</h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className={cn('p-5 rounded-[24px] border shadow-sm', cardBg)}>
                <div className="flex items-start gap-4 mb-3">
                  <div className={cn('w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 shadow-inner', isDarkMode ? 'bg-blue-500/15' : 'bg-blue-500/10')}>
                    <Briefcase size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className={cn('text-[10px] font-black uppercase tracking-widest mb-0.5', subColor)}>{exp.date}</p>
                    <h3 className={cn('text-[15px] font-black leading-tight', titleColor)}>{exp.title}</h3>
                    <p className={cn('text-[13px] font-medium mt-0.5', subColor)}>{exp.company} · {exp.role}</p>
                  </div>
                </div>
                <p className={cn('text-[13px] leading-relaxed mb-3', bodyColor)}>{exp.description}</p>
                <div className="space-y-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex gap-2">
                      <CheckCircle size={14} className="text-blue-500 shrink-0 mt-[1px]" />
                      <span className={cn('text-[12px] leading-relaxed', bodyColor)}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>

      {/* Copy Link Popup Toast (Portaled out of transformed containers) */}
      {isMounted && document.body && createPortal(
        <AnimatePresence>
          {isCopied && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9, x: '-50%' }}
              animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
              exit={{ opacity: 0, y: -20, scale: 0.9, x: '-50%' }}
              className={cn(
                "fixed top-[40px] left-1/2 px-5 py-3 rounded-full flex items-center gap-2.5 shadow-2xl z-[9999] border whitespace-nowrap",
                isDarkMode ? "bg-[#1f1f1f] text-white border-white/10" : "bg-white text-zinc-900 border-black/10"
              )}
            >
              <CheckCircle size={18} className="text-emerald-500" />
              <span className="text-[13px] font-bold">Link berhasil dicopy!</span>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {showGallery && (
          <MobileGallery onClose={() => setShowGallery(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
