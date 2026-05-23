import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useCallback, useEffect, useState } from 'react';

const REVIEWS = [
  { 
    id: 1, 
    name: "Rohit Sharma", 
    role: "Content Creator", 
    image: "https://i.ibb.co/hJkkqKTN/image.png", 
    text: "Pehle meri reels itni professional nahi lagti thi, lekin Trimclipedits ke sath kaam karne ke baad pura content ka look change ho gaya. Editing ka flow aur quality dono bahut premium the. Audience response bhi pehle se kaafi better mila.",
    rating: 5
  },
  { 
    id: 2, 
    name: "Aman Verma", 
    role: "Brand Owner", 
    image: "https://i.ibb.co/N6MmcX6L/image.png", 
    text: "Mujhe exactly wahi editing style mila jo main chah raha tha. Team har choti detail ka dhyan rakhti hai aur final output bahut clean hota hai. Delivery bhi time par mili aur overall experience bahut smooth raha.",
    rating: 4.5
  },
  { 
    id: 3, 
    name: "Karan Malhotra", 
    role: "Instagram Influencer", 
    image: "https://i.ibb.co/0jcpyfpD/image.png", 
    text: "Honestly itni acchi editing expect nahi ki thi. Videos ka pacing, captions aur effects sab bahut modern feel dete hain. Mere Instagram profile ka overall look hi improve ho gaya.",
    rating: 5
  },
  { 
    id: 4, 
    name: "Rahul Yadav", 
    role: "YouTuber", 
    image: "https://i.ibb.co/tPJb3VRc/image.png", 
    text: "Main kaafi time se ek achchi editing team dhund raha tha aur finally yahan perfect quality mili. Reels bahut engaging bani aur audience retention bhi improve hua. Kaam kaafi professional laga.",
    rating: 4
  },
  { 
    id: 5, 
    name: "Vivek Saini", 
    role: "Filmmaker", 
    image: "https://i.ibb.co/mdfdxkd/image.png", 
    text: "Documentary style editing ka result dekhkar genuinely impress ho gaya tha. Storytelling aur visuals dono next level the. Video ekdam cinematic feel de raha tha.",
    rating: 4.5
  },
  {
    id: 6,
    name: "Nishant Arora",
    role: "Content Creator",
    image: "https://i.ibb.co/SD3TykFh/image.png",
    text: "The editing flow and transitions were honestly very smooth. Every reel felt like premium creator content and audience engagement also improved a lot.",
    rating: 5
  },
  {
    id: 7,
    name: "Harsh Meena",
    role: "Brand Owner",
    image: "https://i.ibb.co/WNJPYPnX/image.png",
    text: "The team perfectly understood my content style. The final edits looked clean, modern, and highly professional.",
    rating: 4
  },
  {
    id: 8,
    name: "Tushar Sharma",
    role: "YouTuber",
    image: "https://i.ibb.co/yB0w7XNF/image.png",
    text: "The motion graphics and sound sync were next level. I was genuinely impressed by the cinematic feel of the videos.",
    rating: 5
  },
  {
    id: 9,
    name: "Ayush Rajput",
    role: "Content Creator",
    image: "https://i.ibb.co/cKRyJm8X/image.png",
    text: "Delivery was fast and the quality was even better than expected. The captions and effects looked very premium and modern.",
    rating: 4.5
  },
  {
    id: 10,
    name: "Mohit Saini",
    role: "Instagram Influencer",
    image: "https://i.ibb.co/k2rgN6kg/image.png",
    text: "The pacing and visual quality of the reels were outstanding. The overall branding of my Instagram page felt completely upgraded.",
    rating: 5
  }
];

export default function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false, dragFree: true },
    [AutoScroll({ playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true, speed: 1.2, direction: 'forward' })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;
    if (autoScroll && autoScroll.isPlaying()) {
      autoScroll.reset();
    }
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;
    if (autoScroll && autoScroll.isPlaying()) {
      autoScroll.reset();
    }
    emblaApi.scrollNext();
  }, [emblaApi]);

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
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-sky-600/10 blur-[60px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-6 text-center"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold capitalize tracking-tight mb-4 text-white text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">Reviews</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-light">Don't just take our word for it.</p>
          </div>
          
          <div className="flex items-center justify-center gap-4 relative z-50 mt-2">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all text-white/70 hover:text-white cursor-pointer capitalize"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 rounded-full border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all text-white/70 hover:text-white cursor-pointer capitalize"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden px-6 md:px-12 group">
        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <div className="flex gap-6 pt-4 pb-12">
            {REVIEWS.map((review, index) => (
              <div key={review.id} className="flex-[0_0_85%] sm:flex-[0_0_300px] md:flex-[0_0_400px] min-w-0">
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="h-full bg-[#0B1225]/60 backdrop-blur-xl p-8 rounded-3xl relative transition-all duration-500 hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] border border-white/5 hover:border-sky-500/40 overflow-hidden group/card flex flex-col justify-between"
                >
                  <div>
                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="relative overflow-hidden rounded-full w-14 h-14 shrink-0 border border-white/10 group-hover/card:border-sky-500/50 transition-colors shadow-lg">
                        <div className="absolute inset-0 bg-sky-500 rounded-full blur-md opacity-20 group-hover/card:opacity-50 transition-opacity" />
                        <img src={review.image} alt={review.name} loading="lazy" className="w-full h-full object-cover relative z-10 group-hover/card:scale-110 transition-transform duration-700 ease-out" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white group-hover/card:text-sky-100 transition-colors capitalize">{review.name}</h4>
                        <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-500">{review.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-4 relative z-10 w-fit group-hover/card:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-300">
                      {[...Array(5)].map((_, i) => {
                        const isFull = i < Math.floor(review.rating);
                        const isHalf = !isFull && i < Math.ceil(review.rating);
                        
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="translate-y-0 group-hover/card:-translate-y-1 transition-transform duration-300"
                            style={{ transitionDelay: `${i * 50}ms` }}
                          >
                            {isFull ? (
                              <Star className="w-4 h-4 fill-sky-500 text-sky-500" />
                            ) : isHalf ? (
                              <div className="relative">
                                <Star className="w-4 h-4 text-sky-500/30" />
                                <div className="absolute inset-0 overflow-hidden w-[50%]">
                                  <Star className="w-4 h-4 fill-sky-500 text-sky-500" />
                                </div>
                              </div>
                            ) : (
                              <Star className="w-4 h-4 text-sky-500/30" />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed italic relative z-10 text-sm md:text-base group-hover/card:text-white transition-colors duration-300">"{review.text}"</p>
                  </div>
                  
                  {/* Quote decoration */}
                  <div className="absolute -top-4 -right-4 text-9xl font-display text-white/[0.02] group-hover/card:text-sky-500/[0.05] transition-colors duration-500 select-none pointer-events-none">"</div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Edge Gradients / Motion Blur Emulation */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-40 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent z-10 pointer-events-none flex items-center justify-start">
           <div className="absolute left-0 w-32 h-full bg-sky-600/10 blur-[50px] mix-blend-screen" />
        </div>
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-40 bg-gradient-to-l from-[#050816] via-[#050816]/80 to-transparent z-10 pointer-events-none flex items-center justify-end">
           <div className="absolute right-0 w-32 h-full bg-sky-600/10 blur-[50px] mix-blend-screen" />
        </div>
      </div>
    </section>
  );
}
