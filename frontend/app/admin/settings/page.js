'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock, FiCheck } from 'react-icons/fi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AdminSettings() {
  const router = useRouter();
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDone(false);

    if (form.next.length < 10) return setError('New password must be at least 10 characters.');
    if (form.next !== form.confirm) return setError('New passwords do not match.');

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify({ current_password: form.current, new_password: form.next }),
      });

      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const detail = Array.isArray(data.detail) ? data.detail[0]?.msg : data.detail;
        throw new Error(detail || 'Could not change password.');
      }

      setDone(true);
      setForm({ current: '', next: '', confirm: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-surface-darker bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-eng/20 focus:border-eng';

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-primary font-[family-name:var(--font-poppins)] mb-2">Settings</h1>
      <p className="text-secondary text-sm mb-8">Change your admin password. Use at least 10 characters.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-surface-darker/40 p-6 space-y-5">
        {error && <div role="alert" className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}
        {done && (
          <div role="status" className="p-3 bg-green-50 text-green-700 rounded-xl text-sm border border-green-100 flex items-center gap-2">
            <FiCheck /> Password updated successfully.
          </div>
        )}

        <div>
          <label htmlFor="current" className="text-sm font-medium text-primary mb-2 block">Current password</label>
          <input id="current" name="current" type="password" autoComplete="current-password" required value={form.current} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="next" className="text-sm font-medium text-primary mb-2 block">New password</label>
          <input id="next" name="next" type="password" autoComplete="new-password" required minLength={10} value={form.next} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="confirm" className="text-sm font-medium text-primary mb-2 block">Confirm new password</label>
          <input id="confirm" name="confirm" type="password" autoComplete="new-password" required minLength={10} value={form.confirm} onChange={handleChange} className={inputClass} />
        </div>

        <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 gradient-eng text-white disabled:opacity-60">
          <FiLock /> {loading ? 'Updating...' : 'Change password'}
        </button>
      </form>
    </div>
  );
}
