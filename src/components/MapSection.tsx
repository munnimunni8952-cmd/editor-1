import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export default function MapSection() {
  return (
    <section className="relative h-[600px] w-full bg-transparent overflow-hidden">
      {/* 
        Using a stylized iframe map to avoid friction with API keys.
        The CSS filter inverts colors to turn the standard map into a dark theme map,
        then adjusts hue slightly to fit the cinematic vibe.
      */}
      <div className="absolute inset-0">
        <iframe
          title="Studio Location"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(85%) grayscale(20%)' }}
          loading="lazy"
          allowFullScreen
          // Using a generic New York location for demo purposes
          src="https://maps.google.com/maps?q=26.976500,75.726861&z=15&output=embed"
        ></iframe>
      </div>

      {/* Overlay to reduce map brightness and add vignette */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0f] via-transparent to-[#0c0b0f] pointer-events-none" />
      
      {/* Animated Pin Overlay (Centralized for visual effect, not tied to logic) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* We can remove this fake absolute pin, because we are supplying a precise coordinate embed that typically has its own pin, or we can keep it as a stylized overlay */}
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 max-w-[320px] glass-card p-6 rounded-2xl pointer-events-auto border border-white/5 backdrop-blur-lg shadow-2xl">
        <h3 className="text-xl font-display font-bold mb-2 tracking-wide">Studio Location</h3>
        <p className="text-gray-400 text-sm mb-5 leading-relaxed">
          Available for worldwide remote projects.
        </p>
        <div className="text-white text-sm font-medium flex items-center gap-2 mb-6">
          <MapPin className="w-4 h-4 text-[#4DA3FF]" /> 
          <span className="font-mono text-xs opacity-80">26°58'35.4"N 75°43'36.7"E</span>
        </div>
        <a 
          href="https://www.google.com/maps?q=26.976500,75.726861"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full py-3 bg-white text-black text-sm font-semibold rounded-lg hover:bg-[#4DA3FF] hover:text-black hover:shadow-[0_0_20px_rgba(77,163,255,0.4)] transition-all duration-300"
        >
          Open Location
        </a>
      </div>
    </section>
  );
}
