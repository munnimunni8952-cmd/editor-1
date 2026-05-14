import { motion } from 'motion/react';

const INSTAGRAM_REELS = [
  "https://www.instagram.com/reel/DSHA4iNjNa4/embed",
  "https://www.instagram.com/reel/DShEX-UEx2y/embed",
  "https://www.instagram.com/reel/DS7vx8AE-Wa/embed",
  "https://www.instagram.com/reel/DTzm8shk5yG/embed",
];

export default function MyWork() {
  return (
    <section id="work" className="py-24 relative overflow-hidden">
      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
            My work <span className="text-cyan-400">Reels</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg font-light">
            A collection of my best video projects, showcasing dynamic editing, color grading, and visual storytelling.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full pb-8 overflow-hidden">
        {/* Infinite Scroll Container */}
        <div className="flex w-max group">
          <div className="flex animate-marquee gap-6 px-3 group-hover:[animation-play-state:paused]">
            {[...INSTAGRAM_REELS, ...INSTAGRAM_REELS].map((reelSrc, index) => (
              <motion.div
                key={`${index}`}
                whileHover={{ scale: 1.05 }}
                className="relative w-[280px] sm:w-[320px] h-[500px] sm:h-[570px] rounded-3xl overflow-hidden shrink-0 transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(0,243,255,0.4)] glass-card border-none"
              >
                <iframe 
                  src={reelSrc}
                  className="w-full h-full border-none"
                  scrolling="no"
                  allowtransparency="true"
                  loading="lazy"
                  title={`Instagram Reel ${index}`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Edge Gradients for smooth fade */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
