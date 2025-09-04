import React from 'react';
import { ArrowRight, Shield, TrendingUp, Heart, Compass } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-950 via-royal-950 to-emerald-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-geometric-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-subtle-dots"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gold-500/20 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gold-500/20 text-gold-300 rounded-full text-sm font-medium border border-gold-500/30">
                ✨ Trusted by 10,000+ Muslim Families
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Build Your{' '}
              <span className="text-transparent bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text">
                Halal Legacy
              </span>
              <br />
              with Divine Guidance
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              The ultimate Islamic wealth platform that combines centuries-old wisdom 
              with cutting-edge AI to guide your financial journey. Build wealth, 
              plan your legacy, and grow spiritually - all while staying true to Islamic principles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="group">
                Discover Your Halal Path
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Try Halal-o-Meter™ Free
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>Sharia Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gold-400" />
                <span>$2B+ Managed</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span>Islamic Values</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <Compass className="h-16 w-16 text-gold-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Your Spiritual Compass</h3>
                <p className="text-gray-300">Navigate wealth with Islamic wisdom</p>
              </div>

              {/* Mock Dashboard */}
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Halal Portfolio</span>
                    <span className="text-emerald-400 font-semibold">+12.4%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-gold-500 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Zakat Due</span>
                    <span className="text-gold-400 font-semibold">$2,450</span>
                  </div>
                  <div className="text-xs text-gray-400">Next: 15 days</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Islamic Compliance</span>
                    <span className="text-emerald-400 font-semibold">98%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-emerald-500/20 backdrop-blur-lg rounded-lg p-3 border border-emerald-500/30 animate-float">
              <div className="text-xs text-emerald-300 mb-1">Next Prayer</div>
              <div className="text-sm font-semibold">Maghrib - 18:42</div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-gold-500/20 backdrop-blur-lg rounded-lg p-3 border border-gold-500/30 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-xs text-gold-300 mb-1">Today's Hadith</div>
              <div className="text-sm font-semibold">Trade with honesty</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
