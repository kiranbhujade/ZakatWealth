import React from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/sections/Hero';
import { HalalMeter } from '../components/sections/HalalMeter';
import { Features } from '../components/sections/Features';
import { Pricing } from '../components/sections/Pricing';
import { Blog } from '../components/sections/Blog';
import { Footer } from '../components/sections/Footer';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <HalalMeter />
        <Features />
        <Pricing />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
