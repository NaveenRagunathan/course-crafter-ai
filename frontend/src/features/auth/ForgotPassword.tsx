import React, { useState } from 'react';
import { authApi } from '../../services/api';
import AuthContainer from './AuthContainer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSuccess('Password reset link sent! Check your email.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-tr from-[#6C63FF] to-[#00CFFF] bg-clip-text text-transparent drop-shadow-lg">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-sm mx-auto animate-fadeIn">
        {/* Email */}
        <div className="relative">
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white/70 outline-none transition-all"
            placeholder=" "
            aria-label="Email"
          />
          <label className="absolute left-4 top-2 text-gray-500 text-sm pointer-events-none transition-all peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-blue-600 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400">
            Email
          </label>
        </div>
        {/* Error/Success Feedback */}
        {error && <div className="text-red-600 text-sm animate-shake">{error}</div>}
        {success && <div className="text-green-600 text-sm animate-bounceIn">{success}</div>}
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00CFFF] text-white font-semibold text-lg shadow-lg hover:scale-[1.03] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
          )}
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {/* Footer Links */}
      <div className="mt-6 text-center text-xs text-gray-500 flex flex-col gap-1">
        <div>
          Remember your password? <a href="/login" className="text-blue-600 underline transition-all hover:text-purple-600">Log in</a>
        </div>
        <div className="flex items-center justify-center gap-2">
          <a href="/privacy" className="underline">Privacy Policy</a>
          <span>|</span>
          <a href="/terms" className="underline">Terms</a>
          <span>|</span>
          <a href="/cookies" className="underline">Cookie Consent</a>
        </div>
      </div>
    </AuthContainer>
  );
}