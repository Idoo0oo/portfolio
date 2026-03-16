import { useState } from "react";
import { motion } from "motion/react";
import ScrollReveal from "../components/ScrollReveal";

export default function CaseStudy() {
  // State untuk mengatur panel akordion (expandable) yang sedang terbuka
  const [openChallenge, setOpenChallenge] = useState<number | null>(0);

  const challenges = [
    {
      title: "Real-time Data Synchronization",
      desc: "Menggunakan WebSockets dan Zustand untuk memastikan state sinkron di semua klien tanpa jeda, menangani ribuan event per detik dengan mulus.",
    },
    {
      title: "3D Rendering Performance",
      desc: "Mengoptimalkan kanvas WebGL dengan lazy loading tekstur, instanced mesh, dan membatasi rasio piksel agar tetap berjalan di 60fps pada perangkat mobile.",
    },
    {
      title: "Complex UI State Management",
      desc: "Memisahkan logika bisnis dari UI menggunakan custom hooks dan arsitektur atomic design untuk menjaga kode tetap rapi dan mudah di-scale.",
    }
  ];

  return (
    <section id="about" className="relative w-full h-[100dvh] flex items-center justify-center bg-black overflow-hidden snap-start">
      <ScrollReveal>
      <div className="w-full max-w-6xl px-6 relative z-10 flex flex-col md:flex-row gap-16">
        
        {/* Kolom Kiri: Cerita Proyek & Gambar */}
        <div className="flex-1 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[var(--color-neon)] font-mono text-sm tracking-widest uppercase mb-4">
              Featured Case Study
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Quantum E-Commerce
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Membangun platform e-commerce generasi berikutnya yang tidak hanya cepat, tetapi juga memberikan pengalaman sinematik 3D kepada pengguna saat melihat produk. 
              Fokus utama adalah menyeimbangkan visual yang memukau dengan performa tinggi.
            </p>
          </motion.div>

          {/* Gambar Arsitektur Sistem (Placeholder animasi/diagram) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-auto rounded-xl border border-white/10 overflow-hidden bg-[#111] p-4"
          >
            <div className="text-xs text-gray-500 font-mono mb-4 border-b border-white/10 pb-2">
              System Architecture Diagram
            </div>
            
          </motion.div>
        </div>

        {/* Kolom Kanan: Tantangan Teknis (Expandable Sections) */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">
              Key Technical Challenges
            </h4>

            <div className="space-y-4">
              {challenges.map((item, index) => (
                <div 
                  key={index} 
                  className={`border border-white/10 rounded-lg overflow-hidden transition-colors duration-300 ${openChallenge === index ? 'bg-white/5 border-white/20' : 'bg-transparent hover:bg-white/5'}`}
                >
                  {/* Tombol Header Akordion */}
                  <button
                    onClick={() => setOpenChallenge(openChallenge === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className={`font-medium transition-colors ${openChallenge === index ? 'text-[var(--color-neon)]' : 'text-gray-300'}`}>
                      {item.title}
                    </span>
                    <span className="text-gray-500 text-xl font-light">
                      {openChallenge === index ? '−' : '+'}
                    </span>
                  </button>

                  {/* Konten Akordion yang bisa meluas/menyusut */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: openChallenge === index ? "auto" : 0,
                      opacity: openChallenge === index ? 1 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4 mt-2">
                      {item.desc}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
      </ScrollReveal>

      {/* Efek Latar Belakang */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
    </section>
  );
}