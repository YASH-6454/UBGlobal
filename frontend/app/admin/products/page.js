'use client';
import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiImage } from 'react-icons/fi';
import Image from 'next/image';

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', division: 'Engineering', description: '', specs: '', image: '', category: '', emoji: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/products`);
      const data = await res.json();
      setProducts(data);
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
    
    const productPayload = {
      ...formData,
      specs: formData.specs.split('\\n').filter(s => s.trim() !== '')
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/products`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(productPayload)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: '', division: 'Engineering', description: '', specs: '', image: '', category: '', emoji: '' });
        fetchProducts();
      } else {
        alert('Failed to save product');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary font-[family-name:var(--font-poppins)]">Products Manager</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-eng text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-eng-dark transition-colors">
          <FiPlus /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-10"><div className="loader-ring w-8 h-8" /></div>
      ) : (
        <div className="bg-white rounded-3xl border border-surface-darker/40 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface text-secondary-light text-sm">
                <th className="p-4 font-semibold border-b border-surface-darker/40">Image</th>
                <th className="p-4 font-semibold border-b border-surface-darker/40">Name</th>
                <th className="p-4 font-semibold border-b border-surface-darker/40">Division</th>
                <th className="p-4 font-semibold border-b border-surface-darker/40">Category</th>
                <th className="p-4 font-semibold border-b border-surface-darker/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-surface-darker/20 hover:bg-surface/50 transition-colors">
                  <td className="p-4">
                    <div className="w-16 h-16 rounded-lg relative overflow-hidden bg-surface border border-surface-darker/20">
                      {product.image ? <Image src={product.image} alt={product.name} fill className="object-cover" /> : <FiImage className="text-secondary absolute inset-0 m-auto text-xl" />}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-primary">{product.name}</td>
                  <td className="p-4"><span className="px-3 py-1 bg-surface-darker/30 rounded-full text-xs font-semibold text-secondary">{product.division}</span></td>
                  <td className="p-4">
                    {product.category && <span className="text-xs text-secondary bg-surface rounded px-2 py-1">{product.emoji} {product.category}</span>}
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-secondary">No products found. Add one above!</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Product Name</label>
                  <input type="text" required className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Division</label>
                  <select className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.division} onChange={e => setFormData({...formData, division: e.target.value})}>
                    <option>Engineering</option>
                    <option>Agriculture</option>
                    <option>IT Services</option>
                    <option>Handcrafts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Category (Optional)</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Fruits, Diyas" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Emoji (Optional)</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.emoji} onChange={e => setFormData({...formData, emoji: e.target.value})} placeholder="e.g. 🍎, 🪔" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Description</label>
                <textarea required rows="3" className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Specifications (one per line)</label>
                <textarea rows="3" className="w-full p-3 rounded-xl border border-surface-darker/60 focus:ring-2 focus:ring-eng/50" value={formData.specs} onChange={e => setFormData({...formData, specs: e.target.value})} placeholder="e.g. Size: 50mm&#10;Material: EN8" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Product Image</label>
                <div className="flex items-center gap-4">
                  {formData.image && <div className="w-16 h-16 rounded-lg relative overflow-hidden border"><Image src={formData.image} alt="Preview" fill className="object-cover" /></div>}
                  <label className="cursor-pointer bg-surface border border-surface-darker/60 px-4 py-2 rounded-lg font-medium text-secondary hover:bg-surface-darker/30 transition-colors">
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-surface-darker/40">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-semibold text-secondary hover:bg-surface transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-semibold bg-eng text-white hover:bg-eng-dark transition-colors">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
