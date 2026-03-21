import { motion } from 'framer-motion';

export default function MobileFallback() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 py-16 overflow-hidden relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[var(--color-neon)]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Avatar/Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-full border-2 border-[var(--color-neon)]/40 flex items-center justify-center bg-white/5">
          <span className="text-4xl font-black text-[var(--color-neon)]">I</span>
        </div>
        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--color-neon)] rounded-full border-2 border-[#0a0a0a]" />
      </motion.div>

      {/* Name & Role */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-center mb-8"
      >
        <p className="text-[var(--color-neon)] font-mono text-xs tracking-[0.3em] uppercase mb-2">
          Full-Stack Developer
        </p>
        <h1 className="text-4xl font-black tracking-tighter mb-2">Muhammad Ditto</h1>
        <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
          Building interactive digital experiences with React, Three.js, and Node.js.
          Based in Tangerang, Indonesia.
        </p>
      </motion.div>

      {/* Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 text-center"
      >
        <p className="text-2xl mb-2">🖥️</p>
        <p className="text-white/80 text-sm font-medium">Best viewed on Desktop</p>
        <p className="text-white/40 text-xs mt-1">
          This portfolio is an interactive macOS-style OS experience. 
          Visit on a laptop or desktop for the full experience.
        </p>
      </motion.div>

      {/* Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-sm space-y-3 mb-8"
      >
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider text-center mb-4">Featured Projects</p>
        {[
          { title: "Digital Library System", stack: "React · Express · MySQL", url: "https://github.com/Idoo0oo/ukk-perpustakaan" },
          { title: "GadingPro Portal", stack: "React · Node.js · Vercel", url: "https://gadingpro-backend.vercel.app" },
          { title: "Valentine Gift", stack: "JS · CSS · Framer Motion", url: "https://idoo0oo.github.io/valentine-gift" },
        ].map((p) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:border-[var(--color-neon)]/40 transition-colors group"
          >
            <div>
              <p className="text-sm font-semibold text-white group-hover:text-[var(--color-neon)] transition-colors">{p.title}</p>
              <p className="text-[11px] text-white/40 font-mono">{p.stack}</p>
            </div>
            <span className="text-white/30 group-hover:text-[var(--color-neon)] transition-colors text-lg">→</span>
          </a>
        ))}
      </motion.div>

      {/* CTA Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex gap-3 w-full max-w-sm"
      >
        <a
          href="/cv-muhammad-ditto.pdf"
          download
          className="flex-1 py-3 bg-[var(--color-neon)] text-black text-sm font-bold rounded-xl text-center hover:opacity-90 transition-opacity"
        >
          Download CV
        </a>
        <a
          href="https://github.com/Idoo0oo"
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-3 bg-white/5 border border-white/10 text-white text-sm font-bold rounded-xl text-center hover:bg-white/10 transition-colors"
        >
          GitHub →
        </a>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 flex gap-5 text-white/30 text-xs"
      >
        <a href="https://github.com/Idoo0oo" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        <a href="https://linkedin.com/in/muhammad-ditto" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        <a href="https://instagram.com/mhmmdittoo._" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
        <a href="mailto:dittosanzz05@gmail.com" className="hover:text-white transition-colors">Email</a>
      </motion.div>

      <p className="mt-10 text-[10px] text-white/10 font-mono tracking-widest">
        © 2026 MUHAMMAD DITTO
      </p>
    </div>
  );
}
