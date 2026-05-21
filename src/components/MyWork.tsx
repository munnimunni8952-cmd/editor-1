import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const REELS = [
  "https://www.image2url.com/r2/default/videos/1779261227126-b2a8e88e-eca3-4cd8-b67f-0a4643c3c0e0.mp4",
  "https://www.image2url.com/r2/default/videos/1779261289565-523dc815-995a-4b7e-bf08-8c56ed5f2f0c.mp4",
  "https://www.image2url.com/r2/default/videos/1779261328217-2f4c9570-b73a-4c63-a8a7-3ab5f28827ab.mp4",
  "https://www.image2url.com/r2/default/videos/1779261361073-01666982-d9a8-44c0-87c6-c18c1d910970.mp4",
  "https://www.image2url.com/r2/default/videos/1779261429805-e3be240b-1e1d-4be5-90ea-f9797cd3b666.mp4",
  "https://www.image2url.com/r2/default/videos/1779261464932-d74b0fc3-014c-4204-afd4-6dfd16bd05ff.mp4",
  "https://www.image2url.com/r2/default/videos/1779261508330-8d6eec14-4393-41f6-bcff-f9ba96d2cf3f.mp4",
  "https://www.image2url.com/r2/default/videos/1779261556737-946bc1c5-4f92-4cb4-9524-723d0af3297f.mp4",
  "https://www.image2url.com/r2/default/videos/1779346987862-911615f0-a4aa-433c-a657-93153687cc0e.mp4",
  "https://www.image2url.com/r2/default/videos/1779347132865-3bfa92e5-b7c7-4dda-aee4-82859e8df348.mp4",
  "https://www.image2url.com/r2/default/videos/1779347304810-9a6fddfc-cc77-42d9-850f-f5d5fc6f7d9b.mp4",
  "https://www.image2url.com/r2/default/videos/1779347346016-c1fb2ca3-5d50-4f20-8d03-8ba2ad9d379c.mp4"
];

// Duplicate enough times to ensure smooth endless scrolling
const EXTENDED_REELS = [...REELS, ...REELS, ...REELS, ...REELS];

