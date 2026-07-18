'use client';
import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiImage } from 'react-icons/fi';
import Image from 'next/image';

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', slug: '', category: 'Engineering', content: '', image: '', author: 'UBGlobal Admin' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/blogs`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    
    const token = localStorage.getItem('admin_token');
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData
      });
      const data = await res.json();
      setFormData({ ...formData, image: data.url });
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/blogs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', slug: '', category: 'Engineering', content: '', image: '', author: 'UBGlobal Admin' });
        fetchBlogs();
      } else {
        const errData = await res.json();
        alert(`Failed to save blog: ${errData.detail}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary font-[family-name:var(--font-poppins)]">Blog Manager</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-eng text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-eng-dark transition-colors">
          <FiPlus /> New Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10"><div className="loader-ring w-8 h-8" /></div>
      ) : (
        <div className="bg-white rounded-3xl border border-surface-darker/40 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface text-secondary-light text-sm">
                <th className="p-4 font-semibold border-b border-surface-darker/40">Title</th>
                <th className="p-4 font-semibold border-b border-surface-darker/40">Category</th>
                <th className="p-4 font-semibold border-b border-surface-darker/40">Date</th>
                <th className="p-4 font-semibold border-b border-surface-darker/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.id} className="border-b border-surface-darker/20 hover:bg-surface/50 transition-colors">
                  <td className="p-4 font-medium text-primary">
                    <div className="line-clamp-1">{blog.title}</div>
                    <div className="text-xs text-secondary-light mt-1">/{blog.slug}</div>
                  </td>
                  <td className="p-4"><span className="px-3 py-1 bg-surface-darker/30 rounded-full text-xs font-semibold text-secondary">{blog.category}</span></td>
                  <td className="p-4 text-secondary text-sm">{new Date(blog.date).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-secondary">No blog posts found. Write one above!</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Blog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">Write New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Post Title</label>
                  <input type="text" required className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.title} onChange={e => {
                    const title = e.target.value;
                    setFormData({...formData, title, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')});
                  }} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">URL Slug</label>
                  <input type="text" required className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Category</label>
                  <select className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option>Engineering</option>
                    <option>Agriculture</option>
                    <option>IT Services</option>
                    <option>Company News</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Author</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Cover Image</label>
                <div className="flex items-center gap-4">
                  {formData.image && <div className="w-24 h-16 rounded-lg relative overflow-hidden border"><Image src={formData.image} alt="Preview" fill className="object-cover" /></div>}
                  <label className="cursor-pointer bg-surface border border-surface-darker/60 px-4 py-2 rounded-lg font-medium text-secondary hover:bg-surface-darker/30 transition-colors">
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Content (Markdown supported)</label>
                <textarea required rows="10" className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50 font-mono text-sm" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} placeholder="### Heading&#10;&#10;Paragraph text here..." />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-surface-darker/40">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-semibold text-secondary hover:bg-surface transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-semibold bg-eng text-white hover:bg-eng-dark transition-colors">Publish Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
