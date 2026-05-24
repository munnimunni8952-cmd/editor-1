import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const menuItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.05 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

const MobileMenuLink = ({ href, onClick, children, index }: { href: string; onClick: () => void; children: React.ReactNode; index: number }) => (
  <motion.a
    href={href}
    onClick={onClick}
    custom={index}
    variants={menuItemVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="group relative flex items-center px-5 py-4 rounded-2xl text-xl font-display font-medium text-[#A1A1AA] transition-all duration-300 hover:text-[#FFFFFF] hover:bg-white/[0.04] hover:translate-x-1"
  >
    <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/10 blur-xl transition-all duration-300 rounded-2xl -z-10 pointer-events-none" />
    {children}
  </motion.a>
);

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -100 }}
        animate={{ 
          opacity: isScrolled ? 1 : 0, 
          y: isScrolled ? 0 : -100 
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/80 backdrop-blur-md border-b border-cyan-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      >
        <a href="#" className="flex items-center gap-3 group capitalize">
          <img 
            src="https://i.ibb.co/xKcXKtdx/image.png" 
            alt="Best Video Editing Agency in Jaipur Rajasthan Logo" 
            className="h-10 w-auto object-contain animate-float-logo logo-glow"
          />
          <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-cyan-500 transition-all duration-300">
            Studio
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-sky-400 hover:shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all capitalize">Home</a>
          <a href="#services" className="hover:text-sky-400 hover:shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all capitalize">Services</a>
          <a href="#work" className="hover:text-sky-400 hover:shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all capitalize">Portfolio</a>
          <a href="#team" className="hover:text-sky-400 hover:shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all capitalize">Team</a>
          <a href="#reviews" className="hover:text-sky-400 hover:shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all capitalize">Testimonials</a>
          <a href="#pricing" className="hover:text-sky-400 hover:shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all capitalize">Pricing</a>
          <a href="tel:+916377033649" className="hover:text-sky-400 hover:shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all capitalize">Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="tel:+916377033649"
            className="text-sm font-bold capitalize tracking-wider px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-sky-500 transition-all duration-300 text-white hover:-translate-y-[3px] hover:shadow-[0_0_20px_rgba(56,189,248,0.18)]"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white p-2 focus:outline-none capitalize"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60]"
              style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
              onClick={toggleMenu}
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] flex flex-col rounded-l-[2rem] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] border-l z-[70] overflow-hidden"
              style={{ 
                background: 'rgba(12,11,15,0.92)', 
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(255,255,255,0.08)'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                <span className="font-display font-medium text-xs tracking-widest text-[#A1A1AA] capitalize">Menu</span>
                <button 
                  onClick={toggleMenu}
                  className="text-[#A1A1AA] hover:text-white p-2 rounded-full hover:bg-white/[0.04] transition-colors focus:outline-none capitalize"
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1 p-4 overflow-y-auto">
                <MobileMenuLink href="#" onClick={toggleMenu} index={1}>Home</MobileMenuLink>
                <MobileMenuLink href="#services" onClick={toggleMenu} index={2}>Services</MobileMenuLink>
                <MobileMenuLink href="#work" onClick={toggleMenu} index={3}>Portfolio</MobileMenuLink>
                <MobileMenuLink href="#team" onClick={toggleMenu} index={4}>Team</MobileMenuLink>
                <MobileMenuLink href="#reviews" onClick={toggleMenu} index={5}>Testimonials</MobileMenuLink>
                <MobileMenuLink href="#pricing" onClick={toggleMenu} index={6}>Pricing</MobileMenuLink>
                <MobileMenuLink href="tel:+916377033649" onClick={toggleMenu} index={7}>Contact</MobileMenuLink>
              </div>

              {/* Footer CTA */}
              <div className="p-6 mt-auto border-t flex flex-col gap-3" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                <a 
                  href="tel:+916377033649"
                  onClick={toggleMenu}
                  className="block w-full text-center text-sm font-bold capitalize tracking-wider px-8 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/10 hover:border-sky-500 transition-all duration-300 text-white hover:-translate-y-[3px] hover:shadow-[0_0_20px_rgba(56,189,248,0.18)]"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
