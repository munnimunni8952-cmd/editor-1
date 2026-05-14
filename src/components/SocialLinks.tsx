import { motion } from 'motion/react';
import { Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    icon: Instagram,
    link: "ADD_MY_INSTAGRAM_LINK",
    gradient: "from-purple-500 via-pink-500 to-orange-500",
    glowColor: "rgba(236, 72, 153, 0.6)",
    shadowClass: "hover:shadow-[0_0_40px_rgba(236,72,153,0.5)]"
  },
  {
    name: "Facebook",
    icon: Facebook,
    link: "ADD_MY_FACEBOOK_LINK",
    gradient: "from-blue-600 to-blue-400",
    glowColor: "rgba(59, 130, 246, 0.6)",
    shadowClass: "hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
  },
  {
    name: "YouTube",
    icon: Youtube,
    link: "ADD_MY_YOUTUBE_LINK",
    gradient: "from-red-600 to-red-400",
    glowColor: "rgba(239, 68, 68, 0.6)",
    shadowClass: "hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]"
  }
];

export default function SocialLinks() {
  return (
    <section id="socials" className="py-24 relative overflow-hidden bg-transparent">
      {/* Cinematic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-pink-600/5 via-purple-600/5 to-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="px-6 md:px-12 max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mb-4">
            Follow Me On <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">Social Media</span>
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Stay updated with my latest cinematic edits, behind-the-scenes content, and premium tutorials.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {SOCIAL_LINKS.map((social, index) => {
            const Icon = social.icon;

            return (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15, type: "spring", bounce: 0.5 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className={`relative group flex flex-col items-center gap-4 ${social.shadowClass} p-8 rounded-3xl transition-all duration-300 w-full md:w-auto min-w-[200px]`}
              >
                {/* Background Glass Plate */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/20 rounded-3xl transition-colors duration-300" />
                
                {/* Floating Glow Behind Icon */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 blur-xl rounded-full z-0 pointer-events-none"
                  style={{ backgroundColor: social.glowColor }}
                />

                {/* Animated Icon Container */}
                <motion.div 
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br ${social.gradient} p-[1px] group-hover:scale-110 transition-transform duration-500`}
                >
                  <div className="w-full h-full bg-black/60 rounded-2xl flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
                    {/* Inner highlight */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" />
                  </div>
                </motion.div>

                {/* Text Content */}
                <div className="relative z-10 text-center flex items-center gap-2">
                  <span className={`font-bold text-xl tracking-wide text-white group-hover:text-transparent bg-clip-text bg-gradient-to-r ${social.gradient} transition-all duration-300`}>
                    Follow {social.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 duration-300" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
