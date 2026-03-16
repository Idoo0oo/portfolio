import { type ReactNode } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../../store/useAppStore";

interface WindowProps {
  title: string;
  children: ReactNode;
  defaultPosition?: { x: number; y: number };
}

export default function Window({ title, children, defaultPosition = { x: 0, y: 0 } }: WindowProps) {
  const toggleDevMode = useAppStore((state) => state.toggleDevMode);

  return (
    <motion.div
      drag
      dragMomentum={false} // Membuat pergerakan jendela lebih presisi (tidak meluncur)
      initial={{ opacity: 0, scale: 0.9, ...defaultPosition }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="absolute flex flex-col w-[90vw] max-w-2xl bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
      style={{ touchAction: "none" }} // Mencegah scroll layar saat men-drag di HP
    >
      {/* Header Jendela (Area untuk drag) */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 cursor-grab active:cursor-grabbing">
        <div className="flex space-x-2">
          {/* Tombol Merah: Keluar dari Dev Mode */}
          <button 
            onClick={toggleDevMode}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
            title="Close Dev Mode"
          />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-xs text-gray-400 font-mono tracking-wider select-none">
          {title}
        </div>
        <div className="w-10" /* Spacer agar judul di tengah */ />
      </div>

      {/* Konten Jendela */}
      <div className="p-4 bg-transparent max-h-[60vh] overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
}