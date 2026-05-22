import { motion } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  VolumeX,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

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
  "https://www.image2url.com/r2/default/videos/1779347346016-c1fb2ca3-5d50-4f20-8d03-8ba2ad9d379c.mp4",
];

// Duplicate enough times to ensure smooth endless scrolling if viewport is extremely wide
const EXTENDED_REELS = [...REELS, ...REELS];

export default function MyWork() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false, dragFree: true },
    [
      AutoScroll({
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        speed: 1.2,
        direction: "forward",
      }),
    ],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;
    if (!autoScroll) return;

    if (playingId !== null) {
      if (autoScroll.isPlaying()) autoScroll.stop();
    } else {
      if (!autoScroll.isPlaying()) autoScroll.play();
    }
  }, [emblaApi, playingId]);

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

  return (
    <section id="work" className="py-24 relative overflow-hidden bg-[#050816]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12 relative z-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4 text-white">
            My work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-md">
              Reels
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            A collection of my best video projects, showcasing dynamic editing,
            color grading, and visual storytelling.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full z-40 group/slider">
        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 p-2 md:p-4 rounded-full bg-black/40 hover:bg-blue-600/20 border border-white/20 hover:border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)] backdrop-blur-md transition-all duration-300 text-white outline-none focus:ring-2 focus:ring-blue-500 md:opacity-0 md:group-hover/slider:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 hover:-translate-x-1 transition-transform" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 p-2 md:p-4 rounded-full bg-black/40 hover:bg-blue-600/20 border border-white/20 hover:border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)] backdrop-blur-md transition-all duration-300 text-white outline-none focus:ring-2 focus:ring-blue-500 md:opacity-0 md:group-hover/slider:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 hover:translate-x-1 transition-transform" />
        </button>

        {/* Scroll Container */}
        <div
          ref={emblaRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing hide-scrollbar"
          style={{ touchAction: "pan-y" }}
        >
          <div className="flex gap-4 md:gap-10 py-4 md:py-8 px-[5vw]">
            {EXTENDED_REELS.map((reelSrc, index) => (
              <div
                key={index}
                className="flex-[0_0_70vw] sm:flex-[0_0_260px] md:flex-[0_0_320px] min-w-0 pl-0"
              >
                <ReelPreviewItem
                  src={reelSrc}
                  isPlaying={playingId === index}
                  onPlay={() => setPlayingId(index)}
                  onPause={() => setPlayingId(null)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Edge Overlays to soften the scrolling cutoffs */}
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#050816] to-transparent z-40 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#050816] to-transparent z-40 pointer-events-none" />
      </div>
    </section>
  );
}

function ReelPreviewItem({
  src,
  isPlaying,
  onPlay,
  onPause,
}: {
  src: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!itemRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible && isPlaying) {
      onPause();
    }
  }, [isVisible, isPlaying, onPause]);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div
      ref={itemRef}
      onPointerDown={(e) => {
        if (itemRef.current) {
          itemRef.current.dataset.downX = e.clientX.toString();
          itemRef.current.dataset.downY = e.clientY.toString();
        }
      }}
      onClick={(e) => {
        if (itemRef.current) {
          const downX = parseFloat(itemRef.current.dataset.downX || "0");
          const downY = parseFloat(itemRef.current.dataset.downY || "0");
          const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
          if (dist < 10) {
            e.preventDefault();
            if (isPlaying) {
              onPause();
            } else {
              onPlay();
            }
          }
        }
      }}
      className={`group relative w-full aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 transform bg-[#0B1225]/65 backdrop-blur-md shadow-lg border border-white/10 hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]`}
      style={{
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 opacity-0 group-hover:from-blue-500/10 group-hover:to-blue-500/5 transition-opacity duration-500 pointer-events-none z-10" />

      {shouldLoad && (
        <video
          ref={videoRef}
          src={`${src}#t=0.001`}
          className="w-full h-full object-cover bg-neutral-900"
          playsInline
          loop
          muted={isMuted}
          preload="metadata"
        />
      )}

      {/* Central Play Button Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none z-30 ${isPlaying ? "opacity-0" : "opacity-100"}`}
      >
        <div
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-blue-400/50 text-white transition-transform"
        >
          <Play className="w-8 h-8 md:w-10 md:h-10 ml-2" fill="currentColor" />
        </div>
      </div>

      {/* Sound Toggle Overlay */}
      <div className="absolute inset-0 transition-opacity duration-300 pointer-events-none z-20">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050816]/90 to-transparent" />
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 flex items-center justify-center border border-white/20 hover:border-blue-400/50 hover:bg-blue-600/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] transform transition-all duration-300 backdrop-blur-md pointer-events-auto cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-white/80 transition-transform" />
            ) : (
              <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
