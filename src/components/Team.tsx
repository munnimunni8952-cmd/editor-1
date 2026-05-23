import { motion, useInView } from 'motion/react';
import React, { useRef, useState } from 'react';
import { Instagram, Linkedin, Twitter, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const teamMembers = [
  {
    name: "Ankit Sharma",
    role: "Founder & Creative Head",
    image: "https://i.ibb.co/9HBSyXY9/Whats-App-Image-2026-05-21-at-1-20-21-PM-2.jpg"
  },
  {
    name: "Krishna Sharma",
    role: "Founder & Managing Director",
    image: "https://i.ibb.co/0yTty1g1/Whats-App-Image-2026-05-21-at-1-20-22-PM.jpg"
  },
  {
    name: "Aman Sharma",
    role: "Senior Video Editor",
    image: "https://i.ibb.co/JWbWZ3px/Whats-App-Image-2026-05-21-at-1-20-19-PM.jpg"
  },
  {
    name: "Divanshu Mishra",
    role: "Graphics Designer",
    image: "https://i.ibb.co/jPtPQCVz/Whats-App-Image-2026-05-21-at-1-20-19-PM-1.jpg"
  },
  {
    name: "Shreya Shekhawat",
    role: "Graphics Designer",
    image: "https://i.ibb.co/QFCtdvVV/Whats-App-Image-2026-05-21-at-1-20-20-PM.jpg"
  },
  {
    name: "Divansh",
    role: "Video Editor",
    image: "https://i.ibb.co/wFZ5sq4v/Whats-App-Image-2026-05-21-at-1-20-20-PM-1.jpg"
  },
  {
    name: "Nikhil Yadav",
    role: "Social Media Manager",
    image: "https://i.ibb.co/N24rMbJP/Whats-App-Image-2026-05-21-at-1-20-20-PM-2.jpg"
  },
  {
    name: "Aayushi Singh",
    role: "Content Writer",
    image: "https://i.ibb.co/9H6VxshQ/Whats-App-Image-2026-05-21-at-1-20-21-PM.jpg"
  },
  {
    name: "Manish Saini",
    role: "Motion Graphic Designer",
    image: "https://i.ibb.co/j9x13hFS/Whats-App-Image-2026-05-21-at-1-20-21-PM-1.jpg"
  }
];

const TeamCard: React.FC<{ member: typeof teamMembers[0], index: number }> = ({ member, index }) => {
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

  const isFounder = member.role.includes('Founder');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="group relative h-full rounded-3xl bg-[rgba(11,18,37,0.65)] border border-white/5 overflow-hidden transition-all duration-500 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:-translate-y-2 select-none"
      >
        {/* Mouse follow light effect */}
        <div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(217, 70, 239, 0.15), transparent 40%)`
          }}
        />

        {/* Ambient Founder Pulse */}
        {isFounder && (
          <div className="absolute inset-0 z-0 rounded-3xl animate-pulse bg-sky-500/5 pointer-events-none" />
        )}

        {/* Card Content Wrapper */}
        <div className="relative z-10 flex flex-col h-full bg-gradient-to-b from-transparent to-[#050816]/90 backdrop-blur-md p-6 lg:p-8">
          
          {/* Circular Image Container */}
          <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border border-white/10 group-hover:border-sky-400/50 transition-colors duration-500 shadow-xl shadow-black/50">
            <div className="absolute inset-0 bg-sky-900/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Glow ring on hover */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(56,189,248,0)] group-hover:shadow-[inset_0_0_20px_rgba(56,189,248,0.5)] transition-shadow duration-500 z-20 pointer-events-none" />
          </div>

          {/* Text Content */}
          <div className="text-center relative z-20 flex-grow flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-200 tracking-tight mb-2 group-hover:text-white transition-colors duration-300 capitalize">{member.name}</h3>
            <div className="inline-block relative">
              <span className="text-sky-400 font-medium tracking-wide text-sm bg-sky-500/10 px-4 py-1.5 rounded-full border border-sky-500/20 group-hover:bg-sky-500/20 transition-colors duration-300">
                {member.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Team() {
  return (
    <section id="team" className="py-32 relative overflow-hidden bg-transparent">
      {/* Premium Cinematic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Subtle Neon Glow for the heading area */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[40%] h-[100px] bg-gradient-to-r from-sky-500/10 to-cyan-500/10 blur-[50px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
            <span className="text-xs font-semibold tracking-widest text-neutral-300 capitalize">Meet Our Creative Team</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight group capitalize">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">The Creative Minds</span> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-500 drop-shadow-[0_0_10px_rgba(56,189,248,0.2)]">Behind The Magic</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-transparent mx-auto mb-8 rounded-full opacity-50" />
          
          <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
            The Creative Minds Behind Premium Content & Digital Experiences
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 max-w-7xl mx-auto mb-32">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* Join Our Team / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden mt-20"
        >
          {/* CTA Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/10 to-cyan-900/10 backdrop-blur-xl border border-white/10 rounded-3xl z-0" />
          
          <div className="relative z-10 p-12 md:p-16 text-center flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 capitalize">Join Our Team</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm md:text-base">
              We're always looking for exceptional talent. If you have an eye for cinematic design and premium development, we want to hear from you.
            </p>
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-join-team-modal'));
              }}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 ease-in-out bg-white/5 border border-white/10 rounded-full hover:bg-sky-600 hover:border-sky-500 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:text-white hover:scale-105 active:scale-95">
              <span>Work With Us</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
