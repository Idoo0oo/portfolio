import { useOSStore } from '../../core/store/useOSStore';
import { Github, Linkedin, Instagram, Mail, MapPin, Briefcase, Clock, ArrowUpRight, Copy, Check } from 'lucide-react';
import { cn } from '../../core/lib/utils';
import { useState } from 'react';

const links = [
  { icon: Mail,      label: 'Email',     sub: 'dittosanzz05@gmail.com',          href: 'mailto:dittosanzz05@gmail.com',            color: 'bg-red-500',   copy: 'dittosanzz05@gmail.com' },
  { icon: Github,    label: 'GitHub',    sub: 'github.com/Idoo0oo',              href: 'https://github.com/Idoo0oo',              color: 'bg-zinc-800', copy: null },
  { icon: Linkedin,  label: 'LinkedIn',  sub: 'linkedin.com/in/muhammad-ditto',  href: 'https://linkedin.com/in/muhammad-ditto',  color: 'bg-blue-600', copy: null },
  { icon: Instagram, label: 'Instagram', sub: '@mhmmdittoo._',                   href: 'https://instagram.com/mhmmdittoo._',      color: 'bg-pink-600', copy: null },
];

export default function MobileContact() {
  const { isDarkMode } = useOSStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Design tokens
  const pageBg = isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]';
  const cardBg = isDarkMode ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/8';
  const titleColor = isDarkMode ? 'text-white' : 'text-zinc-900';
  const subtitleColor = isDarkMode ? 'text-white/45' : 'text-zinc-500';
  const bodyColor = isDarkMode ? 'text-white/65' : 'text-zinc-600';

  return (
    <div className={cn('w-full h-full overflow-y-auto', pageBg)}>
      <div className="px-6 pt-5 pb-20 space-y-5">

        {/* Status card */}
        <div className={cn('p-4 rounded-2xl border', cardBg)}>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div>
              <p className={cn('text-[13px] font-bold', titleColor)}>Available for work</p>
              <p className={cn('text-[11px] mt-0.5', subtitleColor)}>Open to freelance & full-time roles</p>
            </div>
          </div>
          <div className={cn('mt-3 pt-3 border-t flex flex-col gap-2', isDarkMode ? 'border-white/8' : 'border-black/8')}>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-amber-500 shrink-0" />
              <span className={cn('text-[12px]', bodyColor)}>Tangerang, Indonesia (UTC+7)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-amber-500 shrink-0" />
              <span className={cn('text-[12px]', bodyColor)}>Response time: &lt; 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={13} className="text-amber-500 shrink-0" />
              <span className={cn('text-[12px]', bodyColor)}>Remote · On-site · Hybrid</span>
            </div>
          </div>
        </div>

        {/* Quick email CTA */}
        <a
          href="mailto:dittosanzz05@gmail.com"
          className="block w-full py-4 rounded-2xl bg-amber-500 text-black font-black text-center text-[15px] active:scale-[0.98] transition-transform shadow-lg shadow-amber-500/20"
        >
          ✉️  Send me an email
        </a>

        {/* Links */}
        <div>
          <p className={cn('text-[11px] font-bold uppercase tracking-widest mb-3', subtitleColor)}>Platforms</p>
          <div className="space-y-2.5">
            {links.map((link) => (
              <div
                key={link.label}
                className={cn('flex items-center gap-3 p-3.5 rounded-2xl border', cardBg)}
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', link.color)}>
                  <link.icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-[13px] font-bold', titleColor)}>{link.label}</p>
                  <p className={cn('text-[11px] truncate', subtitleColor)}>{link.sub}</p>
                </div>
                <div className="flex items-center gap-2">
                  {link.copy && (
                    <button
                      onClick={() => handleCopy(link.copy!)}
                      className={cn('p-1.5 rounded-lg transition-colors', isDarkMode ? 'bg-white/8 hover:bg-white/15' : 'bg-black/6 hover:bg-black/10')}
                    >
                      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} className={subtitleColor} />}
                    </button>
                  )}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn('p-1.5 rounded-lg transition-colors', isDarkMode ? 'bg-white/8 hover:bg-white/15' : 'bg-black/6 hover:bg-black/10')}
                  >
                    <ArrowUpRight size={13} className={subtitleColor} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className={cn('text-center text-[11px] leading-relaxed', subtitleColor)}>
          I read every message and reply personally.{'\n'}Looking forward to connecting! 👋
        </p>
      </div>
    </div>
  );
}
