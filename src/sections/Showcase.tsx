import { motion } from "motion/react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../lib/data";
import ScrollReveal from "../components/ScrollReveal";

export default function Showcase() {
  return (
    // h-[100dvh] memaksa section ini persis setinggi layar. snap-center membuatnya terkunci di tengah.
    <section id="work" className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg-dark)] snap-center">
      
      {/* Kontainer Dalam: Mengatur jarak antar elemen agar rapi */}
      <ScrollReveal>
      <div className="w-full max-w-7xl px-6 flex flex-col items-center justify-center h-full">
        
        {/* Judul Section */}
        <div className="w-full text-center md:text-left mb-10 z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Featured <span className="text-[var(--color-neon)]">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 mt-2 max-w-xl font-mono text-sm mx-auto md:mx-0"
          >
            // Hover over the cards to interact.
          </motion.p>
        </div>

        {/* Kontainer Kartu Proyek */}
        <div className="w-full z-10">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide md:flex-wrap md:justify-center md:overflow-visible">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="shrink-0 w-[85vw] sm:w-[320px] lg:w-[350px]"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </ScrollReveal>
      
      {/* Elemen Dekorasi Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-neon)]/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}