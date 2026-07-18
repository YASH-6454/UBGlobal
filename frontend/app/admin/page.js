'use client';
import { useState, useEffect } from 'react';
import { FiFileText, FiImage, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, blogs: 0, banners: 0, inquiries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, blogsRes, bannersRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/products`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/blogs`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/banners`)
        ]);
        
        const products = await productsRes.json();
        const blogs = await blogsRes.json();
        const banners = await bannersRes.json();

        setStats({
          products: products.length || 0,
          blogs: blogs.length || 0,
          banners: banners.length || 0,
          inquiries: 0 // Will fetch from actual endpoint when implemented
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Products', value: stats.products, icon: FiFileText, color: 'text-blue-500', bg: 'bg-blue-50', link: '/admin/products' },
    { title: 'Blog Posts', value: stats.blogs, icon: FiFileText, color: 'text-green-500', bg: 'bg-green-50', link: '/admin/blogs' },
    { title: 'Hero Banners', value: stats.banners, icon: FiImage, color: 'text-purple-500', bg: 'bg-purple-50', link: '/admin/banners' },
    { title: 'New Inquiries', value: stats.inquiries, icon: FiMessageSquare, color: 'text-orange-500', bg: 'bg-orange-50', link: '/admin/inquiries' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary font-[family-name:var(--font-poppins)] mb-8">Dashboard Overview</h1>
      
      {loading ? (
        <div className="flex justify-center p-10"><div className="loader-ring w-8 h-8" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <Link key={i} href={stat.link} className="bg-white p-6 rounded-3xl border border-surface-darker/40 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-secondary font-medium text-sm mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="text-xl" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-semibold text-eng group-hover:underline">
                Manage {stat.title.toLowerCase()} &rarr;
              </div>
            </Link>
          ))}
        </div>
      )}
      
      <div className="mt-10 bg-white rounded-3xl border border-surface-darker/40 p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-surface rounded-2xl text-primary"><FiTrendingUp className="text-xl" /></div>
          <h2 className="text-xl font-bold text-primary">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/products" className="py-3 px-4 bg-surface rounded-xl font-medium text-primary hover:bg-surface-darker transition-colors text-center border">Add Product</Link>
          <Link href="/admin/blogs" className="py-3 px-4 bg-surface rounded-xl font-medium text-primary hover:bg-surface-darker transition-colors text-center border">Write Blog</Link>
          <Link href="/" target="_blank" className="py-3 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors text-center">View Website</Link>
        </div>
      </div>
    </div>
  );
}
