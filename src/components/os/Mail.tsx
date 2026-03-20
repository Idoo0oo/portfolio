import { useState, useRef } from 'react';
import { 
  Send, 
  Trash2, 
  Paperclip, 
  Inbox, 
  SendHorizontal, 
  FileEdit, 
  Archive, 
  Loader2,
  Reply,
  SquarePen,
  Github,
  Linkedin,
  Instagram
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { useSound } from "../../hooks/useSound";

const socials = [
  { Icon: Github, href: "https://github.com/Idoo0oo", label: "GitHub" },
  { Icon: Linkedin, href: "https://linkedin.com/in/muhammad-ditto", label: "LinkedIn" },
  { Icon: Instagram, href: "https://instagram.com/mhmmdittoo._", label: "Instagram" },
];

export default function Mail() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { playSound } = useSound();
  const formRef = useRef<HTMLFormElement>(null);
  const toEmail = "dittosanzz05@gmail.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body = encodeURIComponent(`From: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:${toEmail}?subject=${subject}&body=${body}`, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      playSound('sent', 0.5);
      toast.success("Email client opened!", {
        description: "Complete sending in your email app.",
        style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      });
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 800);
  };

  return (
    <div className="flex h-full w-full bg-[#0a0a0a]/95 text-white select-none overflow-hidden rounded-b-xl">
      {/* 1. Mailbox Sidebar */}
      <aside className="w-48 h-full bg-[#0d0d0d]/80 backdrop-blur-xl border-r border-white/5 p-3 flex flex-col gap-6">
        <div>
          <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-wider px-2 mb-2">Favorites</h3>
          <nav className="space-y-0.5">
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] bg-white/10 text-white transition-colors group">
              <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300">
                <Inbox size={16} />
                <span className="text-white">Inbox</span>
              </div>
              <span className="text-white/30 text-[11px]">0</span>
            </button>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] text-white/70 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                <SendHorizontal size={16} />
                <span className="text-white/70 group-hover:text-white">Sent</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] text-white/70 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                <FileEdit size={16} />
                <span className="text-white/70 group-hover:text-white">Drafts</span>
              </div>
              <span className="text-white/30 text-[11px]">1</span>
            </button>
            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-[13px] text-white/70 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                <Archive size={16} />
                <span className="text-white/70 group-hover:text-white">Archive</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Social Links */}
        <div className="mt-auto">
          <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-wider px-2 mb-3">Find Me On</h3>
          <div className="flex gap-2 px-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all hover:bg-white/5"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* 2. Main Area (Composer View) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#050505]">
        {/* Toolbar */}
        <header className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-white/[0.02]">
          <div className="flex items-center gap-6">
             <div className="flex gap-1">
               <button className="p-1.5 hover:bg-white/5 rounded text-white/40"><Trash2 size={18} /></button>
               <button className="p-1.5 hover:bg-white/5 rounded text-white/40"><Archive size={18} /></button>
             </div>
             <div className="w-px h-6 bg-white/5" />
             <div className="flex gap-1">
                <button className="p-1.5 hover:bg-white/5 rounded text-white/40"><Reply size={18} /></button>
                <button className="p-1.5 hover:bg-white/5 rounded text-white/40"><SquarePen size={18} /></button>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
               form="contact-form"
               disabled={isSubmitting || isSuccess}
               className={cn(
                 "flex items-center gap-2 px-4 py-1.5 rounded-md text-[13px] font-bold transition-all",
                 isSuccess 
                   ? "bg-green-600/20 text-green-400" 
                   : "bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
               )}
             >
               {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
               {isSuccess ? "Sent!" : "Send"}
             </button>
          </div>
        </header>

        {/* Composer Form */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <form ref={formRef} id="contact-form" onSubmit={handleSubmit} className="flex-1 flex flex-col">
             {/* Header Fields */}
             <div className="px-6 py-2 pb-0 space-y-px">
                <div className="flex items-center gap-3 py-2 border-b border-white/5">
                   <span className="text-[12px] text-white/30 font-medium w-12 shrink-0">To:</span>
                   <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/10 rounded-full">
                      <div className="w-4 h-4 rounded-full bg-[var(--color-neon)]/20 flex items-center justify-center text-[10px] text-[var(--color-neon)] font-bold">I</div>
                      <span className="text-[12px] text-white/90">Ido · {toEmail}</span>
                   </div>
                </div>
                <div className="flex items-center gap-3 py-2 border-b border-white/5">
                   <span className="text-[12px] text-white/30 font-medium w-12 shrink-0">From:</span>
                   <input 
                     type="email" 
                     placeholder="Your email address" 
                     required
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     className="flex-1 bg-transparent text-[12px] text-white/90 outline-none focus:placeholder-transparent placeholder:text-white/20"
                   />
                </div>
                <div className="flex items-center gap-3 py-2 border-b border-white/5">
                   <span className="text-[12px] text-white/30 font-medium w-12 shrink-0">Subject:</span>
                   <input 
                     type="text" 
                     placeholder="New collaboration request" 
                     required
                     value={formData.subject}
                     onChange={(e) => setFormData({...formData, subject: e.target.value})}
                     className="flex-1 bg-transparent text-[12px] text-white/90 font-medium outline-none focus:placeholder-transparent placeholder:text-white/20"
                   />
                </div>
             </div>

             {/* Message Area */}
             <div className="flex-1 relative">
                <textarea 
                  placeholder="Hey Ido, I'd like to talk about..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full h-full bg-transparent px-6 py-4 text-[13px] text-white/80 outline-none resize-none custom-scrollbar leading-relaxed"
                />
                
                <div className="absolute bottom-4 left-6 flex items-center gap-2 text-[11px] text-white/20 italic">
                   <Paperclip size={12} />
                   <span>Drop files here to attach (optional)</span>
                </div>
             </div>
          </form>
        </div>

        {/* Footer Info */}
        <footer className="h-8 border-t border-white/5 bg-white/[0.02] flex items-center justify-center px-4">
           <span className="text-[10px] text-white/30 font-medium tracking-wide">SENT VIA SECURE PORTFOLIO PROTOCOL (SPP)</span>
        </footer>
      </div>
    </div>
  );
}
