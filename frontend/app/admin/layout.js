'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiGrid, FiFileText, FiImage, FiMessageSquare, FiLogOut, FiHome } from 'react-icons/fi';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // If it's the login page, don't enforce layout auth
    if (pathname === '/admin/login') {
      setIsAuthorized(true);
      return;
    }

    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (!isAuthorized) return <div className="min-h-screen bg-surface flex items-center justify-center"><div className="loader-ring w-8 h-8"/></div>;

  if (pathname === '/admin/login') {
    return children;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: FiGrid },
    { name: 'Products', href: '/admin/products', icon: FiFileText },
    { name: 'Blogs', href: '/admin/blogs', icon: FiFileText },
    { name: 'Banners', href: '/admin/banners', icon: FiImage },
    { name: 'Inquiries', href: '/admin/inquiries', icon: FiMessageSquare },
  ];

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white fixed h-full hidden md:flex flex-col">
        <div className="p-6">
          <span className="text-2xl font-bold font-[family-name:var(--font-poppins)]">UBGlobal Admin</span>
        </div>
        
        <nav className="flex-1 px-4 mt-6 space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname === item.href ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="text-lg" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-colors">
            <FiHome className="text-lg" />
            <span className="font-medium">View Website</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors">
            <FiLogOut className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
