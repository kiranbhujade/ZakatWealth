import React from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/sections/Hero';
import { ZakatCalculator } from '../components/sections/ZakatCalculator';
import { HalalScreener } from '../components/sections/HalalScreener';
import { PrayerTimes } from '../components/sections/PrayerTimes';
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
        <ZakatCalculator />
        <HalalScreener />
        <PrayerTimes />
        <Features />
        <Pricing />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
