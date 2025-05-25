import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';
import SocialLogin from './SocialLogin';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} required />
        <div className="relative">
          <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full p-2 border rounded pr-10" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="button" className="absolute right-2 top-2 text-xs" onClick={() => setShowPassword(s => !s)} tabIndex={-1}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" /> Remember Me
          </label>
          <a href="/forgot-password" className="text-blue-600 underline text-sm">Forgot Password?</a>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
      </form>
      <div className="my-4 text-center text-gray-600">or</div>
      <SocialLogin />
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account? <a href="/signup" className="text-blue-600 underline">Sign up</a>
      </div>
    </div>
  );
}
