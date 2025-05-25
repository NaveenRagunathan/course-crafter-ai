import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!password || !confirm) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await authApi.resetPassword(token!, password);
      setSuccess('Password reset! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="password" type="password" placeholder="New Password" className="w-full p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} required />
        <input name="confirm" type="password" placeholder="Confirm Password" className="w-full p-2 border rounded" value={confirm} onChange={e => setConfirm(e.target.value)} required />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</button>
      </form>
      <div className="mt-4 text-center text-sm">
        <a href="/login" className="text-blue-600 underline">Back to Login</a>
      </div>
    </div>
  );
}
