/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MyWork from './components/MyWork';
import Skills from './components/Skills';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import SocialLinks from './components/SocialLinks';
import MapSection from './components/MapSection';
import FloatingSocials from './components/FloatingSocials';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="bg-black text-white selection:bg-cyan-500/30 font-sans">
        <Hero />
        <MyWork />
        <div id="skills"><Skills /></div>
        <div id="pricing"><Pricing /></div>
        <Reviews />
        <Contact />
        <SocialLinks />
        <MapSection />
        <FloatingSocials />
        
        {/* Simple Footer with Logo */}
        <footer className="py-12 border-t border-white/5 bg-black">
          <div className="flex flex-col items-center justify-center gap-6">
            <a href="#" className="animate-float-logo logo-glow">
              <img 
                src="https://i.ibb.co/xKcXKtdx/image.png" 
                alt="Brand Logo" 
                className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
            <p className="text-gray-500 text-sm font-light">© {new Date().getFullYear()} Website developed by Raj. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
