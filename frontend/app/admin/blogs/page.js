'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiArrowLeft, FiUploadCloud, FiX, FiSave } from 'react-icons/fi';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ubglobal-api.onrender.com';

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: '', slug: '', category: 'Engineering', content: '', image: '', author: 'UBGlobal Admin' });
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openNewEditor = () => {
    setEditingBlog(null);
    setFormData({ title: '', slug: '', category: 'Engineering', content: '', image: '', author: 'UBGlobal Admin' });
    setEditorOpen(true);
  };

  const openEditEditor = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      category: blog.category || 'Engineering',
      content: blog.content || '',
      image: blog.image || '',
      author: blog.author || 'UBGlobal Admin',
    });
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingBlog(null);
    setFormData({ title: '', slug: '', category: 'Engineering', content: '', image: '', author: 'UBGlobal Admin' });
  };

  const uploadFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    const token = localStorage.getItem('admin_token');
    const uploadData = new FormData();
    uploadData.append('file', file);
    try {
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadData,
      });
      const data = await res.json();
      setFormData(prev => ({ ...prev, image: data.url }));
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = (e) => {
    uploadFile(e.target.files[0]);
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) uploadFile(e.dataTransfer.files[0]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    const isEditing = !!editingBlog;
    const url = isEditing ? `${API_URL}/api/blogs/${editingBlog.id}` : `${API_URL}/api/blogs`;

    try {
      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        closeEditor();
        fetchBlogs();
      } else {
        const errData = await res.json();
        alert(`Failed to save: ${errData.detail}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // ────────── Editor View ──────────
  if (editorOpen) {
    return (
      <form onSubmit={handleSubmit} className="min-h-[calc(100vh-100px)]">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button type="button" onClick={closeEditor} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-medium">
            <FiArrowLeft /> Back to Blogs
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-secondary-light">{editingBlog ? 'Editing' : 'New Post'}</span>
            <button type="submit" className="flex items-center gap-2 bg-eng text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-eng-dark transition-colors shadow-lg shadow-eng/20">
              <FiSave className="text-sm" /> {editingBlog ? 'Update Post' : 'Publish'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8">
          {/* ── Main Content Area ── */}
          <div className="space-y-6">
            {/* Title */}
            <div className="bg-white rounded-2xl border border-surface-darker/40 p-6 shadow-sm">
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    title,
                    slug: editingBlog ? prev.slug : autoSlug(title),
                  }));
                }}
                placeholder="Article title..."
                className="w-full text-2xl sm:text-3xl font-bold text-primary placeholder:text-secondary-light/50 bg-transparent border-0 outline-none font-[family-name:var(--font-poppins)]"
              />
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-slug"
                className="w-full mt-3 text-sm text-secondary placeholder:text-secondary-light/50 bg-transparent border-0 outline-none font-mono"
              />
            </div>

            {/* Cover Image */}
            <div className="bg-white rounded-2xl border border-surface-darker/40 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">Cover Image</h3>
              {formData.image ? (
                <div className="relative rounded-xl overflow-hidden border border-surface-darker/30 group">
                  <div className="relative w-full h-[240px] sm:h-[300px] bg-surface">
                    <Image src={formData.image} alt="Cover" fill className="object-contain" sizes="(max-width: 1280px) 100vw, 60vw" />
                  </div>
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <label className="cursor-pointer bg-white text-primary px-4 py-2 rounded-lg font-semibold text-sm hover:bg-surface transition-colors">
                      Change
                      <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                    </label>
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: '' }))} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                    dragActive ? 'border-eng bg-eng/5 scale-[1.01]' : 'border-surface-darker/50 hover:border-eng/50 hover:bg-surface/50'
                  }`}
                >
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                  <FiUploadCloud className={`mx-auto text-3xl mb-3 ${dragActive ? 'text-eng' : 'text-secondary-light'}`} />
                  <p className="text-secondary font-medium text-sm">
                    {uploading ? 'Uploading...' : 'Click or drag to upload'}
                  </p>
                  <p className="text-secondary-light text-xs mt-1">JPG, PNG, WebP · Max 5MB</p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-surface-darker/40 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">Content</h3>
              <textarea
                required
                rows="18"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder={"### Heading\n\nStart writing your article...\n\nMarkdown is supported."}
                className="w-full p-4 rounded-xl border border-surface-darker/40 focus:ring-2 focus:ring-eng/30 focus:border-eng/50 font-mono text-sm leading-relaxed bg-surface/30 resize-y min-h-[300px] outline-none transition-all"
              />
            </div>
          </div>

          {/* ── Sidebar Settings ── */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-surface-darker/40 p-6 shadow-sm sticky top-4">
              <h3 className="text-sm font-bold text-primary mb-5 uppercase tracking-wider">Settings</h3>

              <div className="space-y-5">
                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-secondary-light uppercase tracking-wider mb-2">Category</label>
                  <select
                    className="w-full p-3 rounded-xl border border-surface-darker/50 focus:ring-2 focus:ring-eng/30 text-sm bg-white outline-none transition-all"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option>Engineering</option>
                    <option>Agriculture</option>
                    <option>IT Services</option>
                    <option>Company News</option>
                  </select>
                </div>

                {/* URL Slug */}
                <div>
                  <label className="block text-xs font-semibold text-secondary-light uppercase tracking-wider mb-2">URL Slug</label>
                  <div className="flex items-center gap-0 border border-surface-darker/50 rounded-xl overflow-hidden bg-white">
                    <span className="text-xs text-secondary-light pl-3 shrink-0 select-none">blog/</span>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full p-3 pl-1 text-sm font-mono font-semibold text-primary outline-none bg-transparent"
                    />
                  </div>
                  <p className="text-[10px] text-secondary-light mt-1.5">Auto-updates when you change the title</p>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-xs font-semibold text-secondary-light uppercase tracking-wider mb-2">Author</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl border border-surface-darker/50 focus:ring-2 focus:ring-eng/30 text-sm outline-none transition-all"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  />
                </div>

                {/* Read Time */}
                <div className="flex items-center justify-between bg-surface/80 rounded-xl px-4 py-3">
                  <span className="text-xs font-semibold text-secondary-light uppercase tracking-wider">Read time</span>
                  <span className="text-sm font-bold text-primary">{Math.max(1, Math.ceil((formData.content?.split(/\s+/).length || 0) / 200))} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  // ────────── List View ──────────
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary font-[family-name:var(--font-poppins)]">Blog Manager</h1>
        <button onClick={openNewEditor} className="flex items-center gap-2 bg-eng text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-eng-dark transition-colors">
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
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEditEditor(blog)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit post">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete post">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-secondary">No blog posts found. Write one above!</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
