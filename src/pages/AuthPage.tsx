import React, { useState, useEffect } from 'react';
import { Compass, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        if (!fullName) {
          throw new Error("Full name is required for sign up.");
        }
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: fullName,
            },
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        if (error) throw error;
        setMessage('Registration successful! Please check your email to confirm your account.');
      }
    } catch (err: any) {
      setError(err.error_description || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-royal-950 to-emerald-950 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-parchment-50/90 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          <div className="text-center mb-8">
            <Compass className="h-12 w-12 text-emerald-950 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-emerald-950">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">to The Serenity Compass</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </Button>
          </form>

          {message && <p className="mt-4 text-center text-emerald-700">{message}</p>}
          {error && <p className="mt-4 text-center text-red-600">{error}</p>}

          <div className="mt-6 text-center">
            <button onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }} className="text-sm text-emerald-800 hover:underline">
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </button>
          </div>
        </motion.div>
      </Card>
    </div>
  );
};

export default AuthPage;
