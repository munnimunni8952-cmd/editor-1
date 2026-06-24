import { Instagram, Facebook, MessageCircle, Youtube, Linkedin } from 'lucide-react';

export default function FloatingSocials() {
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const phoneNumber = import.meta.env.VITE_CONTACT_PHONE || "916377033649";
  const whatsappUrl = isMobile 
    ? `whatsapp://send?phone=${phoneNumber}` 
    : `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  return (
    <>
      {/* Left side fixed socials */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden lg:flex">
        <a href="https://www.instagram.com/trimclipedits?igsh=cmU0N3dudnBjamRv" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-[#E1306C] hover:shadow-[0_0_15px_rgba(225,48,108,0.5)] transition-all hover:scale-110 capitalize">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="https://www.facebook.com/share/1ELbbACcTR/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.5)] transition-all hover:scale-110 capitalize">
          <Facebook className="w-5 h-5" />
        </a>
        <a href="https://youtube.com/@ankitsharma-e3g8u?si=RzLTYKMDGst_NzOv" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all hover:scale-110 capitalize">
          <Youtube className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/trimclipedits-video-editing-services-4771713a1?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-[#0077B5] hover:shadow-[0_0_15px_rgba(0,119,181,0.5)] transition-all hover:scale-110 capitalize">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>

      {/* WhatsApp Help Bot */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group capitalize"
      >
        <div className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
          Chat with me!
        </div>
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all hover:-translate-y-1 hover:scale-110 cursor-pointer">
          <MessageCircle className="w-7 h-7 text-white fill-current" />
        </div>
      </a>
    </>
  );
}
