'use client';
import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiImage } from 'react-icons/fi';
import Image from 'next/image';

export default function BannersManager() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', division: '', cta_text: '', cta_link: '', image: '', title_color: '#ffffff', title_color_2: '#ffffff', title_color_3: '#ffffff', description_color: '#ffffff' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/banners`);
      const data = await res.json();
      setBanners(data);
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
      const url = editingId 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/banners/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/banners`;
      
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ title: '', description: '', division: '', cta_text: '', cta_link: '', image: '', title_color: '#ffffff', title_color_2: '#ffffff', title_color_3: '#ffffff', description_color: '#ffffff' });
        fetchBanners();
      } else {
        alert('Failed to save banner');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', division: '', cta_text: '', cta_link: '', image: '', title_color: '#ffffff', title_color_2: '#ffffff', title_color_3: '#ffffff', description_color: '#ffffff' });
    setIsModalOpen(true);
  };

  const openEditModal = (banner) => {
    setEditingId(banner.id);
    setFormData({ 
      title: banner.title, 
      description: banner.description, 
      division: banner.division || '', 
      cta_text: banner.cta_text || '', 
      cta_link: banner.cta_link || '', 
      image: banner.image || '',
      title_color: banner.title_color || '#ffffff',
      title_color_2: banner.title_color_2 || '#ffffff',
      title_color_3: banner.title_color_3 || '#ffffff',
      description_color: banner.description_color || '#ffffff'
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/banners/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary font-[family-name:var(--font-poppins)]">Banners Manager</h1>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-eng text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-eng-dark transition-colors">
          <FiPlus /> Add Banner
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10"><div className="loader-ring w-8 h-8" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map(banner => (
            <div key={banner.id} className="bg-white rounded-3xl overflow-hidden border border-surface-darker/40 shadow-sm flex flex-col group">
              <div className="relative h-48 overflow-hidden bg-surface flex items-center justify-center">
                {banner.image ? <Image src={banner.image} alt={banner.title} fill className="object-cover" /> : <FiImage className="text-secondary text-3xl" />}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(banner)} className="p-2 bg-blue-500 text-white rounded-lg"><FiEdit2 /></button>
                  <button onClick={() => handleDelete(banner.id)} className="p-2 bg-red-500 text-white rounded-lg"><FiTrash2 /></button>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-xs font-bold text-secondary-light uppercase tracking-wider mb-2">{banner.division || 'General'}</span>
                <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">{banner.title}</h3>
                <p className="text-secondary text-sm line-clamp-2 mb-4">{banner.description}</p>
                <div className="mt-auto pt-4 border-t border-surface-darker/40 text-sm font-semibold text-eng">
                  {banner.cta_text || 'No CTA'} → {banner.cta_link || '#'}
                </div>
              </div>
            </div>
          ))}
          {banners.length === 0 && <div className="col-span-full p-8 text-center text-secondary bg-white rounded-3xl border">No banners found. Add one above!</div>}
        </div>
      )}

      {/* Add/Edit Banner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">{editingId ? 'Edit Banner' : 'Add New Banner'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Banner Title (Put each line on a new row)</label>
                <textarea rows="3" required className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Line 1&#10;Line 2&#10;Line 3" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Description</label>
                <textarea required rows="2" className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                  <label className="block text-[11px] font-semibold text-primary mb-2 uppercase tracking-wide">Title Color 1</label>
                  <div className="flex items-center gap-2">
                    <input type="color" className="w-10 h-10 p-1 rounded-lg border border-surface-darker/60 cursor-pointer" value={formData.title_color} onChange={e => setFormData({...formData, title_color: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-primary mb-2 uppercase tracking-wide">Title Color 2</label>
                  <div className="flex items-center gap-2">
                    <input type="color" className="w-10 h-10 p-1 rounded-lg border border-surface-darker/60 cursor-pointer" value={formData.title_color_2} onChange={e => setFormData({...formData, title_color_2: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-primary mb-2 uppercase tracking-wide">Title Color 3</label>
                  <div className="flex items-center gap-2">
                    <input type="color" className="w-10 h-10 p-1 rounded-lg border border-surface-darker/60 cursor-pointer" value={formData.title_color_3} onChange={e => setFormData({...formData, title_color_3: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-primary mb-2 uppercase tracking-wide">Desc Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" className="w-10 h-10 p-1 rounded-lg border border-surface-darker/60 cursor-pointer" value={formData.description_color} onChange={e => setFormData({...formData, description_color: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">CTA Text (Button)</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.cta_text} onChange={e => setFormData({...formData, cta_text: e.target.value})} placeholder="e.g. Get a Quote" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">CTA Link</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.cta_link} onChange={e => setFormData({...formData, cta_link: e.target.value})} placeholder="e.g. /contact" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Division Tag (Optional)</label>
                <input type="text" className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.division} onChange={e => setFormData({...formData, division: e.target.value})} placeholder="e.g. Engineering" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Background Image</label>
                <div className="flex items-center gap-4">
                  {formData.image && <div className="w-24 h-16 rounded-lg relative overflow-hidden border"><Image src={formData.image} alt="Preview" fill className="object-cover" /></div>}
                  <label className="cursor-pointer bg-surface border border-surface-darker/60 px-4 py-2 rounded-lg font-medium text-secondary hover:bg-surface-darker/30 transition-colors">
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-surface-darker/40">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-semibold text-secondary hover:bg-surface transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-semibold bg-eng text-white hover:bg-eng-dark transition-colors">Save Banner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
