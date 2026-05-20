import { motion, useInView } from 'motion/react';
import React, { useRef, useState } from 'react';
import { Instagram, Linkedin, Twitter, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const teamMembers = [
  {
    name: "Arman Khan",
    role: "Founder & Creative Director",
    bio: "Visionary leader driving the agency's creative direction and cinematic aesthetics.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80",
    socials: { instagram: "#", linkedin: "#", twitter: "#" }
  },
  {
    name: "Rohan Das",
    role: "Lead Developer",
    bio: "Technical architect specializing in premium web experiences and modern architectures.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    socials: { instagram: "#", linkedin: "#", twitter: "#" }
  },
  {
    name: "Ayaan Malik",
    role: "Video Editor",
    bio: "Master of motion, specializing in high-retention short form and cinematic edits.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
    socials: { instagram: "#", linkedin: "#", twitter: "#" }
  },
  {
    name: "Sarah Ali",
    role: "UI/UX Designer",
    bio: "Crafting intuitive, pixel-perfect interfaces that blend beauty with usability.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    socials: { instagram: "#", linkedin: "#", twitter: "#" }
  }
];

const trustFeatures = [
  {
    title: "Cinematic Quality",
    description: "Every frame and pixel is crafted to look like a premium international brand."
  },
  {
    title: "Seamless Communication",
    description: "Direct lines to our creatives, ensuring your vision is executed perfectly."
  },
  {
    title: "Data-Driven Results",
    description: "Beautiful work that actually converts. A perfect balance of art and analytics."
  }
];

const TeamCard = ({ member, index }: { member: typeof teamMembers[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative h-full rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20 select-none"
      >
        {/* Mouse follow light effect */}
        <div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08), transparent 40%)`
          }}
        />

        {/* Card Content Wrapper */}
        <div className="relative z-10 flex flex-col h-full bg-gradient-to-b from-transparent to-[#0B0B0F]/80 backdrop-blur-sm group-hover:backdrop-blur-md transition-all duration-500">
          
          {/* Image Container */}
          <div className="relative h-64 md:h-72 w-full overflow-hidden">
            <div className="absolute inset-0 bg-[#0B0B0F]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            {/* Bottom Gradient overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0F] to-transparent z-10" />
          </div>

          {/* Text Content */}
          <div className="p-6 pt-0 flex flex-col flex-grow relative z-20">
            <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{member.name}</h3>
            <p className="text-[#4DA3FF] text-sm font-medium tracking-wide mb-4">{member.role}</p>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">{member.bio}</p>

            {/* Social Icons (Slide Up Effect) */}
            <div className="flex gap-4 overflow-hidden pt-2">
              <a href={member.socials.instagram} className="text-neutral-500 hover:text-white transition-colors duration-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" style={{ transitionDelay: '50ms' }}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href={member.socials.linkedin} className="text-neutral-500 hover:text-white transition-colors duration-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" style={{ transitionDelay: '100ms' }}>
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={member.socials.twitter} className="text-neutral-500 hover:text-white transition-colors duration-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" style={{ transitionDelay: '150ms' }}>
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Team() {
  return (
    <section id="team" className="py-32 relative overflow-hidden bg-[#0B0B0F]">
      {/* Premium Cinematic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      {/* Floating Gradient Blobs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" />
      
      {/* Spotlight Effect behind heading */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#4DA3FF]" />
            <span className="text-xs font-semibold tracking-widest text-neutral-300 uppercase">Meet The Team</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            The Creative Minds <br/>
            <span className="bg-gradient-to-r from-[#4DA3FF] to-[#6EE7FF] bg-clip-text text-transparent">Behind The Work</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-[#4DA3FF] to-transparent mx-auto mb-8 rounded-full" />
          
          <p className="text-lg text-neutral-400 leading-relaxed">
            A passionate team of designers, developers, editors, and strategists creating premium digital experiences.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto mb-32">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Why Clients Trust Us Section */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-7xl mx-auto mb-32"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white tracking-tight mb-4">Why Clients Trust Us</h3>
            <p className="text-neutral-400">Delivering excellence through our proven creative framework.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustFeatures.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <CheckCircle2 className="w-8 h-8 text-[#4DA3FF] mb-6" />
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Our Team / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden"
        >
          {/* CTA Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-xl border border-white/10 rounded-3xl z-0" />
          
          <div className="relative z-10 p-12 md:p-16 text-center flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Join Our Team</h3>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
              We're always looking for exceptional talent. If you have an eye for cinematic design and premium development, we want to hear from you.
            </p>
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 ease-in-out bg-white/10 border border-white/20 rounded-full hover:bg-white text-md hover:text-black hover:scale-105 active:scale-95">
              <span>Work With Us</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
