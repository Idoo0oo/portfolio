import { motion } from "motion/react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div 
      // Animasinya kita ubah menjadi fade & scale halus agar cocok untuk posisi atas (Desktop) maupun bawah (Mobile)
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      // PERUBAHAN: Di HP letaknya di bawah (bottom-6), di Desktop pindah ke atas (md:bottom-auto md:top-6). 'hidden md:block' dihapus.
      className="fixed bottom-6 md:bottom-auto md:top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] md:w-auto flex justify-center pointer-events-none" 
    >
      {/* pointer-events-auto mengembalikan fungsi klik pada navbar meskipun pembungkusnya none */}
      <nav className="flex items-center justify-between md:justify-center w-full max-w-[320px] md:w-auto space-x-1 md:space-x-2 px-4 py-2 bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleScroll(e, item.href)}
            className="px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            {item.name}
          </a>
        ))}
      </nav>
    </motion.div>
  );
}