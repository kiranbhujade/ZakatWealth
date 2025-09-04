import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/sections/Footer';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LogOut, PlusCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-950">Dashboard</h1>
          <p className="text-lg text-gray-600">Welcome back, {user?.user_metadata?.full_name || user?.email || 'User'}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">Your Account</h2>
            <p className="text-gray-700 mb-6">This is your personal dashboard. More features like portfolio tracking and legacy planning will be available here soon.</p>
            
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 mb-8">
              <p className="font-medium text-emerald-800">User Email:</p>
              <p className="text-sm text-emerald-700 break-all">{user?.email}</p>
            </div>

            <Button onClick={handleSignOut} variant="secondary">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-semibold text-emerald-900 mb-4">Content Management</h2>
            <p className="text-gray-700 mb-6">Share your knowledge with the community. Write new articles for The Serenity Compass journal.</p>
            
            <Link to="/dashboard/create-post">
              <Button variant="primary" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Post
              </Button>
            </Link>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
