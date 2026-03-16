import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store/useAppStore';

const loadingSteps = [
  "Initializing developer environment...",
  "Loading projects...",
  "Rendering 3D interface...",
  "System ready."
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const setLoading = useAppStore((state) => state.setLoading);

  useEffect(() => {
    // Simulasi proses loading
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 1000); // Selesai loading
        return prev;
      });
    }, 800); // Ganti teks setiap 800ms

    return () => clearInterval(interval);
  }, [setLoading]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] font-mono text-sm sm:text-base"
      exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full max-w-md p-6 flex flex-col items-start space-y-4">
        <motion.div 
          className="w-full h-1 bg-gray-800 rounded overflow-hidden mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="h-full bg-[var(--color-neon)]"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {loadingSteps.slice(0, currentStep + 1).map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <span className="text-[var(--color-neon)]">{'>'}</span>
            <span className="text-gray-300">{step}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}