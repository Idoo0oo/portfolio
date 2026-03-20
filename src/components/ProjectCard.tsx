import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    image: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Nilai pergerakan mouse (X dan Y)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Membuat gerakan lebih mulus (spring physics)
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Mengubah posisi mouse menjadi derajat kemiringan (rotasi 3D)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Fungsi yang dipanggil saat mouse bergerak di atas kartu
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Menghitung posisi kursor relatif terhadap tengah kartu (nilai antara -0.5 sampai 0.5)
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  // Fungsi saat mouse keluar dari kartu (kembali ke posisi semula)
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Penting untuk efek 3D
      }}
      className="relative w-full max-w-sm h-[450px] rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden cursor-pointer group flex-shrink-0"
    >
      {/* Gambar Proyek dengan efek Parallax Zoom saat di-hover */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-80"
        style={{ backgroundImage: `url(${project.image})`, transform: "translateZ(-50px)" }}
      />
      
      {/* Overlay Gradien Gelap agar teks terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Konten Teks */}
      <div 
        className="absolute inset-0 p-8 flex flex-col justify-end"
        style={{ transform: "translateZ(50px)" }} // Membuat teks seolah melayang di atas gambar
      >
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-neon)] transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        {/* Label Teknologi */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span key={i} className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider text-[var(--color-neon)] bg-white/10 rounded-md border border-white/5">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Efek Glow tambahan saat di-hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-[var(--color-neon)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
    </motion.div>
  );
}