import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, UploadCloud, FileText } from 'lucide-react';

export default function WorkModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    const handleOpen = (e: Event) => {
      e.preventDefault();
      setIsOpen(true);
    };
    window.addEventListener('open-work-modal', handleOpen);
    return () => window.removeEventListener('open-work-modal', handleOpen);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setFileError('⚠️ Only PDF files are allowed.');
      setResumeFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError('⚠️ File size must be less than 10MB.');
      setResumeFile(null);
      return;
    }

    setFileError('');
    setResumeFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !resumeFile) {
      if (!resumeFile) setFileError('⚠️ Please upload your resume.');
      return;
    }

    const message = `Hello, I want to Join Our Team.\nName: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.mobile}\nResume: (${resumeFile.name})`;
    const whatsappUrl = `https://wa.me/916377033649?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setFormData({ name: '', email: '', mobile: '' });
    setResumeFile(null);
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
                Join Our Team <span className="w-2 h-2 rounded-full bg-[#4DA3FF] animate-pulse shadow-[0_0_10px_#4DA3FF]"></span>
              </h3>
              <p className="text-sm md:text-base text-gray-400 font-light">Join our creative network. Let's build something epic together.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#4DA3FF]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-[#4DA3FF]/50 focus:bg-[#0B1225] focus:shadow-[0_0_15px_rgba(77,163,255,0.2)]"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#4DA3FF]">
                  Upload Resume (PDF only, Max 10MB)
                </label>
                <div className={`relative border-2 border-dashed rounded-xl bg-black/40 transition-all p-6 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden group ${fileError ? 'border-red-500/50 hover:bg-red-500/5' : 'border-white/20 hover:bg-[#0B1225] hover:border-[#4DA3FF]/50'}`}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {!resumeFile ? (
                    <>
                      <div className="w-12 h-12 mb-3 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4DA3FF]/10 transition-all">
                        <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-[#4DA3FF]" />
                      </div>
                      <p className="text-sm text-gray-300 font-medium mb-1 group-hover:text-[#4DA3FF] transition-colors">Click or drag file to this area to upload</p>
                      <p className="text-xs text-gray-500">Only PDF files up to 10MB are allowed</p>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 mb-3 rounded-full bg-[#4DA3FF]/20 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#4DA3FF]" />
                      </div>
                      <p className="text-sm font-medium text-white mb-1 truncate max-w-full px-4">{resumeFile.name}</p>
                      <p className="text-xs text-[#4DA3FF]">{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Click to change</p>
                    </>
                  )}
                </div>
                {fileError && <p className="mt-2 text-xs text-red-500 font-medium">{fileError}</p>}
              </div>

              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4DA3FF] to-[#6EE7FF] px-4 py-4 text-[15px] font-bold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(77,163,255,0.5)] active:scale-[0.98]"
              >
                Submit Application
                <Send className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
