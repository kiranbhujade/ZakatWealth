import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, User } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import { BlogPost } from '../../types';
import { Link } from 'react-router-dom';

export const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts_with_author_name')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching blog posts:', error);
      } else {
        const formattedPosts = data.map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author_name || 'Serenity Compass Team',
          publishedAt: new Date(post.created_at),
          category: post.category || 'General',
          readTime: post.read_time || Math.ceil(post.content.split(' ').length / 200),
          featured: post.featured || false,
          image: post.image_url || `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400/0F4C3A/FAF7F0?text=${encodeURIComponent(post.title)}`
        }));
        setBlogPosts(formattedPosts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: 'success' | 'warning' | 'error' | 'info' } = {
      'Investment': 'success',
      'Islamic Finance': 'info',
      'Technology': 'warning',
      'Wealth Building': 'success',
      'Cryptocurrency': 'warning',
      'Zakat': 'info'
    };
    return colors[category] || 'info';
  };

  if (loading) {
    return (
      <section id="insights" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading latest insights...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="insights" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-emerald-950 mb-4">
            The Compass Journal
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Deep insights into Islamic finance, halal investing, and building wealth 
            the Islamic way. Written by scholars, experts, and successful Muslim entrepreneurs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="overflow-hidden h-full flex flex-col">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-emerald-950 mb-3 line-clamp-2 flex-grow">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 mt-auto">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span className="truncate">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/${post.id}`} className="mt-auto">
                    <Button variant="ghost" className="w-full group">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
            <Link to="/blog">
                <Button variant="primary" size="lg">
                    View All Articles
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
};
