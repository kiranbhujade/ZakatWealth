import React from 'react';
import { TrendingUp, Shield, Users, BookOpen, Calculator, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';

export const Features: React.FC = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'AI-Powered Portfolio',
      description: 'Smart investment recommendations based on Islamic principles and market analysis.',
      color: 'emerald'
    },
    {
      icon: Shield,
      title: 'Sharia Compliance',
      description: 'Every recommendation verified by Islamic scholars and compliance experts.',
      color: 'royal'
    },
    {
      icon: Calculator,
      title: 'Zakat Calculator',
      description: 'Automated zakat calculations with multiple scholarly methodologies.',
      color: 'gold'
    },
    {
      icon: BookOpen,
      title: 'Islamic Education',
      description: 'Learn Islamic finance principles through interactive courses and content.',
      color: 'emerald'
    },
    {
      icon: Users,
      title: 'Community Insights',
      description: 'Connect with like-minded Muslim investors and share experiences.',
      color: 'royal'
    },
    {
      icon: Heart,
      title: 'Legacy Planning',
      description: 'Plan your Islamic inheritance and create lasting generational wealth.',
      color: 'gold'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200';
      case 'royal':
        return 'bg-royal-100 text-royal-700 group-hover:bg-royal-200';
      case 'gold':
        return 'bg-gold-100 text-gold-700 group-hover:bg-gold-200';
      default:
        return 'bg-gray-100 text-gray-700 group-hover:bg-gray-200';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-emerald-950 mb-4">
            Everything You Need for Halal Wealth
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools and guidance to build, manage, and preserve your wealth 
            while staying true to Islamic values and principles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="p-6 group h-full">
                <div className={`w-12 h-12 rounded-lg ${getColorClasses(feature.color)} flex items-center justify-center mb-4 transition-colors duration-200`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-emerald-950 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-emerald-950 to-royal-950 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Financial Journey?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of Muslim families who are building wealth the halal way. 
              Start with our free tools and upgrade when you're ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gold-500 hover:bg-gold-600 text-emerald-950 font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Start Free Trial
              </button>
              <button className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg transition-colors duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
