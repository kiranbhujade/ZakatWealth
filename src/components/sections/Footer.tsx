import React from 'react';
import { Compass, Mail, Phone, MapPin, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = {
    platform: [
      { name: 'Halal-o-Meter™', href: '#tools' },
      { name: 'Portfolio Builder', href: '#portfolio' },
      { name: 'Zakat Calculator', href: '#zakat' },
      { name: 'Islamic Education', href: '#learn' },
      { name: 'Community', href: '#community' }
    ],
    resources: [
      { name: 'Blog', href: '#insights' },
      { name: 'Research Reports', href: '#research' },
      { name: 'Islamic Scholars', href: '#scholars' },
      { name: 'Webinars', href: '#webinars' },
      { name: 'Help Center', href: '#help' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy Policy', href: '#privacy' }
    ],
    legal: [
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Sharia Compliance', href: '#compliance' },
      { name: 'Disclaimers', href: '#disclaimers' },
      { name: 'Cookie Policy', href: '#cookies' }
    ]
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Compass className="h-8 w-8 text-gold-500" />
                <Star className="h-3 w-3 text-gold-400 absolute -top-1 -right-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-arabic">The Serenity Compass</h3>
                <p className="text-xs text-gold-200">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted guide to building halal wealth and planning your Islamic legacy. 
              Combining spiritual wisdom with modern financial technology for Muslim families worldwide.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-gold-500" />
                <span>support@serenitycompass.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-gold-500" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-gold-500" />
                <span>Dubai International Financial Centre</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gold-300 mb-4">Platform</h4>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gold-300 mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gold-300 mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gold-300 mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-emerald-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} The Serenity Compass. All rights reserved. 
              <span className="mx-2">•</span>
              Proudly Sharia Compliant
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Star className="h-4 w-4 text-gold-500" />
                <span>Trusted by 10,000+ families</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
          
          {/* Hadith Quote */}
          <div className="mt-8 pt-6 border-t border-emerald-800/50 text-center">
            <p className="text-gold-200 font-arabic text-lg mb-2">
              "البَرَكَةُ مَعَ أَكَابِرِكُمْ"
            </p>
            <p className="text-gray-400 text-sm italic">
              "Blessing is with your elders" - Hadith
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