export default function MyWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragged = useRef(false);

  const handleInteractionStart = () => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 1500); // Resume auto-scroll after 1.5s of inactivity
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragged.current = false;
    handleInteractionStart();
    const container = containerRef.current;
    if (!container) return;
    startX.current = e.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    if (e.pointerType === 'mouse') {
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX.current);
      if (Math.abs(walk) > 5) {
        dragged.current = true;
      }
      e.preventDefault();
      container.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handlePointerUpOrLeave = () => {
    isDragging.current = false;
    handleInteractionEnd();
  };

  // Keep a ref to tracking paused state to use within the animation frame loop
  const isPaused = activeVideoIndex !== null || isInteracting;
  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Auto-scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime: number;
    let exactScrollLeft = container.scrollLeft;
    const isMobile = window.innerWidth < 768;
    const scrollSpeed = isMobile ? 0.02 : 0.04;
    let wasPaused = isPausedRef.current;

    const scroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      if (isPausedRef.current) {
        wasPaused = true;
        animationId = requestAnimationFrame(scroll);
        return;
      }

      if (wasPaused) {
        exactScrollLeft = container.scrollLeft;
        wasPaused = false;
      }

      exactScrollLeft += deltaTime * scrollSpeed;
      container.scrollLeft = exactScrollLeft;

      // Sync if user manually scrolled during animation slightly
      if (Math.abs(container.scrollLeft - exactScrollLeft) > 2) {
        exactScrollLeft = container.scrollLeft;
      }

      // Seamless infinite loop detection
      if (container.children.length >= REELS.length * 2) {
        const firstItem = container.children[0] as HTMLElement;
        const loopItem = container.children[REELS.length] as HTMLElement;
        const loopWidth = loopItem.offsetLeft - firstItem.offsetLeft;

        if (loopWidth > 0 && exactScrollLeft >= loopWidth) {
          exactScrollLeft -= loopWidth;
          container.scrollLeft = exactScrollLeft;
        } else if (loopWidth > 0 && exactScrollLeft < 0) {
          // If scrolled backwards past start
          exactScrollLeft += loopWidth;
          container.scrollLeft = exactScrollLeft;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []); // Run only once to prevent restarting the animation loop

  const toggleVideo = (index: number, element: HTMLElement | null) => {
    const container = containerRef.current;
    if (container && Math.abs(container.scrollLeft - scrollLeft.current) > 10) return;
    if (dragged.current) return;
    
    if (activeVideoIndex === index) {
      setActiveVideoIndex(null);
    } else {
      setActiveVideoIndex(index);
      
      // Center the clicked video element
      if (element && container) {
        const targetScrollLeft = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollContainer = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Pause auto-scroll by interacting
    handleInteractionStart();
    
    const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.7 : window.innerWidth * 0.4;
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    
    // Resume auto-scroll naturally after some time
    setTimeout(() => {
      handleInteractionEnd();
    }, 500);
  };

  return (
    <section id="work" className="py-24 relative overflow-hidden bg-[#030303]">
      {/* Dim Overlay for Active State */}
      <div 
        className={`absolute inset-0 bg-black/90 pointer-events-none transition-opacity duration-700 z-30 ${activeVideoIndex !== null ? 'opacity-100' : 'opacity-0'}`} 
      />

      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12 relative z-40">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4 text-white">
            My work <span className="bg-gradient-to-r from-[#4DA3FF] to-[#6EE7FF] bg-clip-text text-transparent">Reels</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg font-light">
            A collection of my best video projects, showcasing dynamic editing, color grading, and visual storytelling.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full z-40">
        {/* Navigation Arrows */}
        <button
          onClick={() => scrollContainer('left')}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 p-2 md:p-4 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all text-white group outline-none focus:ring-2 focus:ring-[#4DA3FF]"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => scrollContainer('right')}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 p-2 md:p-4 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all text-white group outline-none focus:ring-2 focus:ring-[#4DA3FF]"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Scroll Container */}
        <div 
          ref={containerRef}
          className={`flex items-center gap-4 md:gap-10 px-[10vw] md:px-[20vw] py-8 md:py-12 overflow-x-auto overflow-y-hidden hide-scrollbar whitespace-nowrap cursor-grab active:cursor-grabbing ${isInteracting || activeVideoIndex !== null ? 'snap-x snap-mandatory' : ''}`}
          style={{ WebkitOverflowScrolling: 'touch' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrLeave}
          onPointerLeave={handlePointerUpOrLeave}
          onWheel={() => {
            // Trigger pause if native scrolling on trackpad or mouse wheel
            handleInteractionStart();
            handleInteractionEnd();
          }}
          onTouchStart={() => {
            handleInteractionStart();
          }}
          onTouchEnd={() => {
            handleInteractionEnd();
          }}
        >
          {EXTENDED_REELS.map((reelSrc, index) => {
            const isActive = activeVideoIndex === index;
            const isAnyActive = activeVideoIndex !== null;
            
            return (
              <ReelItem 
                key={index} 
                src={reelSrc} 
                isActive={isActive} 
                isAnyActive={isAnyActive}
                onClick={(el) => toggleVideo(index, el)}
                onEnd={() => setActiveVideoIndex(null)}
              />
            );
          })}
        </div>

        {/* Edge Overlays to soften the scrolling cutoffs */}
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

function ReelItem({ 
  src, 
  isActive, 
  isAnyActive,
  onClick, 
  onEnd 
}: { 
  src: string; 
  isActive: boolean; 
  isAnyActive: boolean;
  onClick: (element: HTMLElement | null) => void; 
  onEnd: () => void; 
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Keep a ref to isActive to use inside the observer callback safely
  const isActiveRef = useRef(isActive);
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    if (!itemRef.current) return;
    
    // Load video if it's close to viewport, and pause if it leaves viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        } else {
          // If video goes fully offscreen and was active, pause it
          if (isActiveRef.current) {
            onEnd();
          }
        }
      });
    }, { rootMargin: '300px 0px' });
    
    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [onEnd]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name !== 'AbortError') {
            console.error("Play error:", err);
          }
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, shouldLoad]);

  return (
    <div
      ref={itemRef}
      onClick={() => onClick(itemRef.current)}
      className={`snap-center group relative w-[240px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shrink-0 cursor-pointer transition-transform duration-300 transform border
        ${isActive 
          ? 'scale-[1.05] md:scale-[1.1] shadow-2xl z-50 ring-2 ring-cyan-400 border-cyan-400 mx-2 md:mx-6' 
          : isAnyActive
            ? 'scale-[0.98] opacity-50 z-10 border-white/5'
            : 'hover:scale-[1.02] shadow-lg border-white/10 z-20 hover:border-white/30'
        }
      `}
      style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
    >
      {shouldLoad && (
        <video
          ref={videoRef}
          src={`${src}#t=0.001`}
          className="w-full h-full object-cover rounded-2xl bg-neutral-900 pointer-events-none"
          playsInline
          loop={false}
          onEnded={onEnd}
          preload="metadata"
        />
      )}
      
      {/* Custom Play Overlay - Only visible when not playing */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-xl transform transition-transform group-hover:scale-110 backdrop-blur-md">
            <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white md:ml-1 ml-0.5 opacity-90" />
          </div>
        </div>
      </div>
    </div>
  );
}
