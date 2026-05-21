import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

export default function WorkModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    experience: '',
    location: '',
    software: ''
  });

  useEffect(() => {
    const handleOpen = (e: Event) => {
      e.preventDefault();
      setIsOpen(true);
    };
    window.addEventListener('open-work-modal', handleOpen);
    return () => window.removeEventListener('open-work-modal', handleOpen);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.experience || !formData.location || !formData.software) return;

    const message = `📩 New Work Request\n\n👤 Name: ${formData.name}\n📱 Mobile: ${formData.mobile}\n💻 Software: ${formData.software}\n⭐ Experience: ${formData.experience}\n📍 Location: ${formData.location}`;
    const whatsappUrl = `https://wa.me/6377033649?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setFormData({ name: '', mobile: '', experience: '', location: '', software: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar rounded-[24px] border border-white/10 bg-[#0B1225]/80 p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-2xl"
          >
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#4DA3FF]/50 to-transparent" />
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 rounded-full p-2 bg-white/5 border border-white/10 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="mb-8">
              <h3 className="mb-2 text-3xl font-display font-bold tracking-tight text-white flex items-center gap-2">
                Work With Us <span className="w-2 h-2 rounded-full bg-[#4DA3FF] animate-pulse shadow-[0_0_10px_#4DA3FF]"></span>
              </h3>
              <p className="text-sm md:text-base text-gray-400 font-light">Join our creative network. Let's build something epic together.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#4DA3FF]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-[#4DA3FF]/50 focus:bg-[#0B1225] focus:shadow-[0_0_15px_rgba(77,163,255,0.2)]"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#4DA3FF]">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-[#4DA3FF]/50 focus:bg-[#0B1225] focus:shadow-[0_0_15px_rgba(77,163,255,0.2)]"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="experience" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#4DA3FF]">
                    Experience
                  </label>
                  <div className="relative">
                    <select
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition-all focus:border-[#4DA3FF]/50 focus:bg-[#0B1225] focus:shadow-[0_0_15px_rgba(77,163,255,0.2)] [&>option]:bg-[#0B1225] [&>option]:text-white"
                      required
                    >
                      <option value="" disabled className="text-gray-500">Select Level</option>
                      <option value="Beginner (0-1 year)">Beginner (0-1 year)</option>
                      <option value="Intermediate (1-3 years)">Intermediate (1-3 years)</option>
                      <option value="Professional (3+ years)">Professional (3+ years)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#4DA3FF]">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-[#4DA3FF]/50 focus:bg-[#0B1225] focus:shadow-[0_0_15px_rgba(77,163,255,0.2)]"
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="software" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#4DA3FF]">
                  Editing Software
                </label>
                <div className="relative">
                  <select
                    id="software"
                    value={formData.software}
                    onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white outline-none transition-all focus:border-[#4DA3FF]/50 focus:bg-[#0B1225] focus:shadow-[0_0_15px_rgba(77,163,255,0.2)] [&>option]:bg-[#0B1225] [&>option]:text-white"
                    required
                  >
                    <option value="" disabled className="text-gray-500">Primary Software</option>
                    <option value="Adobe Premiere Pro">Adobe Premiere Pro</option>
                    <option value="After Effects">After Effects</option>
                    <option value="DaVinci Resolve">DaVinci Resolve</option>
                    <option value="CapCut">CapCut</option>
                    <option value="Final Cut Pro">Final Cut Pro</option>
                    <option value="Filmora">Filmora</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4DA3FF] to-[#6EE7FF] px-4 py-4 text-[15px] font-bold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(77,163,255,0.5)] active:scale-[0.98]"
              >
                Submit Request
                <Send className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
