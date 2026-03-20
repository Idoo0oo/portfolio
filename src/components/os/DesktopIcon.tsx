import React from 'react';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';

interface DesktopIconProps {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export default function DesktopIcon({ name, icon, onClick, className }: DesktopIconProps) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer w-20 group select-none ${className}`}
    >
      <div className="relative pointer-events-none transition-transform group-hover:scale-105 duration-300">
        {icon || (
          <Folder size={48} className="text-blue-500/90 fill-blue-500/20 drop-shadow-lg" />
        )}
      </div>
      <span className="text-[11px] text-white font-medium text-center drop-shadow-md px-1 rounded-sm line-clamp-2 leading-tight group-hover:bg-blue-500/40 transition-colors">
        {name}
      </span>
    </motion.div>
  );
}
