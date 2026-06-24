import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, UploadCloud, FileText } from 'lucide-react';

export default function JoinTeamModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    portfolio: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [nameError, setNameError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      e.preventDefault();
      setIsOpen(true);
      setIsSuccess(false);
      setFormData({ name: '', portfolio: '' });
      setResumeFile(null);
      setFileError("");
      setNameError("");
    };
    window.addEventListener('open-join-team-modal', handleOpen);
    return () => window.removeEventListener('open-join-team-modal', handleOpen);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError("");
    if (file) {
      if (file.type !== "application/pdf" && !file.name.endsWith('.pdf')) {
        setFileError("Please upload a PDF file.");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileError("");
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== "application/pdf" && !file.name.endsWith('.pdf')) {
        setFileError("Please upload a PDF file.");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setNameError("Name is required to continue.");
      return;
    }
    setNameError("");

    setIsSubmitting(true);
    setFileError("");

    try {
      let directUrl = 'Not provided';
      if (resumeFile) {
        // 1. Upload to tmpfiles.org
        const uploadData = new FormData();
        uploadData.append('file', resumeFile);

        const response = await fetch('https://tmpfiles.org/api/v1/upload', {
          method: 'POST',
          body: uploadData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const result = await response.json();
        const rawUrl = result.data.url; // e.g. https://tmpfiles.org/12345/resume.pdf
        
        // Convert to direct download link
        directUrl = rawUrl.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      }

      // 2. Show success confirmation
      setIsSuccess(true);

      // 3. Prepare WhatsApp message
      const message = `Hello, I want to join the creative team!\n\nName: ${formData.name}\nPortfolio: ${formData.portfolio || 'Not provided'}\nResume PDF: ${directUrl}`;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const phoneNumber = import.meta.env.VITE_CONTACT_PHONE || "916377033649";
      const whatsappUrl = isMobile 
        ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}` 
        : `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

      // Delay slightly so the user sees the success state
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
        setIsSubmitting(false);
      }, 1500);

    } catch (error) {
      console.error(error);
      setFileError("Failed to upload resume. Please try again.");
      setIsSubmitting(false);
    }
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
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar rounded-[24px] border border-white/10 bg-[#0B1225]/80 p-8 shadow-[0_0_50px_rgba(56,189,248,0.15)] backdrop-blur-2xl"
          >
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 rounded-full p-2 bg-white/5 border border-white/10 text-gray-400 transition-all hover:bg-white/10 hover:text-white z-10"
            >
              <X size={18} />
            </button>

            <div className="mb-8">
              <h3 className="mb-2 text-3xl font-display font-bold tracking-tight text-white flex items-center gap-2 capitalize">
                Work With Us <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.4)]"></span>
              </h3>
              <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">Join our premium cinematic design and development team.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 bg-[#0B1225]/90 backdrop-blur-md flex flex-col items-center justify-center text-center rounded-xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center mb-4 border border-sky-500/50"
                  >
                    <UploadCloud className="w-8 h-8 text-sky-400" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-2 capitalize">Application Ready!</h4>
                  <p className="text-gray-400 text-sm">Redirecting to WhatsApp...</p>
                </motion.div>
              )}

              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-semibold capitalize tracking-widest text-sky-400">
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
                  className={`w-full rounded-xl border ${nameError ? 'border-red-500/50' : 'border-white/10'} bg-black/40 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-sky-500/50 focus:bg-[#0B1225] focus:shadow-[0_0_10px_rgba(56,189,248,0.2)]`}
                  placeholder="John Doe"
                />
                {nameError && <p className="text-red-400 text-xs mt-2 animate-pulse">{nameError}</p>}
              </div>

              <div>
                <label htmlFor="portfolio" className="mb-2 block text-xs font-semibold capitalize tracking-widest text-sky-400">
                  Portfolio Link
                </label>
                <input
                  type="url"
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all focus:border-sky-500/50 focus:bg-[#0B1225] focus:shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold capitalize tracking-widest text-sky-400">
                  Resume (PDF Only)
                </label>
                <div 
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`relative border-2 border-dashed rounded-xl bg-black/40 px-4 py-6 flex flex-col items-center justify-center text-center overflow-hidden group transition-all cursor-pointer ${fileError ? 'border-red-500/50 hover:bg-red-500/5' : 'border-white/10 hover:border-sky-500/50 hover:bg-white/5'} focus-within:border-sky-500/50 focus-within:shadow-[0_0_10px_rgba(56,189,248,0.2)]`}
                >
                  <input 
                    type="file" 
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title="Upload Resume (PDF Only)"
                  />
                  
                  {resumeFile ? (
                    <div className="flex flex-col items-center justify-center relative z-10 pointer-events-none">
                      <div className="w-12 h-12 mb-3 rounded-full bg-sky-500/20 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-sky-500" />
                      </div>
                      <p className="text-sm text-sky-300 font-medium truncate w-[200px] sm:w-[250px]">{resumeFile.name}</p>
                      <p className="text-xs text-sky-400 mt-1">{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Click to change</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center relative z-10 pointer-events-none">
                      <div className="w-12 h-12 mb-3 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-500/10 transition-all">
                        <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-sky-500" />
                      </div>
                      <p className="text-sm text-gray-300 font-medium mb-1 group-hover:text-sky-400 transition-colors">Click or drag PDF to upload</p>
                    </div>
                  )}
                </div>
                {fileError && <p className="text-red-400 text-xs mt-2">{fileError}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 px-4 py-4 text-[15px] font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] border border-sky-400/50 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed capitalize"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Uploading Resume...</span>
                ) : (
                  <>
                    Send Application
                    <Send className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
