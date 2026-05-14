import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Zap, Crown, Clock, ShieldCheck, Headset, ArrowRight, Video, PlaySquare, Youtube } from 'lucide-react';

const PLANS = [
  {
    id: "1-reel",
    title: "1 Reel Video Editing",
    icon: PlaySquare,
    price: "99",
    features: [
      "High-quality edit",
      "Smooth transitions",
      "Trending effects",
      "Fast delivery"
    ],
    bgGradient: "from-cyan-500/5 to-blue-500/5",
    borderClass: "border-cyan-500/20 group-hover:border-cyan-400/50",
    shadowClass: "hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]",
    btnGradient: "from-cyan-500 to-blue-600",
    btnText: "Order Now",
    accentText: "text-cyan-400",
    glowColor: "rgba(34, 211, 238, 0.15)"
  },
  {
    id: "5-reels",
    title: "5 Reels Video Editing",
    icon: Zap,
    badge: "Most Popular",
    price: "349",
    features: [
      "Professional editing",
      "Viral-style effects",
      "HD export",
      "Fast support"
    ],
    bgGradient: "from-pink-500/10 to-rose-500/10",
    borderClass: "border-pink-500/40 group-hover:border-pink-400/80",
    shadowClass: "hover:shadow-[0_0_55px_rgba(236,72,153,0.4)]",
    btnGradient: "from-pink-500 to-rose-600",
    btnText: "Order Now",
    accentText: "text-pink-400",
    isPopular: true,
    glowColor: "rgba(236, 72, 153, 0.15)"
  },
  {
    id: "10-reels",
    title: "10 Reels Video Editing",
    icon: Crown,
    badge: "Premium",
    price: "799",
    features: [
      "Premium cinematic edit",
      "Advanced transitions",
      "Color grading",
      "Priority delivery"
    ],
    bgGradient: "from-amber-500/5 to-orange-500/5",
    borderClass: "border-amber-500/20 group-hover:border-amber-400/60",
    shadowClass: "hover:shadow-[0_0_45px_rgba(245,158,11,0.35)]",
    btnGradient: "from-amber-500 to-orange-600",
    btnText: "Order Now",
    accentText: "text-amber-400",
    isPremium: true,
    glowColor: "rgba(245, 158, 11, 0.15)"
  },
  {
    id: "youtube",
    title: "YouTube Video Editing",
    icon: Youtube,
    price: "199",
    priceSuffix: " - ₹499",
    features: [
      "Long video editing",
      "Intro/outro addition",
      "Pro Sound effects",
      "Thumbnail-ready export"
    ],
    bgGradient: "from-purple-500/5 to-indigo-500/5",
    borderClass: "border-purple-500/20 group-hover:border-purple-400/50",
    shadowClass: "hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]",
    btnGradient: "from-purple-500 to-indigo-600",
    btnText: "Custom Project",
    accentText: "text-purple-400",
    glowColor: "rgba(168, 85, 247, 0.15)"
  }
];

const TRUST_BADGES = [
  { text: "Fast Delivery", icon: Clock },
  { text: "Premium Quality", icon: ShieldCheck },
  { text: "24/7 Support", icon: Headset },
];

function PricingCard({ plan, index, handleOrder }: { plan: any; index: number; handleOrder: (name: string) => void }) {
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
      className={`relative group h-full rounded-3xl p-[1px] bg-gradient-to-b ${plan.borderClass} ${plan.shadowClass} transition-all duration-500`}
      style={{ transformOrigin: 'bottom center' }}
    >
      {/* Interactive Cursor Glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none rounded-3xl transition-opacity duration-300 overflow-hidden"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${plan.glowColor}, transparent 40%)`
        }}
      />

      {/* Floating Glow Behind Popular Card */}
      {plan.isPopular && (
         <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-orange-500 opacity-20 blur-xl rounded-full z-0 pointer-events-none" />
      )}

      <div className={`relative h-full z-10 flex flex-col rounded-[23px] bg-gradient-to-br ${plan.bgGradient} backdrop-blur-xl bg-black/80 overflow-hidden ${plan.isPopular ? 'transform hover:-translate-y-2 transition-transform duration-300 shadow-[0_0_30px_rgba(236,72,153,0.3)]' : ''}`}>
        
        {/* Badges */}
        {plan.badge && (
          <div className="absolute top-0 inset-x-0 flex justify-center translate-y-[-1px]">
            <div className={`px-4 py-1.5 rounded-b-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg ${
              plan.isPopular ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
            }`}>
              {plan.isPopular && <Zap className="w-3.5 h-3.5" />}
              {plan.isPremium && <Crown className="w-3.5 h-3.5" />}
              {plan.badge}
            </div>
          </div>
        )}

        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-6 mt-2">
            <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${plan.accentText}`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">{plan.title}</h3>
          </div>

          <div className="mb-8">
            <span className="text-gray-400 font-semibold text-2xl">₹</span>
            <span className={`text-5xl font-display font-bold ${plan.accentText}`}>{plan.price}</span>
            {plan.priceSuffix && <span className="text-xl text-gray-400 font-semibold">{plan.priceSuffix}</span>}
          </div>

          <div className="flex-grow space-y-4 mb-10">
            {plan.features.map((feature: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.accentText}`} />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleOrder(plan.title)}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 group/btn relative overflow-hidden transition-all duration-300 ${
              plan.isPopular 
                ? `bg-gradient-to-r ${plan.btnGradient} text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]`
                : `bg-white/5 hover:bg-gradient-to-r ${plan.btnGradient} text-white border border-white/10 hover:border-transparent`
            }`}
          >
            <span className="relative z-10">{plan.btnText}</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const handleOrder = (planName: string) => {
    const message = `Hello! I'm interested in the *${planName}* plan. Let's discuss details!`;
    const phoneNumber = "1234567890"; // Replace with actual number
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] bg-pink-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4 text-white">
            Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Premium editing packages designed for creators, brands, and filmmakers looking to level up their content game.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {PLANS.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} handleOrder={handleOrder} />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-12"
        >
          {TRUST_BADGES.map((badge, index) => {
            const BadgeIcon = badge.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-cyan-400 border border-cyan-400/20">
                  <BadgeIcon className="w-5 h-5" />
                </div>
                <span className="text-gray-300 font-medium text-sm md:text-base">{badge.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
