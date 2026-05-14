import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function FloatingSocials() {
  return (
    <>
      {/* Left side fixed socials */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden lg:flex">
        <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-pink-500 hover:neon-glow transition-all hover:scale-110">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-blue-500 hover:neon-glow transition-all hover:scale-110">
          <Facebook className="w-5 h-5" />
        </a>
      </div>

      {/* WhatsApp Help Bot */}
      <a 
        href="https://wa.me/1234567890?text=Hi!%20I%20have%20a%20question..."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      >
        <div className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
          Chat with me!
        </div>
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all hover:scale-110 animate-bounce cursor-pointer">
          <MessageCircle className="w-7 h-7 text-white fill-current" />
        </div>
      </a>
    </>
  );
}
