import { useState } from "react";
import { motion } from "motion/react";
import { Copy, CheckCircle, Github, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import MagneticButton from "../components/MagneticButton";
import ScrollReveal from "../components/ScrollReveal";

export default function Contact() {
  const [isCopied, setIsCopied] = useState(false);
  const email = "hello@ido-dev.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    toast.success("Email copied to clipboard!", {
      style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    // PERUBAHAN: min-h-[100dvh] untuk HP agar bisa di-scroll jika kepanjangan, py-24 agar ada ruang napas
    <section id="contact" className="relative w-full min-h-[100dvh] md:h-[100dvh] flex items-center justify-center overflow-hidden bg-[var(--color-bg-dark)] py-24 md:py-0">
      <ScrollReveal>
      <div className="w-full max-w-4xl px-6 relative z-10 flex flex-col items-center justify-center h-full">
        
        {/* PERUBAHAN: mb-6 untuk HP, teks menjadi text-3xl di HP dan 5xl di Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tighter">
            Let's build something <span className="text-[var(--color-neon)]">together.</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Tertarik untuk berkolaborasi? Jangan ragu untuk menyapa.
          </p>
        </motion.div>

        {/* PERUBAHAN: gap dikurangi di HP (gap-6), padding dikurangi di HP (p-6) */}
        <div className="w-full grid md:grid-cols-2 gap-6 md:gap-8 bg-[#111]/50 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between space-y-6"
          >
            <div>
              <h3 className="text-base md:text-lg font-medium text-white mb-2">Contact Details</h3>
              <button 
                onClick={handleCopyEmail}
                className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5"
              >
                {isCopied ? <CheckCircle className="w-4 h-4 text-[var(--color-neon)]" /> : <Copy className="w-4 h-4" />}
                <span className="font-mono text-sm">{email}</span>
              </button>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-medium text-white mb-3">Socials</h3>
              <div className="flex space-x-3">
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[var(--color-neon)] hover:border-[var(--color-neon)] transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[var(--color-neon)] outline-none" placeholder="Name" />
              <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[var(--color-neon)] outline-none" placeholder="Email" />
              <textarea rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[var(--color-neon)] outline-none resize-none" placeholder="Message..." />
              <MagneticButton>
                <button className="w-full py-3 px-8 bg-white text-black text-sm font-bold rounded-lg hover:bg-[var(--color-neon)] transition-colors mt-2 cursor-pointer">
                  Send
                </button>
              </MagneticButton>
            </form>
          </motion.div>

        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}