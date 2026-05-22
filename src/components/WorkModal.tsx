import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Check } from 'lucide-react';

const EDITING_OPTIONS = [
  "Reels",
  "YouTube Videos",
  "Shorts",
  "Podcasts",
  "Thumbnails",
  "Logos",
  "Social Media Posts",
  "Cinematic Videos",
  "Documentary Videos",
  "Motion Graphics"
];

export default function WorkModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [nameError, setNameError] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    services: [] as string[],
    message: ''
  });

  useEffect(() => {
    const handleOpen = (e: Event) => {
      e.preventDefault();
      setIsOpen(true);
      setNameError("");
    };
    window.addEventListener('open-work-modal', handleOpen);
    return () => window.removeEventListener('open-work-modal', handleOpen);
  }, []);

  const toggleService = (service: string) => {
    setFormData(prev => {
      if (prev.services.includes(service)) {
        return { ...prev, services: prev.services.filter(s => s !== service) };
      }
      return { ...prev, services: [...prev.services, service] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setNameError("Name is required to continue.");
      return;
    }
    setNameError("");

    const servicesText = formData.services.length > 0 ? formData.services.join(', ') : 'None specified';
    const message = `Hello, I want to discuss a project.\nName: ${formData.name}\nServices Needed: ${servicesText}\nMessage: ${formData.message || 'N/A'}`;
    
    const whatsappUrl = `https://wa.me/916377033649?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setFormData({ name: '', services: [], message: '' });
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
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar rounded-[24px] border border-white/10 bg-[#0B1225]/80 p-8 shadow-[0_0_50px_rgba(217,70,239,0.15)] backdrop-blur-2xl"
          >
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#d946ef]/50 to-transparent" />
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 rounded-full p-2 bg-white/5 border border-white/10 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="mb-8">
              <h3 className="mb-2 text-3xl font-display font-bold tracking-tight text-white flex items-center gap-2">
                Discuss Your Project <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse shadow-[0_0_10px_rgba(217,70,239,0.4)]"></span>
              </h3>
              <p className="text-sm md:text-base text-gray-400 font-light">Tell us about your next big idea. We specialize in premium cinematic design and development.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-fuchsia-400">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (e.target.value.trim()) setNameError("");
                  }}
                  className={`w-full rounded-xl border ${nameError ? 'border-red-500/50' : 'border-white/10'} bg-black/40 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-fuchsia-500/50 focus:bg-[#0B1225] focus:shadow-[0_0_10px_rgba(217,70,239,0.2)]`}
                  placeholder="John Doe"
                />
                {nameError && <p className="text-red-400 text-xs mt-2 animate-pulse">{nameError}</p>}
              </div>

              <div>
                <label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-fuchsia-400">
                  What do you want to edit?
                </label>
                <div className="flex flex-wrap gap-3">
                  {EDITING_OPTIONS.map((option) => {
                    const isSelected = formData.services.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleService(option)}
                        className={`group flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                          isSelected
                            ? 'border-fuchsia-500 bg-fuchsia-500/10 text-white shadow-[0_0_10px_rgba(217,70,239,0.2)] scale-[1.02]'
                            : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className={`flex h-4 w-4 items-center justify-center rounded-full border border-white/20 transition-colors ${isSelected ? 'bg-fuchsia-500 border-fuchsia-500' : 'bg-transparent'}`}>
                          {isSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </div>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-fuchsia-400">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-fuchsia-500/50 focus:bg-[#0B1225] focus:shadow-[0_0_10px_rgba(217,70,239,0.2)] resize-none"
                  placeholder="Tell us about your project..."
                  rows={4}
                ></textarea>
              </div>

              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-400 to-purple-500 px-4 py-4 text-[15px] font-bold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] active:scale-[0.98]"
              >
                Discuss Project
                <Send className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
