import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

const EDIT_OPTIONS = [
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

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nameError, setNameError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setNameError("Name is required to continue.");
      return;
    }
    setNameError("");

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const optionsText = selectedOptions.length > 0 ? selectedOptions.join(', ') : 'None specified';
      const message = `Hello, I'd like to discuss a project.\n\nName: ${formData.name}\nLooking to edit: ${optionsText}\nMessage: ${formData.message || 'Not provided'}`;
      // Replace with actual WhatsApp number
      const phoneNumber = "916377033649"; 
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', message: '' });
        setSelectedOptions([]);
      }, 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
      <div className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:items-start">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sticky top-32"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-6 mt-0">
              Let's Create <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.2)] hover:drop-shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all duration-1000 ease-in-out">Something Epic</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Tell me about your project below. The details will go straight to my WhatsApp for a quick response so we can get started right away.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <svg className="w-6 h-6 fill-[#25D366]" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.441-1.273.605-1.446c.163-.173.353-.217.473-.217.119 0 .237.001.341.006.111.005.26-.044.407.311.15.361.503 1.229.548 1.32.045.092.075.199.017.315-.058.115-.088.187-.175.29s-.182.213-.263.315c-.088.099-.184.209-.081.387.101.178.45.748.966 1.21.666.596 1.227.781 1.405.874.178.092.282.079.387-.038.105-.116.452-.524.572-.703.119-.179.238-.149.4-.087.163.062 1.026.483 1.203.571.178.087.296.134.339.208.043.074.043.43-.101.835z"/></svg>
              </div>
              <div>
                <p className="text-white">Direct WhatsApp Integration</p>
                <p className="text-gray-500">Fastest way to reach me</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/5 shadow-[0_0_40px_rgba(217,70,239,0.05)]">
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 bg-[#0B1225]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 rounded-full bg-fuchsia-500/20 flex items-center justify-center mb-4 border border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.2)]"
                  >
                    <CheckCircle2 className="w-10 h-10 text-fuchsia-400" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Ready to Roll!</h3>
                  <p className="text-fuchsia-300/80">Opening WhatsApp securely...</p>
                </motion.div>
              )}

              <div className="space-y-8 relative z-10">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-fuchsia-400/80 mb-3 ml-1">Your Name</label>
                  <input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (e.target.value.trim()) setNameError("");
                    }}
                    type="text" 
                    className={`w-full bg-white/5 border ${nameError ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-fuchsia-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 focus:shadow-[0_0_15px_rgba(217,70,239,0.15)]`} 
                    placeholder="E.g. John Doe" 
                  />
                  {nameError && <p className="text-red-400 text-xs mt-2 ml-1 animate-pulse">{nameError}</p>}
                </div>

                {/* Edit Options */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-fuchsia-400/80 mb-3 ml-1">What do you want to edit?</label>
                  <div className="flex flex-wrap gap-3">
                    {EDIT_OPTIONS.map((option) => {
                      const isSelected = selectedOptions.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleOption(option)}
                          className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                            isSelected 
                              ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-100 shadow-[0_0_15px_rgba(217,70,239,0.2)]'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message Box */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-fuchsia-400/80 mb-3 ml-1">Project Details</label>
                  <textarea 
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-fuchsia-500/50 focus:bg-white/10 transition-all resize-none placeholder:text-gray-600 focus:shadow-[0_0_15px_rgba(217,70,239,0.15)]" 
                    placeholder="Tell me more about the style, length, or goals of your project..." 
                  ></textarea>
                </div>

                {/* Submit */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-bold py-4 rounded-xl hover:opacity-90 hover:shadow-[0_0_25px_rgba(217,70,239,0.4)] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed border border-fuchsia-400/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {isSubmitting ? (
                    <span className="animate-pulse relative z-10">Preparing Message...</span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      Send to WhatsApp
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
