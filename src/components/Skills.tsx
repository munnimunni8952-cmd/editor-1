import { useState } from 'react';
import { motion } from 'motion/react';

const SKILLS = [
  { 
    name: "ChatGPT", 
    image: "https://i.ibb.co/JWnjkkHP/image.png", 
    color: "from-teal-400 to-emerald-500", 
    glow: "rgba(16, 163, 127, 0.4)",
    level: 95,
    description: "Advanced prompt engineering, scriptwriting, and rapid AI-assisted ideation."
  },
  { 
    name: "Premiere Pro", 
    image: "https://i.ibb.co/RT9HzbVG/image.png", 
    color: "from-[#9999FF] to-[#00005C]", 
    glow: "rgba(153, 153, 255, 0.4)",
    level: 90,
    description: "Industry-standard video editing, color grading, and dynamic cinematic pacing."
  },
  { 
    name: "CapCut", 
    image: "https://i.ibb.co/0j9DgDXM/image.png", 
    color: "from-white to-gray-500", 
    glow: "rgba(255, 255, 255, 0.3)",
    level: 92,
    description: "Trendy edits, viral effects, and optimized workflows for short-form content."
  },
  { 
    name: "After Effects", 
    image: "https://i.ibb.co/67Q18SjQ/image.png", 
    color: "from-[#D8A7FF] to-[#00005C]", 
    glow: "rgba(216, 167, 255, 0.4)",
    level: 85,
    description: "Complex motion graphics, visual effects, and customized cinematic animations."
  },
  { 
    name: "Photoshop", 
    image: "https://i.ibb.co/xSG3GYFc/image.png", 
    color: "from-[#31A8FF] to-[#001E36]", 
    glow: "rgba(49, 168, 255, 0.4)",
    level: 88,
    description: "High-CTR thumbnail design, photo manipulation, and precise visual branding."
  },
  { 
    name: "Social Media Creation", 
    image: "https://i.ibb.co/67kmgqtK/image.png", 
    color: "from-pink-500 to-purple-600", 
    glow: "rgba(255, 0, 127, 0.4)",
    level: 96,
    description: "Audience retention strategies, viral storytelling, and multi-platform growth."
  },
];

function SkillCard({ skill, index }: { skill: any; index: number }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative group rounded-3xl"
    >
      {/* Background glow that activates on hover */}
      <div 
        className="absolute -inset-1 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition duration-500"
        style={{ 
          background: skill.glow,
          boxShadow: `0 0 30px ${skill.glow}`
        }}
      />
      
      {/* Card Content */}
      <div className="relative h-full bg-black/60 backdrop-blur-xl border border-white/10 group-hover:border-white/20 p-8 rounded-3xl transition-all duration-500 overflow-hidden text-left flex flex-col">
        {/* Subtle Top Gradient Line */}
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${skill.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
        
        <div className="flex items-start justify-between mb-8">
          {/* Logo Container with floating animation */}
          <motion.div 
            animate={isHovering ? { y: [-2, 2, -2] } : { y: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center p-[1px] bg-gradient-to-br ${skill.color} shadow-lg shadow-black/50`}
          >
            <div className="w-full h-full bg-black/80 rounded-2xl flex items-center justify-center backdrop-blur-md overflow-hidden p-2">
              <img 
                src={skill.image} 
                alt={`${skill.name} logo`} 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </motion.div>
          
          <span className="text-4xl font-display font-bold text-white/10 group-hover:text-white/30 transition-colors duration-500">
            {skill.level}%
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{skill.name}</h3>
        <p className="text-gray-400 text-sm font-light mb-8 flex-grow leading-relaxed">
          {skill.description}
        </p>

        {/* Animated Progress Bar */}
        <div className="w-full relative">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500 group-hover:text-gray-300 transition-colors">
            <span>Proficiency</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            {/* The progress bar width shrinks slightly initially, then expands when scrolled into view */}
            <motion.div
              className={`h-full bg-gradient-to-r ${skill.color} shadow-[0_0_10px_currentColor]`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Cinematic Dark Background with Moving Gradient Lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-1/4 w-[50vw] h-[50vw] bg-pink-600/10 blur-[100px] rounded-full mix-blend-screen" 
        />
        <div 
          className="absolute bottom-0 left-1/4 w-[40vw] h-[40vw] bg-cyan-600/10 blur-[100px] rounded-full mix-blend-screen" 
        />
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/5 text-xs font-medium tracking-wide text-pink-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            MY EXPERTISE
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight mb-6">
            Arsenal of <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Capabilities</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Mastery over industry-standard tools combined with cutting-edge AI technologies to deliver fast, stunning, and highly engaging results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SKILLS.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
