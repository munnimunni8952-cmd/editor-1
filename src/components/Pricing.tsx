import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Zap, Crown, Clock, ShieldCheck, Headset, ArrowRight, Video, PlaySquare, Youtube, Palette, Image as ImageIcon, Layout, Star } from 'lucide-react';

const CATEGORIES = [
  {
    title: "REEL EDITING",
    plans: [
      {
        id: "reel-basic",
        title: "Basic Reel Editing",
        icon: Video,
        price: "999",
        priceSuffix: " / Reel",
        features: [
          "Clean Editing",
          "Captions",
          "HD Quality",
          "Fast Delivery"
        ],
        borderClass: "border-white/5 group-hover:border-sky-500/50",
        shadowClass: "hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
        btnText: "Get Started",
        accentText: "text-gray-300",
        glowColor: "rgba(56,189,248, 0.15)",
      },
      {
        id: "reel-advanced",
        title: "Advanced Reel Editing",
        icon: Zap,
        badge: "Most Popular",
        price: "1999",
        priceSuffix: " / Reel",
        features: [
          "Viral Editing",
          "Motion Graphics",
          "Sound Design",
          "Premium Captions"
        ],
        borderClass: "border-sky-500/40 group-hover:border-sky-400/80",
        shadowClass: "hover:shadow-[0_0_50px_rgba(56,189,248,0.3)]",
        btnText: "Get Started",
        accentText: "text-sky-400",
        isPopular: true,
        glowColor: "rgba(96, 165, 250, 0.3)",
      },
      {
        id: "reel-cinematic",
        title: "Premium Cinematic",
        icon: Crown,
        price: "2999",
        priceSuffix: " / Reel",
        features: [
          "Cinematic Editing",
          "Advanced Effects",
          "Color Grading",
          "Luxury Visuals",
          "Priority Delivery"
        ],
        borderClass: "border-white/10 group-hover:border-gray-300/60",
        shadowClass: "hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]",
        btnText: "Get Started",
        accentText: "text-gray-300",
        isPremium: true,
        glowColor: "rgba(255, 255, 255, 0.15)",
      },
      {
        id: "reel-elite",
        title: "Advance Premium Editing",
        icon: Crown,
        badge: "Featured / Best Value",
        price: "3999",
        priceSuffix: " / Reel",
        features: [
          "Cinematic / Elite Editing",
          "Documentary-style editing",
          "Viral retention strategy",
          "Professional color grading",
          "High-end sound design",
          "Movie-like feel",
          "Personal editor support"
        ],
        borderClass: "border-sky-500/40 group-hover:border-sky-500/80",
        shadowClass: "shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:shadow-[0_0_70px_rgba(56,189,248,0.4)]",
        btnText: "Get Elite Edit",
        accentText: "text-sky-400",
        isPopular: true,
        glowColor: "rgba(77, 163, 255, 0.5)",
      }
    ]
  },
  {
    title: "YOUTUBE EDITING",
    plans: [
      {
        id: "yt-basic",
        title: "Basic YouTube Editing",
        icon: PlaySquare,
        price: "499",
        priceSuffix: " / Minute",
        features: [
          "Clean Editing",
          "Basic Transitions",
          "Captions",
          "HD Export"
        ],
        borderClass: "border-white/5 group-hover:border-sky-500/50",
        shadowClass: "hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
        btnText: "Get Started",
        accentText: "text-gray-300",
        glowColor: "rgba(56,189,248, 0.15)",
      },
      {
        id: "yt-advanced",
        title: "Advanced YouTube",
        icon: Zap,
        badge: "Most Popular",
        price: "999",
        priceSuffix: " / Minute",
        features: [
          "Viral Style Editing",
          "Motion Graphics",
          "Sound Design",
          "Premium Captions"
        ],
        borderClass: "border-sky-500/40 group-hover:border-sky-400/80",
        shadowClass: "hover:shadow-[0_0_50px_rgba(56,189,248,0.3)]",
        btnText: "Get Started",
        accentText: "text-sky-400",
        isPopular: true,
        glowColor: "rgba(96, 165, 250, 0.3)",
      },
      {
        id: "yt-premium",
        title: "Premium Cinematic",
        icon: Youtube,
        price: "1499",
        priceSuffix: " / Minute",
        features: [
          "Cinematic Editing",
          "Advanced Effects",
          "Color Grading",
          "Luxury Visual Feel"
        ],
        borderClass: "border-white/10 group-hover:border-gray-300/60",
        shadowClass: "hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]",
        btnText: "Get Started",
        accentText: "text-gray-300",
        glowColor: "rgba(255, 255, 255, 0.15)",
      },
      {
        id: "yt-docu",
        title: "Documentary Style",
        icon: Crown,
        price: "1999",
        priceSuffix: " / Minute",
        features: [
          "Storytelling Edit",
          "Cinematic Narrative",
          "3D Camera Animation",
          "Advanced Sound Design",
          "Documentary Visual Style",
          "High-End Color Grading",
          "Premium Motion Graphics"
        ],
        borderClass: "border-white/10 group-hover:border-sky-500/60",
        shadowClass: "hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]",
        btnText: "Get Started",
        accentText: "text-gray-200",
        isPremium: true,
        glowColor: "rgba(56,189,248, 0.2)",
      }
    ]
  },
  {
    title: "GRAPHICS DESIGN",
    plans: [
      {
        id: "gd-social",
        title: "Social Media Post",
        icon: Layout,
        price: "499",
        priceSuffix: " / Post",
        features: [
          "Instagram Posts",
          "Promotional Designs",
          "Brand Posts",
          "Professional Layouts"
        ],
        borderClass: "border-white/5 group-hover:border-sky-500/50",
        shadowClass: "hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
        btnText: "Get Started",
        accentText: "text-gray-300",
        glowColor: "rgba(56,189,248, 0.15)",
      },
      {
        id: "gd-premium-post",
        title: "Premium Creative Post",
        icon: Star,
        badge: "Most Popular",
        price: "999",
        priceSuffix: " / Post",
        features: [
          "High-End Creative Design",
          "Advanced Typography",
          "Premium Visual Style",
          "Brand-Focused Design"
        ],
        borderClass: "border-sky-500/40 group-hover:border-sky-400/80",
        shadowClass: "hover:shadow-[0_0_50px_rgba(56,189,248,0.3)]",
        btnText: "Get Started",
        accentText: "text-sky-400",
        isPopular: true,
        glowColor: "rgba(96, 165, 250, 0.3)",
      },
      {
        id: "gd-thumb",
        title: "Professional Thumbnail",
        icon: ImageIcon,
        price: "999",
        priceSuffix: " / Thumb",
        features: [
          "High CTR Design",
          "Bold Typography",
          "Professional Look",
          "YouTube Optimized"
        ],
        borderClass: "border-white/10 group-hover:border-sky-500/50",
        shadowClass: "hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
        btnText: "Get Started",
        accentText: "text-gray-300",
        glowColor: "rgba(56,189,248, 0.15)",
      },
      {
        id: "gd-cinematic-thumb",
        title: "Cinematic Thumbnail",
        icon: Crown,
        price: "1499",
        priceSuffix: " / Thumb",
        features: [
          "Cinematic Style",
          "Advanced Manipulation",
          "Premium Effects",
          "High Click-Through Design"
        ],
        borderClass: "border-white/10 group-hover:border-sky-500/60",
        shadowClass: "hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]",
        btnText: "Get Started",
        accentText: "text-gray-200",
        isPremium: true,
        glowColor: "rgba(56,189,248, 0.2)",
      },
      {
        id: "gd-reel-cover",
        title: "Reel Cover Design",
        icon: Video,
        price: "499",
        priceSuffix: " / Cover",
        features: [
          "Instagram Reel Covers",
          "Clean Branding",
          "Professional Layout",
          "Matching Theme"
        ],
        borderClass: "border-white/5 group-hover:border-sky-500/50",
        shadowClass: "hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
        btnText: "Get Started",
        accentText: "text-gray-300",
        glowColor: "rgba(56,189,248, 0.15)",
      },
      {
        id: "gd-banner",
        title: "Business Banner Design",
        icon: Layout,
        price: "999",
        priceSuffix: " / Banner",
        features: [
          "Website Banners",
          "YouTube Banners",
          "Social Media Headers",
          "Brand Style Design"
        ],
        borderClass: "border-white/5 group-hover:border-sky-500/50",
        shadowClass: "hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
        btnText: "Get Started",
        accentText: "text-gray-300",
        glowColor: "rgba(56,189,248, 0.15)",
      },
      {
        id: "gd-carousel",
        title: "Carousel Post Design",
        icon: Palette,
        price: "999",
        priceSuffix: " / 5 Slides",
        features: [
          "Instagram Carousel Posts",
          "Professional Layout",
          "Modern Typography",
          "Brand Style Design",
          "High Engagement Design"
        ],
        borderClass: "border-white/5 group-hover:border-sky-500/50",
        shadowClass: "hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
        btnText: "Get Started",
        accentText: "text-gray-300",
        glowColor: "rgba(56,189,248, 0.15)",
      },
      {
        id: "gd-logo",
        title: "Logo Designing",
        icon: Crown,
        badge: "Featured / Best Value",
        price: "4999",
        priceSuffix: " / Logo",
        features: [
          "Custom Premium Logo",
          "Brand Guidelines included",
          "High-Resolution Vector Source",
          "Multiple Revisions",
          "Premium Agency Quality",
          "Professional Typography",
          "Priority Delivery & Support"
        ],
        borderClass: "border-sky-500/40 group-hover:border-sky-500/80",
        shadowClass: "shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:shadow-[0_0_70px_rgba(56,189,248,0.4)]",
        btnText: "Get Premium Logo",
        accentText: "text-sky-400",
        isPopular: true,
        glowColor: "rgba(77, 163, 255, 0.5)",
      }
    ]
  }
];

