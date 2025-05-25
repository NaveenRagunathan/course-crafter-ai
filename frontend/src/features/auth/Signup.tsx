import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';
import AuthContainer from './AuthContainer';

function getPasswordStrength(password: string) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', agree: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const passwordStrength = getPasswordStrength(form.password);

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
    <AuthContainer>
      <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-tr from-[#6C63FF] to-[#00CFFF] bg-clip-text text-transparent drop-shadow-lg">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-sm mx-auto animate-fadeIn">
        {/* Name */}
        <div className="relative">
          <input
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            required
            className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white/70 outline-none transition-all"
            placeholder=" "
            aria-label="Full Name"
          />
          <label className="absolute left-4 top-2 text-gray-500 text-sm pointer-events-none transition-all peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-blue-600 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400">
            Full Name
          </label>
        </div>
        {/* Email */}
        <div className="relative">
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white/70 outline-none transition-all"
            placeholder=" "
            aria-label="Email"
          />
          <label className="absolute left-4 top-2 text-gray-500 text-sm pointer-events-none transition-all peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-blue-600 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400">
            Email
          </label>
        </div>
        {/* Password */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            required
            className="peer w-full px-4 pt-6 pb-2 rounded-xl border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white/70 outline-none transition-all pr-10"
            placeholder=" "
            aria-label="Password"
          />
          <label className="absolute left-4 top-2 text-gray-500 text-sm pointer-events-none transition-all peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-blue-600 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400">
            Password
          </label>
          <button type="button" className="absolute right-3 top-6 text-xs text-blue-600 hover:underline focus:outline-none" onClick={() => setShowPassword(s => !s)} tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {/* Password Strength Meter */}
          {form.password && (
            <div className="mt-2 flex gap-1">
              {[0,1,2,3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full ${passwordStrength > i ? 'bg-gradient-to-r from-[#6C63FF] to-[#00CFFF]' : 'bg-gray-200'}`}></div>
              ))}
              <span className="ml-2 text-xs text-gray-500">{['Weak','Fair','Good','Strong'][passwordStrength-1] || ''}</span>
            </div>
          )}
        </div>
        {/* Terms Checkbox */}
        <label className="flex items-center gap-2 text-sm select-none">
          <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} className="accent-blue-500 rounded focus:ring-2 focus:ring-blue-200" />
          I agree to the <a href="/terms" className="underline text-blue-600">Terms & Conditions</a>
        </label>
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
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {/* Social Login Placeholder */}
        <div className="my-4 flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        {/* SocialLogin component can go here */}
        {/* <SocialLogin /> */}
      </form>
      {/* Footer Links */}
      <div className="mt-6 text-center text-xs text-gray-500 flex flex-col gap-1">
        <div>
          Already have an account? <a href="/login" className="text-blue-600 underline transition-all hover:text-purple-600">Log in</a>
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
