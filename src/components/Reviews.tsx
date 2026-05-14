import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const REVIEWS = [
  { id: 1, name: "Sarah Jenkins", role: "Content Creator", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", text: "Incredible eye for detail. The edits brought my vlog to life in a way I didn't think was possible!" },
  { id: 2, name: "Marcus Thorne", role: "Marketing Director", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop", text: "Fast turnaround and brilliant pacing. The commercial ad exceeded all our expectations." },
  { id: 3, name: "Elena Rivers", role: "Tech YouTuber", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop", text: "Masterful use of motion graphics. Helps my tech reviews stand out in a very crowded niche." },
  { id: 4, name: "David Chen", role: "Indie Filmmaker", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop", text: "The color grading alone is worth the price. Totally cinematic feel across the entire short film." },
  { id: 5, name: "Chloe Smith", role: "Fitness Influencer", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop", text: "My Instagram Reels have gone viral twice since we started working together. Highly recommend!" },
];

export default function Reviews() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
            Client <span className="text-cyan-400">Reviews</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">Don't just take my word for it.</p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Infinite Scroll Container (Right to Left) */}
        <div className="flex w-max group">
          <div className="flex animate-marquee gap-6 px-3 group-hover:[animation-play-state:paused]" style={{ animationDuration: '35s' }}>
            {[...REVIEWS, ...REVIEWS].map((review, index) => (
              <motion.div
                key={`${index}`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="w-[300px] md:w-[400px] shrink-0 glass-card p-8 rounded-3xl relative transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(0,243,255,0.2)] hover:border-cyan-400/30 overflow-hidden"
              >
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity" />
                    <img src={review.image} alt={review.name} loading="lazy" className="w-14 h-14 rounded-full object-cover border border-cyan-400/20 relative z-10" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">{review.name}</h4>
                    <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{review.role}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-gray-300 leading-relaxed italic relative z-10">"{review.text}"</p>
                
                {/* Quote decoration */}
                <div className="absolute -top-4 -right-4 text-9xl font-display text-white/[0.02] select-none pointer-events-none">"</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Edge Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
