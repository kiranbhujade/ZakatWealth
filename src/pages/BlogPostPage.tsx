import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/sections/Footer';
import { supabase } from '../lib/supabaseClient';
import { BlogPost } from '../types';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts_with_author_name')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } else {
        const formattedPost = {
          id: data.id,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          author: data.author_name || 'Serenity Compass Team',
          publishedAt: new Date(data.created_at),
          category: data.category || 'General',
          readTime: data.read_time || Math.ceil(data.content.split(' ').length / 200),
          featured: data.featured || false,
          image: data.image_url || `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/1200x600/0F4C3A/FAF7F0?text=${encodeURIComponent(data.title)}`
        };
        setPost(formattedPost);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-parchment-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Post Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">The article you are looking for does not exist or could not be loaded.</p>
          <Link to="/blog" className="text-emerald-600 hover:underline font-semibold">
            &larr; Back to all articles
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose lg:prose-xl max-w-none">
          <div className="mb-8">
            <Link to="/blog" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to The Compass Journal
            </Link>
          </div>
          
          <Badge variant="info">{post.category}</Badge>
          
          <h1 className="mt-4 text-emerald-950">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 mb-8">
            <div className="flex items-center gap-2"><User className="h-5 w-5" /><span>{post.author}</span></div>
            <div className="flex items-center gap-2"><Calendar className="h-5 w-5" /><span>{post.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
            <div className="flex items-center gap-2"><Clock className="h-5 w-5" /><span>{post.readTime} min read</span></div>
          </div>

          <img src={post.image} alt={post.title} className="w-full rounded-lg mb-8 shadow-lg" />
          
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
