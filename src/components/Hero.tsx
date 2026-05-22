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
    <span className="inline-flex items-center justify-center h-[1.2em] min-w-[280px] md:min-w-[600px]">
      <span className="bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">
        {WORDS[index].substring(0, subIndex)}
      </span>
      <span 
        className={`inline-block w-[4px] h-[0.9em] md:w-[6px] ml-1 md:ml-2 md:h-[0.8em] bg-fuchsia-500 rounded-full transition-opacity duration-100 ${
          blink ? 'opacity-100' : 'opacity-0'
        } drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]`} 
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
        {/* Cinematic glow overlays - hidden on mobile for performance */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[40vw] md:h-[40vw] rounded-full bg-fuchsia-600/10 blur-[60px] mix-blend-screen" />
        <div className="hidden md:block absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 md:w-[30vw] md:h-[30vw] rounded-full bg-fuchsia-600/10 blur-[60px] mix-blend-screen" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">

        <motion.h1 
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[1.1] md:leading-[1.1] text-white flex flex-col items-center justify-center text-center w-full min-h-[140px] md:min-h-[220px] mb-6"
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
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group/btn">
              <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-400 to-purple-500 rounded-full blur-md opacity-40 animate-pulse" />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('open-work-modal'));
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 w-full"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-fuchsia-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Discuss Your Project</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-300" />
              </button>
            </div>

            <a
              href="#work"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 glass-card text-white font-semibold rounded-full transition-all hover:bg-white/10"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Play className="w-4 h-4" />
              </div>
              Explore Portfolio
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
