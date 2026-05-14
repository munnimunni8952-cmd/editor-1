import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

const WORDS = [
  "CINEMATIC VIDEOS",
  "VIRAL REELS",
  "SOCIAL CONTENT",
  "MOTION GRAPHICS"
];

function TypewriterEffect() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  useEffect(() => {
    if (subIndex === WORDS[index].length + 1 && !reverse) {
      const wait = setTimeout(() => {
        setReverse(true);
      }, 2000);
      return () => clearTimeout(wait);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % WORDS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, Math.random() * 150));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="inline-flex items-center justify-center h-[1.2em] min-w-[300px] md:min-w-[600px]">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
        {WORDS[index].substring(0, subIndex)}
      </span>
      <span 
        className={`inline-block w-[4px] h-[0.9em] md:w-[6px] ml-1 md:ml-2 md:h-[0.8em] bg-pink-500 rounded-full transition-opacity duration-100 ${
          blink ? 'opacity-100' : 'opacity-0'
        } drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]`} 
      />
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y, scale }}
          className="absolute inset-[-10%] w-[120%] h-[120%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[url('https://i.ibb.co/XxKqjQ9J/Gemini-Generated-Image-dluq34dluq34dluq.png')] bg-cover bg-center md:bg-top opacity-[0.55] mix-blend-screen" />
        </motion.div>
        
        {/* Dark Overlays for text visibility and smooth transition to next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Cinematic glow overlays - hidden on mobile for performance */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[40vw] md:h-[40vw] rounded-full bg-blue-600/30 blur-[80px] mix-blend-screen" />
        <div className="hidden md:block absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 md:w-[30vw] md:h-[30vw] rounded-full bg-pink-600/20 blur-[80px] mix-blend-screen" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium tracking-wide text-cyan-400"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          AVAILABLE FOR FREELANCE WORK
        </motion.div>

        <motion.h1 
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[1.1] md:leading-[1.1] text-white flex flex-col items-center justify-center text-center w-full min-h-[160px] md:min-h-[220px] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <span className="mb-2 block">Crafting</span>
          <TypewriterEffect />
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Professional Video Editor & Digital Creator bringing stories to life with industry-leading post-production techniques, vibrant color grading, and captivating sound design.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="relative group/btn">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full blur-md opacity-40 animate-pulse" />
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 block"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Hire Me</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-300" />
            </a>
          </div>

          <a
            href="#work"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 glass-card text-white font-semibold rounded-full transition-all hover:bg-white/10"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Play className="w-4 h-4" />
            </div>
            View Showreel
          </a>
        </motion.div>
      </div>
    </section>
  );
}
