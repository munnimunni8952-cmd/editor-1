import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, X, MessageSquarePlus } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useCallback, useEffect, useState } from 'react';

const REVIEWS = [
  {
    id: 6,
    name: "Nishant Arora",
    role: "Content Creator",
    text: "The editing flow and transitions were honestly very smooth. Every reel felt like premium creator content and audience engagement also improved a lot.",
    rating: 5
  },
  {
    id: 7,
    name: "Harsh Meena",
    role: "Brand Owner",
    text: "The team perfectly understood my content style. The final edits looked clean, modern, and highly professional.",
    rating: 4
  },
  {
    id: 8,
    name: "Tushar Sharma",
    role: "YouTuber",
    text: "The motion graphics and sound sync were next level. I was genuinely impressed by the cinematic feel of the videos.",
    rating: 5
  },
  {
    id: 9,
    name: "Ayush Rajput",
    role: "Content Creator",
    text: "Delivery was fast and the quality was even better than expected. The captions and effects looked very premium and modern.",
    rating: 4.5
  },
  {
    id: 10,
    name: "Mohit Saini",
    role: "Instagram Influencer",
    text: "The pacing and visual quality of the reels were outstanding. The overall branding of my Instagram page felt completely upgraded.",
    rating: 5
  }
];


export default function Reviews() {
  const [reviews, setReviews] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('trimclip_reviews');
      if (saved) {
        try {
          let parsed = JSON.parse(saved);
          // Remove the specific spam/test reviews
          const blockList = ["sk raj", "sk rabiul", "raju", "sahil"];
          parsed = parsed.filter((r: any) => {
            const lowerName = r.name.toLowerCase().trim();
            return !blockList.some(block => lowerName.includes(block));
          });
          return [...parsed, ...REVIEWS];
        } catch (e) {
          console.error("Failed to parse reviews from local storage");
        }
      }
    }
    return REVIEWS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', email: '', roleSelection: 'Content Creator', customRole: '', message: '', rating: 5 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const customReviews = reviews.filter(r => !REVIEWS.find(orig => orig.id === r.id));
      localStorage.setItem('trimclip_reviews', JSON.stringify(customReviews));
    }
  }, [reviews]);

  const ROLE_OPTIONS = [
    "Content Creator",
    "Brand Owner",
    "YouTuber",
    "Content Editor",
    "Instagram Influencer",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reviewRole = newReview.roleSelection === 'Other' 
      ? newReview.customRole.trim() || 'Verified Client'
      : newReview.roleSelection;
      
    const review = {
      id: Date.now(),
      name: newReview.name,
      role: reviewRole,
      text: newReview.message,
      rating: newReview.rating
    };
    setReviews([review, ...reviews]);
    setIsModalOpen(false);
    setNewReview({ name: '', email: '', roleSelection: 'Content Creator', customRole: '', message: '', rating: 5 });
  };

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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight capitalize text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">Reviews</span>
            </h2>
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">Don't just take our word for it.</p>
          </div>
          
          <div className="flex items-center justify-center gap-4 relative z-50 mt-4 flex-wrap">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all text-white/70 hover:text-white cursor-pointer capitalize"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500/10 to-cyan-500/10 hover:from-sky-500/20 hover:to-cyan-500/20 border border-sky-500/30 text-sky-400 hover:text-sky-300 font-medium transition-all hover:scale-105 active:scale-95"
            >
              <MessageSquarePlus className="w-5 h-5" />
              Write a Review
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
            <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={review.id} 
                className="flex-[0_0_85%] sm:flex-[0_0_300px] md:flex-[0_0_400px] min-w-0"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="h-full bg-[#0B1225]/60 backdrop-blur-xl p-8 rounded-3xl relative transition-all duration-500 hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] border border-white/5 hover:border-sky-500/40 overflow-hidden group/card flex flex-col justify-between"
                >
                  <div>
                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="mb-6 relative z-10">
                      
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
              </motion.div>
            ))}
            </AnimatePresence>
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

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#050816]/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0B1225] border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden z-10 p-5 md:p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white capitalize tracking-tight">Share Your Experience</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
                  <input 
                    required
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview(prev => ({...prev, name: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                  <input 
                    required
                    type="email"
                    value={newReview.email}
                    onChange={(e) => setNewReview(prev => ({...prev, email: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Who Are You?</label>
                  <select
                    value={newReview.roleSelection}
                    onChange={(e) => setNewReview(prev => ({...prev, roleSelection: e.target.value}))}
                    className="w-full bg-[#111A2E] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light appearance-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    {ROLE_OPTIONS.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                {newReview.roleSelection === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-xs font-medium text-gray-400 mb-1">Specify Role</label>
                    <input 
                      required
                      type="text"
                      value={newReview.customRole}
                      onChange={(e) => setNewReview(prev => ({...prev, customRole: e.target.value}))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light"
                      placeholder="e.g. Freelance Editor"
                    />
                  </motion.div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview(prev => ({...prev, rating: star}))}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-sky-500 text-sky-500' : 'text-gray-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.message}
                    onChange={(e) => setNewReview(prev => ({...prev, message: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-light resize-none"
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-1 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white rounded-xl font-bold tracking-wide uppercase transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transform hover:-translate-y-0.5 text-sm"
                >
                  Submit Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
