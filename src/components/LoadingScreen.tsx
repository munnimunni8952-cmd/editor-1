import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8 animate-float-logo logo-glow"
            >
              <img 
                src="https://i.ibb.co/xKcXKtdx/image.png" 
                alt="Brand Logo" 
                className="w-24 h-auto object-contain"
              />
            </motion.div>

            {/* Cinematic Loader */}
            <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden mb-6">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-pink-500"
                initial={{ width: 0, x: 0 }}
                animate={{ 
                  width: ["0%", "50%", "100%"],
                  x: ["0%", "50%", "0%"]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <motion.h1 
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 1.5 }}
              className="text-white font-display uppercase text-sm font-semibold tracking-[0.2em]"
            >
              Loading Experience
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
