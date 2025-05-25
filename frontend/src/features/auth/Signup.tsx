import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', agree: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (!form.agree) {
      setError('You must agree to the Terms & Conditions.');
      return;
    }
    setLoading(true);
    try {
      await authApi.register(form.name, form.email, form.password);
      setSuccess('Sign up successful! Check your email to verify your account.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Sign up failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Name" className="w-full p-2 border rounded" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" value={form.password} onChange={handleChange} required />
        <label className="flex items-center">
          <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} className="mr-2" />
          I agree to the <a href="/terms" className="underline ml-1">Terms & Conditions</a>
        </label>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account? <a href="/login" className="text-blue-600 underline">Log in</a>
      </div>
    </div>
);
}
