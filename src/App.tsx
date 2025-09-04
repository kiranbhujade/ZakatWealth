import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CreatePostPage from './pages/CreatePostPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/create-post" element={<CreatePostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
