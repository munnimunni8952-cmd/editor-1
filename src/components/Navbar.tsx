import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -100 }}
      animate={{ 
        opacity: isScrolled ? 1 : 0, 
        y: isScrolled ? 0 : -100 
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/80 backdrop-blur-md border-b border-cyan-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
    >
      <a href="#" className="flex items-center gap-3 group">
        <img 
          src="https://i.ibb.co/xKcXKtdx/image.png" 
          alt="Brand Logo" 
          className="h-10 w-auto object-contain animate-float-logo logo-glow"
        />
        <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-500 transition-all duration-300">
          Studio
        </span>
      </a>

      <div className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium text-gray-300">
        <a href="#work" className="hover:text-cyan-400 transition-colors">Work</a>
        <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
        <a href="#pricing" className="hover:text-pink-400 transition-colors">Pricing</a>
        <a href="#socials" className="hover:text-cyan-400 transition-colors">Socials</a>
      </div>

      <a 
        href="#contact"
        className="text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-cyan-400 transition-all duration-300 text-white"
      >
        Contact
      </a>
    </motion.nav>
  );
}
