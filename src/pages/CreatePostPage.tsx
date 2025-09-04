import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/sections/Footer';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('General');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !excerpt) {
      setError('Title, Excerpt, and Content are required.');
      return;
    }
    if (!user) {
      setError('You must be logged in to create a post.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    const { data, error: insertError } = await supabase
      .from('blog_posts')
      .insert([
        {
          title,
          content,
          excerpt,
          category,
          image_url: imageUrl,
          author_id: user.id,
          status: 'published',
          read_time: Math.ceil(content.split(' ').length / 200),
        },
      ])
      .select();

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
    } else if (data) {
      setMessage('Post created successfully!');
      setTimeout(() => {
        navigate(`/blog/${data[0].id}`);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-emerald-950 mb-8">Create New Blog Post</h1>
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt (Short Summary)</label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option>General</option>
                <option>Investment</option>
                <option>Islamic Finance</option>
                <option>Technology</option>
                <option>Wealth Building</option>
                <option>Cryptocurrency</option>
                <option>Zakat</option>
              </select>
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? 'Publishing...' : 'Publish Post'}
              </Button>
            </div>
            {error && <p className="text-red-600 text-center">{error}</p>}
            {message && <p className="text-emerald-600 text-center">{message}</p>}
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePostPage;
