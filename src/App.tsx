/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MyWork from './components/MyWork';
import LongFormVideos from './components/LongFormVideos';
import Services from './components/Services';
import Stats from './components/Stats';
import Team from './components/Team';
import Skills from './components/Skills';
import PhotoSlider from './components/PhotoSlider';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import ClientVideos from './components/ClientVideos';
import Contact from './components/Contact';
import SocialLinks from './components/SocialLinks';
import MapSection from './components/MapSection';
import FloatingSocials from './components/FloatingSocials';
import LoadingScreen from './components/LoadingScreen';
import WorkModal from './components/WorkModal';
import { motion, useScroll, useTransform } from 'motion/react';

export default function App() {
  return (
    <>
      <LoadingScreen />
      <WorkModal />
      
      <Navbar />
      <main className="relative bg-transparent text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden w-full">
        <Hero />
        <MyWork />
        <LongFormVideos />
        <Stats />
        <Services />
        <Team />
        <div id="skills"><Skills /></div>
        <div id="pricing"><Pricing /></div>
        <PhotoSlider />
        <Reviews />
        <ClientVideos />
        <Contact />
        <SocialLinks />
        <MapSection />
        <FloatingSocials />
        
        {/* Simple Footer with Logo */}
        <footer className="py-12 border-t border-white/5 relative z-10 backdrop-blur-sm bg-black/50">
          <div className="flex flex-col items-center justify-center gap-6">
            <a href="#" className="animate-float-logo logo-glow">
              <img 
                src="https://i.ibb.co/xKcXKtdx/image.png" 
                alt="Brand Logo" 
                className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
            <p className="text-gray-500 text-sm font-light">© {new Date().getFullYear()} Trimclipedits</p>
            <p className="text-gray-600 text-xs mt-2 uppercase tracking-widest font-medium">Website made by Raj Developer</p>
          </div>
        </footer>
      </main>
    </>
  );
}
