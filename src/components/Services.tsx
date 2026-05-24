import { motion } from 'motion/react';
import { 
  Clapperboard, 
  MonitorPlay, 
  Target, 
  Wand2, 
  Image as ImageIcon, 
  Share2,
  Crown,
  CheckCircle2
} from 'lucide-react';
import React, { useRef, useState } from 'react';

const services = [
  {
    title: "Short Form Editing",
    icon: Clapperboard,
    features: ["Reels", "Shorts", "TikTok Style"],
    color: "from-sky-500 to-cyan-500",
    shadow: "shadow-sky-500/20"
  },
  {
    title: "Long Form Editing",
    icon: MonitorPlay,
    features: ["YouTube Videos", "Podcasts", "Documentary Edits"],
    color: "from-cyan-400 to-sky-500",
    shadow: "shadow-cyan-500/20"
  },
  {
    title: "Ads Editing",
    icon: Target,
    features: ["Meta Ads", "Product Promos", "Brand Commercials"],
    color: "from-cyan-500 to-sky-400",
    shadow: "shadow-sky-500/20"
  },
  {
    title: "Motion Graphics",
    icon: Wand2,
    features: ["Text Animation", "Logo Animation", "Smooth Transitions"],
    color: "from-sky-500 to-cyan-600",
    shadow: "shadow-cyan-500/20"
  },
  {
    title: "Thumbnail Design",
    icon: ImageIcon,
    features: ["High CTR", "Custom Graphics", "A/B Testing Ready"],
    color: "from-cyan-500 to-sky-500",
    shadow: "shadow-sky-500/20"
  },
  {
    title: "Social Media Management",
    icon: Share2,
    features: ["Content Strategy", "Scheduling", "Analytics Tracking"],
    color: "from-sky-400 to-cyan-500",
    shadow: "shadow-cyan-500/20"
  }
];

const TiltCard: React.FC<{ service: typeof services[0], index: number }> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;
    
    // Scale rotation for premium subtle 3D feel
    setRotateX(yPct * 12);
    setRotateY(xPct * -12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        className="relative group h-full rounded-2xl bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-xl p-8 overflow-hidden transition-all duration-300 hover:border-white/20"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Glow Hover Background */}
        <div className={`absolute -inset-0.5 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.12] transition-opacity duration-700 blur-2xl rounded-2xl z-0`} />
        
        {/* Top Highlight line for 3D effect */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-opacity duration-500" />

        <div className="relative z-20 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
          <div className="mb-8 relative inline-block self-start">
            {/* Icon glow behind */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 blur-xl rounded-full group-hover:opacity-50 transition-opacity duration-500`} />
            <div className={`relative inline-flex p-4 rounded-xl bg-black/60 text-white border border-white/10 shadow-lg group-hover:${service.shadow} group-hover:border-white/30 transition-all duration-300`}>
              <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white tracking-tight mb-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300 capitalize">
            {service.title}
          </h3>
          
          <ul className="space-y-4 mt-auto">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center text-neutral-400 group-hover:text-neutral-200 transition-colors duration-300">
                <div className="relative flex mr-4 items-center justify-center w-5 h-5 rounded-full bg-black/50 border border-white/10 overflow-hidden shrink-0">
                   <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                   <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors duration-300" />
                </div>
                <span className="font-medium text-[15px] tracking-wide">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Services() {
  return (
    <section id="services" className="py-32 relative overflow-hidden bg-transparent">
      {/* Subtle Neon Glow for the heading area */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40%] h-[100px] bg-gradient-to-r from-sky-500/10 to-cyan-500/10 blur-[50px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
            <span className="text-xs font-semibold tracking-widest text-neutral-300 uppercase">Our Expertise</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight capitalize">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-500 drop-shadow-[0_0_10px_rgba(56,189,248,0.2)]">Services</span>
          </h2>
          <h3 className="sr-only">Cinematic Video Editing & Motion Graphics Services Jaipur</h3>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
            Elevate your brand with cinematic visuals, seamless storytelling, and high-converting video content tailored for the modern digital landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <TiltCard key={index} service={service} index={index} />
          ))}
        </div>


      </div>
    </section>
  );
}
