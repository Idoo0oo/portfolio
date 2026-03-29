import { useState, useRef, useEffect } from 'react';
import { useOSStore } from '../../core/store/useOSStore';
import { cn } from '../../core/lib/utils';
import { ChevronRight } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

const CMD_RESPONSES: Record<string, string[]> = {
  help: [
    '  Available commands:',
    '  about       → Who am I?',
    '  skills      → My tech stack',
    '  projects    → List of projects',
    '  contact     → Get in touch',
    '  status      → Current availability',
    '  clear       → Clear the terminal',
    '  exit        → Close terminal',
  ],
  about: [
    '  ┌──────────────────────────────────┐',
    '  │  Muhammad Ditto                  │',
    '  │  Full-stack Developer            │',
    '  │  UI/UX Enthusiast               │',
    '  │  Tangerang, Indonesia 🇮🇩          │',
    '  └──────────────────────────────────┘',
    '',
    '  Obsessed with pushing browser limits.',
    '  Crafting cinematic digital experiences.',
  ],
  skills: [
    '  ── Frontend ──────────────────────',
    '  React · TypeScript · Next.js · Vite',
    '',
    '  ── 3D & Animation ────────────────',
    '  Three.js · R3F · Rapier · Framer Motion',
    '',
    '  ── Backend ───────────────────────',
    '  Node.js · Express · MySQL · REST APIs',
  ],
  projects: [
    '  [1] Digital Library System   → React + MySQL',
    '  [2] GadingPro Portal         → React + Node',
    '  [3] Bluetooth Relay App      → Web Bluetooth',
    '  [4] QR Event Attendance      → Vue.js',
    '  [5] Cinematic Portfolio      → THREE.js + R3F',
    '  [6] Valentine Gift           → CSS Animations',
  ],
  contact: [
    '  📧  dittosanzz05@gmail.com',
    '  🐙  github.com/Idoo0oo',
    '  💼  linkedin.com/in/muhammad-ditto',
    '  📸  instagram.com/mhmmdittoo._',
  ],
  status: [
    '  ✅  Currently: Available for work',
    '  📍  Location: Tangerang, Indonesia',
    '  🕐  Timezone: WIB (UTC+7)',
    '  💼  Open to: Freelance & Full-time',
  ],
};

const WELCOME: TerminalLine[] = [
  { type: 'system', text: '  ╔══════════════════════════════════╗' },
  { type: 'system', text: '  ║   ditto-os v1.0.0  ~  mobile    ║' },
  { type: 'system', text: '  ╚══════════════════════════════════╝' },
  { type: 'output', text: '  Type "help" to see available commands.' },
  { type: 'output', text: '' },
];

interface MobileTerminalProps {
  onClose?: () => void;
}

export default function MobileTerminal({ onClose }: MobileTerminalProps) {
  const { isDarkMode } = useOSStore();
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'input', text: `guest@ditto-os ~ % ${cmd}` },
    ];

    if (cmd === 'clear') {
      setLines(WELCOME);
      setInput('');
      return;
    }

    if (cmd === 'exit' && onClose) {
      onClose();
      return;
    }

    const response = CMD_RESPONSES[cmd];
    if (response) {
      response.forEach((line) => newLines.push({ type: 'output', text: line }));
    } else {
      newLines.push({ type: 'error', text: `  zsh: command not found: ${cmd}` });
      newLines.push({ type: 'output', text: '  Tip: type "help" for available commands.' });
    }

    newLines.push({ type: 'output', text: '' });
    setLines(newLines);
    setInput('');
  };

  // Design tokens
  const termBg = isDarkMode ? 'bg-[#0d0d0d]' : 'bg-[#1a1a1a]';

  return (
    <div className={cn('w-full h-full flex flex-col font-mono', termBg)}>

      {/* Output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-1 py-3 space-y-0.5"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn('text-[12px] leading-relaxed whitespace-pre-wrap break-all', {
              'text-emerald-400 font-semibold': line.type === 'input',
              'text-white/70': line.type === 'output',
              'text-red-400': line.type === 'error',
              'text-amber-400 font-bold': line.type === 'system',
            })}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-3 border-t border-white/5 shrink-0">
        <ChevronRight size={14} className="text-emerald-400 shrink-0" />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="type a command..."
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-white text-base md:text-[13px] outline-none placeholder:text-white/20 caret-emerald-400"
        />
        <button
          onClick={handleSubmit}
          className="text-[11px] font-bold text-emerald-400 px-3 py-1 rounded-lg bg-emerald-400/10 active:bg-emerald-400/20"
        >
          Run
        </button>
      </div>
    </div>
  );
}
