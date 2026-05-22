import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PHOTOS = [
  {
    id: 1,
    image: "https://i.ibb.co/9HBSyXY9/Whats-App-Image-2026-05-21-at-1-20-21-PM-2.jpg"
  },
  {
    id: 2,
    image: "https://i.ibb.co/0yTty1g1/Whats-App-Image-2026-05-21-at-1-20-22-PM.jpg"
  }
];

export default function PhotoSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section id="studio" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Studio</span>
          </h2>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
            A glimpse into our creative environment and the process behind the magic.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto group"
        >
          {/* Main Slider Box */}
          <div className="bg-[#0B1225]/65 backdrop-blur-2xl rounded-3xl p-4 md:p-6 border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] hover:shadow-[0_0_80px_rgba(59,130,246,0.25)] hover:border-blue-500/40 transition-all duration-700 overflow-hidden relative">
            
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="overflow-hidden rounded-2xl relative" ref={emblaRef}>
              <div className="flex touch-pan-y">
                {PHOTOS.map((photo, index) => (
                  <div key={photo.id} className="flex-[0_0_100%] min-w-0 relative h-[400px] md:h-[600px] group/slide">
                    {/* Image */}
                    <div className="absolute inset-0 overflow-hidden bg-[#050816]">
                       <img 
                         src={photo.image} 
                         alt={`Studio Image ${index + 1}`}
                         loading="lazy"
                         className="w-full h-full object-cover transition-transform duration-[10s] group-hover/slide:scale-110 ease-out"
                       />
                    </div>
                    
                    {/* Removed gradient and content overlay as requested */}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-8 z-20 hidden md:block">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-blue-600/40 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-8 z-20 hidden md:block">
              <button
                onClick={scrollNext}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-blue-600/40 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {PHOTOS.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === selectedIndex
                    ? 'w-10 h-2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
