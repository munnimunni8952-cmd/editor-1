import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fast cinematic reveal (1.2s - 1.8s)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0c0b0f] flex items-center justify-center overflow-hidden"
        >
          {/* Background zoom blur effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[#0c0b0f]"
            style={{
              boxShadow: "inset 0 0 100px 50px rgba(0,0,0,0.8)"
            }}
          />
          
          {/* Purple-white glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full blur-[100px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Fast Line Reveal */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 160, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
              className="h-[1px] bg-white/40 mb-6"
              style={{
                boxShadow: "0 0 30px rgba(167,139,250,0.18), 0 0 80px rgba(255,255,255,0.05)"
              }}
            />

            {/* Main Hero Text Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden py-4 px-2"
              style={{ willChange: "transform, filter, opacity" }}
            >
              <h1 className="text-white font-display text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[0.3em] text-center"
                  style={{
                    textShadow: "0 0 30px rgba(255,255,255,0.3)"
                  }}>
                Trimclipedits
              </h1>
              {/* Luxury Shine Sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                  transform: "skewX(-20deg)"
                }}
                initial={{ left: "-100%" }}
                animate={{ left: "200%" }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Glowing vertical light streak flash effect spanning vertically via a narrow line */}
            <motion.div 
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 0, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[150vh] bg-white glow-line pointer-events-none"
              style={{
                boxShadow: "0 0 20px #fff, 0 0 40px #a78bfa"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
