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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528001099!2d-74.14483163152528!3d40.69763123326162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        ></iframe>
      </div>

      {/* Overlay to reduce map brightness and add vignette */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
      
      {/* Animated Pin Overlay (Centralized for visual effect, not tied to logic) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
           initial={{ y: -50, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ type: "spring", bounce: 0.6, duration: 1 }}
           className="relative"
        >
          <div className="w-16 h-16 bg-cyan-400/20 rounded-full animate-ping absolute -inset-2" />
          <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.6)] relative z-10">
            <MapPin className="w-6 h-6 text-black" />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 max-w-sm glass-card p-6 rounded-2xl pointer-events-auto">
        <h3 className="text-xl font-bold mb-2">Studio Location</h3>
        <p className="text-gray-400 text-sm mb-4">
          Based in the creative heart of the city. Available for worldwide remote projects.
        </p>
        <div className="text-cyan-400 text-sm font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4" /> Los Angeles, CA
        </div>
      </div>
    </section>
  );
}
