import React from 'react';
import { Check, Star, Crown, Diamond, Shield, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

export const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Seeker',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for getting started with Islamic finance',
      icon: Star,
      features: [
        'Access to blog content',
        'Basic Halal-o-Meter (3 uses/month)',
        'Weekly newsletter',
        'Prayer time widget',
        'Basic Zakat calculator'
      ],
      buttonText: 'Start Free',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Builder',
      price: '$99',
      period: 'month',
      description: 'For serious halal investors building wealth',
      icon: TrendingUp,
      features: [
        'Everything in Seeker',
        'Full Legacy Blueprint generator',
        'Unlimited Halal-o-Meter access',
        'Personal portfolio tracking',
        'Monthly Islamic finance webinars',
        'Advanced Zakat calculations',
        'Investment alerts & insights'
      ],
      buttonText: 'Start Building',
      popular: true,
      color: 'emerald'
    },
    {
      name: 'Guardian',
      price: '$299',
      period: 'month',
      description: 'For families planning generational wealth',
      icon: Crown,
      features: [
        'Everything in Builder',
        '1-on-1 monthly scholar consultation',
        'Private community access',
        'Advanced inheritance planning',
        'Family office services',
        'Custom Islamic compliance reports',
        'Priority customer support'
      ],
      buttonText: 'Become Guardian',
      popular: false,
      color: 'royal'
    },
    {
      name: 'Legacy',
      price: '$499',
      period: 'month',
      description: 'For high-net-worth families and entrepreneurs',
      icon: Diamond,
      features: [
        'Everything in Guardian',
        'Weekly scholar consultations',
        'Direct investment opportunities',
        'Quarterly in-person events',
        'White-glove concierge service',
        'Custom financial products',
        'Exclusive networking events'
      ],
      buttonText: 'Build Legacy',
      popular: false,
      color: 'gold'
    }
  ];

  const getIconColor = (color: string, popular: boolean) => {
    if (popular) return 'text-white';
    switch (color) {
      case 'emerald': return 'text-emerald-600';
      case 'royal': return 'text-royal-600';
      case 'gold': return 'text-gold-600';
      default: return 'text-gray-600';
    }
  };

  const getCardStyle = (color: string, popular: boolean) => {
    if (popular) {
      return 'bg-gradient-to-br from-emerald-950 to-royal-950 text-white border-emerald-500 transform scale-105 shadow-2xl';
    }
    return 'bg-white border-gray-200';
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-parchment-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-emerald-950 mb-4">
            Choose Your Path to Prosperity
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From beginners exploring Islamic finance to wealthy families building generational legacy, 
            we have the perfect plan for your journey.
          </p>
          <div className="inline-flex bg-emerald-100 rounded-lg p-1">
            <button className="px-4 py-2 rounded-md bg-white text-emerald-950 font-medium shadow-sm">
              Monthly
            </button>
            <button className="px-4 py-2 rounded-md text-emerald-700 font-medium">
              Annual (Save 20%)
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="warning" size="md">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`p-6 h-full ${getCardStyle(plan.color, plan.popular)}`}>
                <div className="text-center mb-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-white/10 flex items-center justify-center`}>
                    <plan.icon className={`h-6 w-6 ${getIconColor(plan.color, plan.popular)}`} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-emerald-950'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-emerald-950'}`}>
                      {plan.price}
                    </span>
                    {plan.price !== 'Free' && (
                      <span className={`text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.popular ? 'secondary' : 'primary'}
                  className="w-full"
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-emerald-950 mb-2">100% Sharia Compliant</h4>
              <p className="text-gray-600 text-sm">Verified by leading Islamic scholars</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <Crown className="h-8 w-8 text-gold-600" />
              </div>
              <h4 className="font-semibold text-emerald-950 mb-2">Trusted by 10,000+</h4>
              <p className="text-gray-600 text-sm">Muslim families worldwide</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-royal-100 rounded-full flex items-center justify-center mb-4">
                <Diamond className="h-8 w-8 text-royal-600" />
              </div>
              <h4 className="font-semibold text-emerald-950 mb-2">$2B+ Managed</h4>
              <p className="text-gray-600 text-sm">In halal investments</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
