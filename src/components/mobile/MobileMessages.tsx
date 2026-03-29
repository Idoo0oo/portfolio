import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, triggerHaptic } from '../../core/lib/utils';
import { useOSStore } from '../../core/store/useOSStore';
import { CheckCheck, Eye, ThumbsUp, Rocket, Zap, Trophy, ClipboardList, Palette, Hand, Link, Users, Sparkles, UserRound, Send } from 'lucide-react';

// ─── Conversation script ───────────────────────────────────────────────────────
type Side = 'recruiter' | 'me';

interface Message {
  id: number;
  side: Side;
  text: React.ReactNode;
  delay: number; // ms after previous message appears
  showTyping?: boolean; // show typing indicator before this msg
}

const CONVERSATION: Message[] = [
  { id: 1,  side: 'recruiter', text: <span className="flex items-center gap-1.5 flex-wrap">Hi! I came across your portfolio — really impressive work <Eye size={14} className="inline"/></span>, delay: 600,  showTyping: true  },
  { id: 2,  side: 'recruiter', text: "Are you currently open to new opportunities?", delay: 1200, showTyping: false },
  { id: 3,  side: 'me',        text: <span className="flex items-center gap-1.5 flex-wrap">Hey! Thanks so much <ThumbsUp size={14} className="inline"/></span>, delay: 1800, showTyping: true  },
  { id: 4,  side: 'me',        text: <span className="flex items-center gap-1.5 flex-wrap">Yes! Open for both full-time and freelance right now <Rocket size={14} className="inline"/></span>, delay: 800,  showTyping: false },
  { id: 5,  side: 'recruiter', text: "Great! What's your primary tech stack?", delay: 2000, showTyping: true  },
  { id: 6,  side: 'me',        text: "React + TypeScript on the frontend, Node.js on the backend.", delay: 1800, showTyping: true  },
  { id: 7,  side: 'me',        text: <span className="flex items-center gap-1.5 flex-wrap">Also comfortable with Laravel/PHP, Python, and MySQL/PostgreSQL <Zap size={14} className="inline"/></span>, delay: 900,  showTyping: false },
  { id: 8,  side: 'recruiter', text: <span className="flex items-center gap-1.5 flex-wrap">Solid stack <Trophy size={14} className="inline"/> Any team collaboration experience?</span>, delay: 2200, showTyping: true  },
  { id: 9,  side: 'me',        text: <span className="flex items-center gap-1.5 flex-wrap">Definitely — agile teams, git workflows, PR reviews <ClipboardList size={14} className="inline"/></span>, delay: 1800, showTyping: true },
  { id: 10, side: 'recruiter', text: "What kind of projects excite you the most?", delay: 2000, showTyping: true  },
  { id: 11, side: 'me',        text: <span className="flex items-center gap-1.5 flex-wrap">Products that blend solid engineering with great design <Palette size={14} className="inline"/></span>, delay: 2000, showTyping: true },
  { id: 12, side: 'recruiter', text: "That's exactly what we're looking for! Can I see your CV?", delay: 2200, showTyping: true  },
  { id: 13, side: 'me',        text: <span className="flex items-center gap-1.5 flex-wrap">Of course! Check out the Projects tab here <Hand size={14} className="inline"/></span>, delay: 1800, showTyping: true  },
  { id: 14, side: 'me',        text: <span className="flex items-center gap-1.5 flex-wrap">Or let's connect on LinkedIn — link's in Profile <Link size={14} className="inline"/></span>, delay: 800,  showTyping: false },
  { id: 15, side: 'recruiter', text: <span className="flex items-center gap-1.5 flex-wrap">Perfect. I'll reach out via email. <Users size={14} className="inline"/></span>, delay: 2200, showTyping: true  },
  { id: 16, side: 'me',        text: <span className="flex items-center gap-1.5 flex-wrap">Same here! Talk soon <Sparkles size={14} className="inline"/></span>, delay: 1500, showTyping: true  },
];

const TYPING_DURATION = 1400; // ms typing bubble visible before message appears

// ─── Component ────────────────────────────────────────────────────────────────
export default function MobileMessages() {
  const { isDarkMode } = useOSStore();
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping]   = useState<Side | null>(null);
  const [pitchText, setPitchText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Colors
  const pageBg    = cn('transition-colors duration-500', isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]');
  const recBubble = cn('transition-all duration-500', isDarkMode ? 'bg-[#2c2c2e] text-white' : 'bg-white text-zinc-900');
  const meBubble  = 'bg-blue-500 text-white';
  const subColor  = cn('transition-colors duration-500', isDarkMode ? 'text-white/35' : 'text-zinc-400');
  const headerBorder = cn('transition-colors duration-500', isDarkMode ? 'border-white/8' : 'border-black/8');

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visible, typing]);

  // Sequential reveal with typing indicators
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let elapsed = 0;

    CONVERSATION.forEach((msg) => {
      const showAt = elapsed + msg.delay;

      if (msg.showTyping) {
        // Show typing indicator
        timeout = setTimeout(() => {
          setTyping(msg.side);
        }, showAt);
        // Hide typing + show message
        setTimeout(() => {
          setTyping(null);
          setVisible((prev) => [...prev, msg.id]);
        }, showAt + TYPING_DURATION);
        elapsed = showAt + TYPING_DURATION;
      } else {
        // Fast follow-up — no typing bubble, just delay
        setTimeout(() => {
          setVisible((prev) => [...prev, msg.id]);
        }, showAt);
        elapsed = showAt;
      }
    });

    return () => clearTimeout(timeout);
  }, []);

  // Format a fake timestamp for the first message of each "session"
  const now = new Date();
  const timeLabel = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const isFinished = visible.includes(CONVERSATION[CONVERSATION.length - 1].id) && !typing;

  const handleSendPitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchText.trim()) return;
    const phone = "6283837534805";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(pitchText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={cn('w-full h-full flex flex-col relative', pageBg)}>

      {/* Recruiter info header */}
      <div className={cn('flex flex-col items-center pt-6 pb-4 border-b', headerBorder)}>
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg mb-2">
          <UserRound size={28} />
        </div>
        <p className={cn('text-[13px] font-black', isDarkMode ? 'text-white' : 'text-zinc-900')}>Sarah · Recruiter</p>
        <p className={cn('text-[11px] mt-0.5', subColor)}>Tech Talent @ StartupXYZ</p>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 no-scrollbar">

        {/* Timestamp header */}
        <p className={cn('text-center text-[10px] font-semibold mb-4', subColor)}>Today {timeLabel}</p>

        {CONVERSATION.map((msg) => {
          const isVisible = visible.includes(msg.id);
          const isMe = msg.side === 'me';
          if (!isVisible) return null;

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              className={cn('flex', isMe ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[75%] px-3.5 py-2 rounded-[18px] text-[13px] leading-relaxed font-medium',
                  isMe
                    ? cn(meBubble, 'rounded-br-[5px]')
                    : cn(recBubble, 'rounded-bl-[5px] shadow-sm')
                )}
              >
                {msg.text}
              </div>
            </motion.div>
          );
        })}

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={cn('flex', typing === 'me' ? 'justify-end' : 'justify-start')}
            >
              <div className={cn(
                'px-4 py-3 rounded-[18px] flex items-center gap-1',
                typing === 'me'
                  ? cn(meBubble, 'rounded-br-[5px]')
                  : cn(recBubble, 'rounded-bl-[5px] shadow-sm')
              )}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={cn('w-[6px] h-[6px] rounded-full', typing === 'me' ? 'bg-white/70' : isDarkMode ? 'bg-white/50' : 'bg-zinc-400')}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delivered receipt — only show after last message visible */}
        {visible.includes(CONVERSATION[CONVERSATION.length - 1].id) && !typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end pr-1 mt-1"
          >
            <span className={cn('text-[10px] flex items-center gap-1 font-semibold', subColor)}>
              <CheckCheck size={12} className="text-blue-500" />
              Read
            </span>
          </motion.div>
        )}

        {/* Quick Pitch Form */}
        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.8, damping: 25, stiffness: 200 }}
              className={cn(
                "p-2.5 rounded-full border shadow-sm transition-all duration-500 w-full mt-6 mb-2",
                isDarkMode ? "bg-[#1a1a1a]/80 border-white/10" : "bg-white/80 border-black/10"
              )}
            >
              <form 
                onSubmit={(e) => {
                  triggerHaptic();
                  handleSendPitch(e);
                }} 
                className="flex items-center gap-2 pl-3"
              >
                <input
                  type="text"
                  value={pitchText}
                  onChange={(e) => setPitchText(e.target.value)}
                  placeholder="Let's build something... (WhatsApp)"
                  className={cn(
                    "flex-1 bg-transparent border-none outline-none text-[16px] font-medium h-10 w-full min-w-0 transition-colors",
                    isDarkMode ? "text-white placeholder:text-white/40" : "text-zinc-900 placeholder:text-zinc-400"
                  )}
                />
                <button
                  type="submit"
                  disabled={!pitchText.trim()}
                  className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:scale-95 transition-all active:scale-90 shadow-md"
                >
                  <Send size={15} className="-ml-0.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} className="h-32" />
      </div>



    </div>
  );
}
