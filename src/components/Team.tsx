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
        className="group relative h-full rounded-3xl bg-[rgba(11,18,37,0.65)] border border-white/5 overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-2 select-none"
      >
        {/* Mouse follow light effect */}
        <div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(96, 165, 250, 0.15), transparent 40%)`
          }}
        />

        {/* Ambient Founder Pulse */}
        {isFounder && (
          <div className="absolute inset-0 z-0 rounded-3xl animate-pulse bg-blue-500/5 pointer-events-none" />
        )}

        {/* Card Content Wrapper */}
        <div className="relative z-10 flex flex-col h-full bg-gradient-to-b from-transparent to-[#050816]/90 backdrop-blur-md p-6 lg:p-8">
          
          {/* Circular Image Container */}
          <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border border-white/10 group-hover:border-blue-400/50 transition-colors duration-500 shadow-xl shadow-black/50">
            <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Glow ring on hover */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(59,130,246,0)] group-hover:shadow-[inset_0_0_20px_rgba(59,130,246,0.5)] transition-shadow duration-500 z-20 pointer-events-none" />
          </div>

          {/* Text Content */}
          <div className="text-center relative z-20 flex-grow flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-200 tracking-tight mb-2 group-hover:text-white transition-colors duration-300">{member.name}</h3>
            <div className="inline-block relative">
              <span className="text-blue-400 font-medium tracking-wide text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors duration-300">
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      
      {/* Floating Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none animate-pulse duration-1000" />
      
      {/* Spotlight Effect behind heading */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/10 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-blue-300 uppercase">Meet Our Creative Team</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight group">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">The Creative Minds</span> <br/>
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-pulse duration-[3000ms]">Behind The Magic</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent mx-auto mb-8 rounded-full" />
          
          <p className="text-lg text-gray-400 leading-relaxed font-light">
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-xl border border-white/10 rounded-3xl z-0" />
          
          <div className="relative z-10 p-12 md:p-16 text-center flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Join Our Team</h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              We're always looking for exceptional talent. If you have an eye for cinematic design and premium development, we want to hear from you.
            </p>
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-work-modal'));
              }}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 ease-in-out bg-white/5 border border-white/10 rounded-full hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:text-white hover:scale-105 active:scale-95">
              <span>Join Our Team</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
