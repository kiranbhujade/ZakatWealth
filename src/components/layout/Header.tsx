import React, { useState } from 'react';
import { Menu, X, Star, Compass, User as UserIcon, Bell, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    { name: 'Tools', href: '#tools' },
    { name: 'Insights', href: '#insights' },
    { name: 'Community', href: '#community' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const renderAuthButtons = () => {
    if (loading) {
      return <div className="h-9 w-24 bg-gray-700 rounded-lg animate-pulse"></div>;
    }

    if (user) {
      return (
        <div className="hidden lg:flex items-center space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="secondary" size="sm" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      );
    }

    return (
      <div className="hidden lg:flex items-center space-x-4">
        <Link to="/auth">
          <Button variant="ghost" className="text-white hover:text-gold-300">
            Login
          </Button>
        </Link>
        <Link to="/auth">
          <Button variant="secondary" size="sm">
            Start Free Trial
          </Button>
        </Link>
      </div>
    );
  };
  
  const renderMobileAuthButtons = () => {
    if (user) {
      return (
        <>
          <Button variant="outline" size="sm" className="w-full" onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}>
            Dashboard
          </Button>
          <Button variant="secondary" size="sm" className="w-full" onClick={() => { handleSignOut(); setIsMenuOpen(false); }}>
            Logout
          </Button>
        </>
      );
    }
    return (
      <>
        <Link to="/auth" className="w-full">
          <Button variant="ghost" className="w-full text-white hover:text-gold-300" onClick={() => setIsMenuOpen(false)}>
            Login
          </Button>
        </Link>
        <Link to="/auth" className="w-full">
          <Button variant="secondary" size="sm" className="w-full" onClick={() => setIsMenuOpen(false)}>
            Start Free Trial
          </Button>
        </Link>
      </>
    );
  };


  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-950 via-royal-950 to-emerald-950 text-white shadow-2xl">
      <div className="absolute inset-0 bg-geometric-pattern opacity-20"></div>
      
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
                <span className="text-emerald-950 font-bold text-sm">Z</span>
              </div>
              <div className="absolute inset-0 animate-pulse-slow">
                <Star className="h-3 w-3 text-gold-400 absolute -top-1 -right-1" />
              </div>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold font-arabic">
                ZakatWealth
              </h1>
              <p className="text-xs text-gold-200 hidden lg:block">
                الثروة الحلال والزكاة
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-gold-300 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <Link to="/zakat-calculator" className="text-sm font-medium hover:text-gold-300 transition-colors duration-200">
              Zakat Calculator
            </Link>
            <Link to="/halal-screener" className="text-sm font-medium hover:text-gold-300 transition-colors duration-200">
              Halal Screener
            </Link>
          </div>

          {/* Desktop Actions */}
          {renderAuthButtons()}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/20 py-4"
            >
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm font-medium hover:text-gold-300 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-white/20 space-y-2">
                  {renderMobileAuthButtons()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
