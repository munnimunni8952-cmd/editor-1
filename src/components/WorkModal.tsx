import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

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
    if (!formData.name || !formData.mobile || !formData.software || !formData.experience || !formData.location) return;

    const message = `📩 New Work Request\n\n👤 Name: ${formData.name}\n📱 Mobile: ${formData.mobile}\n💻 Software: ${formData.software}\n⭐ Experience: ${formData.experience}\n📍 Location: ${formData.location}`;
    const whatsappUrl = `https://wa.me/916377033649?text=${encodeURIComponent(message)}`;
    
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0b0f]/90 p-6 md:p-8 shadow-2xl backdrop-blur-xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">Work With Us</h3>
            <p className="mb-6 text-sm text-gray-400">Fill out this form and we'll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-[#4DA3FF] focus:bg-white/10 focus:ring-1 focus:ring-[#4DA3FF]"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="mobile" className="mb-1 block text-sm font-medium text-gray-300">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-[#4DA3FF] focus:bg-white/10 focus:ring-1 focus:ring-[#4DA3FF]"
                  placeholder="+91 00000 00000"
                  required
                />
              </div>

              <div>
                <label htmlFor="software" className="mb-1 block text-sm font-medium text-gray-300">
                  Editing Software
                </label>
                <select
                  id="software"
                  value={formData.software}
                  onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-[#4DA3FF] focus:bg-white/10 focus:ring-1 focus:ring-[#4DA3FF] [&>option]:bg-[#0c0b0f] [&>option]:text-white"
                  required
                >
                  <option value="" disabled className="text-gray-500">Select Software</option>
                  <option value="Adobe Premiere Pro">Adobe Premiere Pro</option>
                  <option value="After Effects">After Effects</option>
                  <option value="DaVinci Resolve">DaVinci Resolve</option>
                  <option value="CapCut">CapCut</option>
                  <option value="Final Cut Pro">Final Cut Pro</option>
                  <option value="Filmora">Filmora</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="mb-1 block text-sm font-medium text-gray-300">
                  Experience Level
                </label>
                <select
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-[#4DA3FF] focus:bg-white/10 focus:ring-1 focus:ring-[#4DA3FF] [&>option]:bg-[#0c0b0f] [&>option]:text-white"
                  required
                >
                  <option value="" disabled className="text-gray-500">Select Experience</option>
                  <option value="Beginner (0-1 year)">Beginner (0-1 year)</option>
                  <option value="Intermediate (1-3 years)">Intermediate (1-3 years)</option>
                  <option value="Professional (3+ years)">Professional (3+ years)</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-[#4DA3FF] focus:bg-white/10 focus:ring-1 focus:ring-[#4DA3FF]"
                  placeholder="New York, USA"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#4DA3FF] to-[#6EE7FF] px-4 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(77,163,255,0.6)] active:scale-95"
              >
                Submit Request
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