const TRUST_BADGES = [
  { text: "Fast Delivery", icon: Clock },
  { text: "Premium Quality", icon: ShieldCheck },
  { text: "24/7 Support", icon: Headset },
];

const PricingCard: React.FC<{ plan: any; index: number; handleOrder: (name: string) => void }> = ({ plan, index, handleOrder }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - left, y: e.clientY - top });
  };

  const Icon = plan.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative group h-full rounded-[1.5rem] p-[1px] bg-gradient-to-b ${plan.borderClass} ${plan.shadowClass} transition-all duration-500`}
      style={{ transformOrigin: 'bottom center' }}
    >
      {/* Interactive Cursor Glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none rounded-[1.5rem] transition-opacity duration-300 overflow-hidden"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${plan.glowColor}, transparent 40%)`
        }}
      />

      {/* Floating Glow Behind Popular Card */}
      {plan.isPopular && (
         <div className="absolute -inset-2 bg-gradient-to-r from-sky-500 to-sky-400 opacity-30 blur-xl rounded-full z-0 pointer-events-none" />
      )}

      <div className={`relative h-full z-10 flex flex-col rounded-[23px] bg-[#050816] box-border overflow-hidden ${plan.isPopular ? 'transform hover:-translate-y-2 transition-transform duration-300 shadow-[0_0_30px_rgba(56,189,248,0.2)] bg-gradient-to-br from-[#0B1225] to-[#050816]' : 'bg-gradient-to-br from-[#050816] to-[#0a101f]'}`}>
        
        {/* Badges */}
        {plan.badge && (
          <div className="absolute top-0 inset-x-0 flex justify-center translate-y-[-1px]">
            <div className={`px-4 py-1.5 rounded-b-xl text-[10px] font-bold tracking-widest capitalize flex items-center gap-1.5 shadow-lg ${
              plan.isPopular ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white' : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
            }`}>
              {plan.isPopular && <Zap className="w-3.5 h-3.5" />}
              {plan.isPremium && <Crown className="w-3.5 h-3.5" />}
              {plan.badge}
            </div>
          </div>
        )}

        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-6 mt-4">
            <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${plan.accentText === 'text-silver-400' ? 'text-gray-300' : plan.accentText}`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight capitalize">{plan.title}</h3>
          </div>

          <div className="mb-8">
            <span className="text-gray-400 font-semibold text-2xl mr-1">₹</span>
            <span className={`text-5xl font-display font-bold ${plan.accentText === 'text-silver-400' ? 'text-white' : plan.accentText}`}>{plan.price}</span>
            {plan.priceSuffix && <span className="text-sm text-gray-500 font-medium ml-1">{plan.priceSuffix}</span>}
          </div>

          <div className="flex-grow space-y-4 mb-10">
            {plan.features.map((feature: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.isPopular ? 'text-sky-400' : 'text-gray-400'}`} />
                <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleOrder(plan.title)}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 group/btn relative overflow-hidden transition-all duration-300 ${
              plan.isPopular 
                ? `bg-gradient-to-r text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] from-sky-600 to-sky-500 border border-sky-400/50 backdrop-blur-md`
                : `bg-gradient-to-r from-sky-900/40 to-sky-800/40 hover:from-sky-600 hover:to-sky-500 text-white border border-sky-500/30 hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] backdrop-blur-md`
            }`}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shimmer" />
            
            <span className="relative z-10">{plan.btnText}</span>
            <div className="relative z-10 flex overflow-hidden w-5 h-5">
              <ArrowRight className="w-5 h-5 absolute transition-transform duration-300 group-hover/btn:translate-x-5" />
              <ArrowRight className="w-5 h-5 absolute -translate-x-5 transition-transform duration-300 group-hover/btn:translate-x-0" />
            </div>
            
            {/* Soft Breathing Glow Container inside button on hover */}
            <div className="absolute inset-0 bg-sky-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const handleOrder = (planName: string) => {
    const text = `Hi, I am interested in the ${planName} plan. Let's discuss details!`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const phoneNumber = import.meta.env.VITE_CONTACT_PHONE || "916377033649";
    const whatsappUrl = isMobile 
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(text)}` 
      : `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-sky-600/10 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-sky-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-[pulse_2s_ease-in-out_infinite]" />
            <span className="text-xs font-semibold tracking-widest text-neutral-300 uppercase">Premium Creative Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight capitalize">
            Professional Video Editing <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">& Design Solutions</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            For modern creators and brands looking to elevate their visual identity.
          </p>
        </motion.div>

        {CATEGORIES.map((category, catIndex) => (
          <div key={catIndex} className="mb-24 last:mb-16">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-display font-bold text-white mb-10 tracking-widest text-center border-b border-white/10 pb-6 w-full max-w-3xl mx-auto capitalize"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">{category.title}</span>
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 justify-center">
              {category.plans.map((plan, index) => (
                <PricingCard key={plan.id} plan={plan} index={index} handleOrder={handleOrder} />
              ))}
            </div>
          </div>
        ))}

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-20 pt-10 border-t border-white/5"
        >
          {TRUST_BADGES.map((badge, index) => {
            const BadgeIcon = badge.icon;
            return (
              <div key={index} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-[#0B1225] flex items-center justify-center text-sky-500 border border-white/10 shadow-[0_0_15px_rgba(56,189,248,0.1)] transition-colors group-hover:border-sky-500/50 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                  <BadgeIcon className="w-4 h-4" />
                </div>
                <span className="text-gray-400 font-medium text-sm md:text-base tracking-wide capitalize group-hover:text-gray-300 transition-colors">{badge.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
