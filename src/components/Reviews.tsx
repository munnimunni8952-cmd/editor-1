import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const REVIEWS = [
  { id: 1, name: "Sarah Jenkins", role: "Content Creator", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", text: "Incredible eye for detail. The edits brought my vlog to life in a way I didn't think was possible!" },
  { id: 2, name: "Marcus Thorne", role: "Marketing Director", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop", text: "Fast turnaround and brilliant pacing. The commercial ad exceeded all our expectations." },
  { id: 3, name: "Elena Rivers", role: "Tech YouTuber", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop", text: "Masterful use of motion graphics. Helps my tech reviews stand out in a very crowded niche." },
  { id: 4, name: "David Chen", role: "Indie Filmmaker", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop", text: "The color grading alone is worth the price. Totally cinematic feel across the entire short film." },
  { id: 5, name: "Chloe Smith", role: "Fitness Influencer", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop", text: "My Instagram Reels have gone viral twice since we started working together. Highly recommend!" },
];

export default function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

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
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4">
              Client <span className="text-[#4DA3FF]">Reviews</span>
            </h2>
            <p className="text-gray-400 text-lg font-light">Don't just take my word for it.</p>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full border border-white/10 hover:border-[#4DA3FF]/50 hover:bg-[#4DA3FF]/10 transition-all text-white/70 hover:text-white"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 rounded-full border border-white/10 hover:border-[#4DA3FF]/50 hover:bg-[#4DA3FF]/10 transition-all text-white/70 hover:text-white"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative w-full max-w-[100vw] overflow-hidden px-6 md:px-12 group">
        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <div className="flex gap-6 pt-4 pb-12">
            {REVIEWS.map((review, index) => (
              <motion.div
                key={review.id}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex-[0_0_85%] sm:flex-[0_0_300px] md:flex-[0_0_400px] min-w-0 glass-card p-8 rounded-3xl relative transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(77,163,255,0.2)] hover:border-[#4DA3FF]/30 overflow-hidden"
              >
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4DA3FF]/0 via-transparent to-purple-500/0 opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#4DA3FF] rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity" />
                    <img src={review.image} alt={review.name} loading="lazy" className="w-14 h-14 rounded-full object-cover border border-[#4DA3FF]/20 relative z-10" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">{review.name}</h4>
                    <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#4DA3FF] to-[#6EE7FF]">{review.role}</p>
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
                      <Star className="w-4 h-4 fill-white text-white" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-white leading-relaxed italic relative z-10">"{review.text}"</p>
                
                {/* Quote decoration */}
                <div className="absolute -top-4 -right-4 text-9xl font-display text-white/[0.02] select-none pointer-events-none">"</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Edge Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
