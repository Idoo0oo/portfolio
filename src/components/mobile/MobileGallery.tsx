import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../core/store/useOSStore';
import { cn, triggerHaptic } from '../../core/lib/utils';
import { X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

// Hardcoded images from the public folder based on your prompt
const GALLERY_IMAGES = [
  { id: 1, src: '/lanyard-card.webp', alt: 'Lanyard Card Identity', colSpan: false },
  { id: 2, src: '/fianeruuu.png', alt: 'Pixel Art Illustration', colSpan: false },
  { id: 3, src: '/cover-music.jpg', alt: 'Music Album Cover', colSpan: true },
  { id: 4, src: '/gemilang.jfif', alt: 'Gemilang Event Shot', colSpan: false },
  { id: 5, src: '/lalubiru.jfif', alt: 'Lalu Biru Photo', colSpan: false },
];

interface MobileGalleryProps {
  onClose: () => void;
}

export default function MobileGallery({ onClose }: MobileGalleryProps) {
  const { isDarkMode } = useOSStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={cn(
        "fixed inset-0 z-[100] w-full h-[100dvh] overflow-hidden flex flex-col",
        isDarkMode ? "bg-[#0a0a0a]" : "bg-zinc-100"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between px-6 pt-12 pb-4 backdrop-blur-md z-10 sticky top-0 border-b",
        isDarkMode ? "bg-black/60 border-white/10" : "bg-white/60 border-black/5"
      )}>
        <h2 className={cn("text-xl font-black tracking-tight", isDarkMode ? "text-white" : "text-zinc-900")}>
          Gallery 📸
        </h2>
        <button
          onClick={() => {
            triggerHaptic();
            onClose();
          }}
          className={cn(
            "p-2.5 rounded-full backdrop-blur-md active:scale-90 transition-transform",
            isDarkMode ? "bg-white/10 text-white" : "bg-black/5 text-zinc-900"
          )}
        >
          <X size={18} />
        </button>
      </div>

      {/* Masonry Grid Scrolling Area */}
      <div className="flex-1 overflow-y-auto w-full p-4 no-scrollbar pb-32">
        <div className="grid grid-cols-2 gap-3 auto-rows-[160px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              onClick={() => {
                triggerHaptic();
                setSelectedImg(img.src);
              }}
              className={cn(
                "relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm active:scale-95 transition-transform",
                img.colSpan ? "col-span-2 row-span-1" : "col-span-1 row-span-1",
                isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
              )}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="text-white" size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImg}
              alt="Expanded Lightbox"
              className="max-w-full max-h-[85vh] object-contain rounded-lg drop-shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close when tapping image 
            />
            
            <button 
              onClick={() => {
                triggerHaptic();
                setSelectedImg(null);
              }}
              className="absolute top-12 right-6 p-3 bg-white/10 rounded-full text-white active:scale-90 transition-transform"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
