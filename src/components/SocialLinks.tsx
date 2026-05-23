import { motion } from 'motion/react';
import { Instagram, Facebook, Youtube, ExternalLink, Linkedin } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://www.instagram.com/trimclipedits?igsh=cmU0N3dudnBjamRv",
    gradient: "from-[#833AB4] via-[#FD1D1D] to-[#F56040]",
    glowColor: "rgba(225, 48, 108, 0.6)",
    shadowClass: "hover:shadow-[0_0_30px_rgba(225,48,108,0.3)]"
  },
  {
    name: "Facebook",
    icon: Facebook,
    link: "https://www.facebook.com/share/1ELbbACcTR/",
    gradient: "from-[#1877F2] to-[#0A5BC4]",
    glowColor: "rgba(24, 119, 242, 0.6)",
    shadowClass: "hover:shadow-[0_0_30px_rgba(24,119,242,0.3)]"
  },
  {
    name: "YouTube",
    icon: Youtube,
    link: "https://youtube.com/@ankitsharma-e3g8u?si=RzLTYKMDGst_NzOv",
    gradient: "from-[#FF0000] to-[#CC0000]",
    glowColor: "rgba(255, 0, 0, 0.6)",
    shadowClass: "hover:shadow-[0_0_30px_rgba(255,0,0,0.3)]"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    link: "https://www.linkedin.com/in/trimclipedits-video-editing-services-4771713a1?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    gradient: "from-[#0077B5] to-[#005E93]",
    glowColor: "rgba(0, 119, 181, 0.6)",
    shadowClass: "hover:shadow-[0_0_30px_rgba(0,119,181,0.3)]"
  }
];

export default function SocialLinks() {
  return (
    <section id="socials" className="py-24 relative overflow-hidden bg-transparent">
      {/* Cinematic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-sky-600/5 via-cyan-600/5 to-sky-600/5 blur-[60px] pointer-events-none" />

      <div className="px-6 md:px-12 max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight capitalize">
            Follow Me On <span className="bg-gradient-to-r from-sky-400 to-cyan-500 bg-clip-text text-transparent">Social Media</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Stay updated with my latest cinematic edits, behind-the-scenes content, and premium tutorials.
          </p>
        </motion.div>

        <div className="flex flex-row flex-nowrap items-center justify-center gap-4 sm:gap-6 md:gap-10 overflow-x-auto pb-4 hide-scrollbar w-full">
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
                whileHover={{ scale: 1.1, y: -4 }}
                className={`relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 ${social.shadowClass} bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl md:rounded-3xl transition-all duration-300`}
              >
                {/* Floating Glow Behind Icon */}
                <div
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 rounded-full z-0 pointer-events-none transition-opacity duration-500"
                  style={{ backgroundColor: social.glowColor }}
                />

                {/* Static Icon Container */}
                <div 
                  className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${social.gradient} p-[1px] transition-transform duration-500`}
                >
                  <div className="w-full h-full bg-black/70 group-hover:bg-transparent rounded-xl flex items-center justify-center backdrop-blur-sm relative overflow-hidden transition-colors duration-500">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white relative z-10 group-hover:drop-shadow-lg transition-transform duration-500" />
                  </div>
                </div>

                {/* Text Content (Tooltip-like for desktop, hidden on small screens depending on preference, but the user requested smaller icons. Let's add a tooltip) */}
                <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
                  <span className={`font-bold text-xs font-display tracking-widest capitalize text-transparent bg-clip-text bg-gradient-to-r ${social.gradient}`}>
                    {social.name}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
