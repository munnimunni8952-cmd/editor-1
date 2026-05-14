import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

const REELS = [
  "https://www.image2url.com/r2/default/videos/1778752892118-7553e6be-ecf2-4544-8948-0a0ada5e7a1c.mp4",
  "https://www.image2url.com/r2/default/videos/1778752981503-3ebc9bcd-6aa5-4ea6-b4ca-e432b6ac7c65.mp4",
  "https://www.image2url.com/r2/default/videos/1778753018117-b704d364-630c-4198-8e7f-ccd22c84ae2e.mp4",
  "https://www.image2url.com/r2/default/videos/1778753285716-27f39fe6-49eb-48bc-adc0-5e2390eb6da7.mp4"
];

// Duplicate enough times to ensure smooth endless scrolling
const EXTENDED_REELS = [...REELS, ...REELS, ...REELS, ...REELS];

export default function MyWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

  // Auto-scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pause auto-scroll if a video is actively playing
    if (activeVideoIndex !== null) return;

    let animationId: number;
    let lastTime: number;
    let exactScrollLeft = container.scrollLeft;
    const isMobile = window.innerWidth < 768;
    const scrollSpeed = isMobile ? 0.02 : 0.04; // Adjust speed (slower on mobile)

    const scroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

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
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [activeVideoIndex]);

  const toggleVideo = (index: number, element: HTMLElement | null) => {
    if (activeVideoIndex === index) {
      setActiveVideoIndex(null);
    } else {
      setActiveVideoIndex(index);
      
      // Center the clicked video element
      if (element && containerRef.current) {
        const container = containerRef.current;
        const scrollLeft = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
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
            My work <span className="text-cyan-400">Reels</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg font-light">
            A collection of my best video projects, showcasing dynamic editing, color grading, and visual storytelling.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full py-6 md:py-8 z-40">
        {/* Scroll Container */}
        <div 
          ref={containerRef}
          className="flex items-center gap-4 md:gap-10 px-[10vw] md:px-[20vw] overflow-x-auto hide-scrollbar whitespace-nowrap cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: 'touch' }}
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
      className={`group relative w-[240px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shrink-0 cursor-pointer transition-transform duration-300 transform border
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
          className="w-full h-full object-cover rounded-2xl bg-neutral-900"
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
