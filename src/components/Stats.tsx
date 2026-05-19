import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Video, Eye, Users, Clock } from 'lucide-react';

const statsData = [
  { 
    label: "Projects", 
    value: 100, 
    suffix: "+", 
    icon: Video, 
    color: "from-cyan-400 to-blue-500",
    shadow: "group-hover:shadow-cyan-500/20"
  },
  { 
    label: "Reel Views", 
    value: 20, 
    suffix: "M+", 
    icon: Eye, 
    color: "from-purple-400 to-pink-500",
    shadow: "group-hover:shadow-purple-500/20"
  },
  { 
    label: "Clients", 
    value: 500, 
    suffix: "+", 
    icon: Users, 
    color: "from-orange-400 to-red-500",
    shadow: "group-hover:shadow-orange-500/20"
  },
  { 
    label: "Delivery", 
    value: 24, 
    suffix: "hr", 
    icon: Clock, 
    color: "from-emerald-400 to-teal-500",
    shadow: "group-hover:shadow-emerald-500/20"
  },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      let startTime: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function (easeOutQuart)
        const ease = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(ease * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 flex items-baseline justify-center">
      <span>{count}</span>
      <span className="text-3xl md:text-4xl">{suffix}</span>
    </div>
  );
};

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#030303] border-y border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative h-full"
              >
                <div className={`relative h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1 hover:border-white/10 shadow-lg ${stat.shadow}`}>
                  
                  {/* Subtle top border gradient line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
                  
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-500`} />
                    <div className="relative inline-flex p-3 rounded-xl bg-white/5 text-white border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Number */}
                  <Counter value={stat.value} suffix={stat.suffix} />
                  
                  {/* Label */}
                  <div className="text-sm md:text-base text-neutral-400 font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
