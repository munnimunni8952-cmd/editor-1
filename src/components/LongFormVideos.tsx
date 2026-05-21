import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Play, PlayCircle } from 'lucide-react';

const videoIds = [
  "ac9rf69be4s",
  "qVLGSiZg7hA",
  "en4973sT7w0",
  "rV426NyM9HI",
  "p_IMw2PIE54",
  "EHxouXdxhaw",
  "AblIjVTEtGY",
  "pIQeQfwqyCg",
  "VAZorx8peqQ",
  "ZjFgeB24MWw"
];

const VideoCard = ({ videoId, index }: { videoId: string; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Aspect ratio container 16:9 */}
      <div className="relative pt-[56.25%] w-full rounded-t-[28px] overflow-hidden bg-[#0a0a0f]">
        {!isPlaying ? (
          <>
            <img 
              src={thumbnailUrl} 
              alt={`Video ${index + 1} Thumbnail`}
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:border-[#A78BFA]/50 group-hover:bg-[#A78BFA]/20 group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(167,139,250,0.4)] cursor-pointer" onClick={() => setIsPlaying(true)}>
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
            
            <button 
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full cursor-pointer z-10 opacity-0"
              aria-label="Play video"
            />
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-t-[28px]"
          />
        )}
      </div>

      {/* Decorative Glow Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 group-hover:via-[#A78BFA]/50 to-transparent transition-colors duration-500" />
      
      {/* Minimal Footer */}
      <div className="p-6">
        <h3 className="text-white font-medium text-lg tracking-wide line-clamp-1 group-hover:text-[#A78BFA] transition-colors duration-300">
          Cinematic Masterpiece #{index + 1}
        </h3>
        <p className="text-gray-400 text-sm mt-2 font-light">Premium Editing & Color Grading</p>
      </div>
    </motion.div>
  );
};

export default function LongFormVideos() {
  return (
    <section id="long-form" className="py-32 relative bg-[#0c0b0f] overflow-hidden">
      {/* Spotlight Effect and Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#A78BFA]/20 to-transparent" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#A78BFA]/5 blur-[120px] rounded-[100%] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#A78BFA]/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none opacity-40" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <PlayCircle className="w-4 h-4 text-[#A78BFA]" />
            <span className="text-xs font-semibold tracking-widest text-neutral-300 uppercase">Long Form Content</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Premium Cinematic <span className="bg-gradient-to-r from-[#A78BFA] to-white bg-clip-text text-transparent">Edits</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-[#A78BFA] to-transparent mx-auto mb-8 rounded-full" />
          
          <p className="text-lg text-neutral-400 leading-relaxed font-light">
            High-quality cinematic edits crafted for creators, brands, and businesses.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {videoIds.map((id, index) => (
            <VideoCard key={id} videoId={id} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
