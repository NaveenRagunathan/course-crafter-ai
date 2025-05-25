import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
// import { authApi } from '../../services/api'; // Uncomment when real API exists

export default function MFA() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      // Mocked: Replace with real API call, e.g., await authApi.mfaVerify(code)
      await new Promise(res => setTimeout(res, 800));
      if (code === '123456') {
        setSuccess('MFA verified!');
        toast.success('MFA verified!');
      } else {
        throw new Error('Invalid code.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed.');
      toast.error(err.message || 'Verification failed.');
      setSuccess('');
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center" role="main" aria-labelledby="mfa-title">
      <h2 id="mfa-title" className="text-2xl font-bold mb-4">Multi-Factor Authentication</h2>
      <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="mfa-desc">
        <p id="mfa-desc" className="text-sm text-gray-600 mb-2">Enter the 6-digit code from your authenticator app or email.</p>
        <input
          ref={inputRef}
          name="code"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          autoFocus
          aria-label="One Time Passcode"
          aria-required="true"
          aria-invalid={!!error}
          placeholder="Enter OTP code"
          className="w-full p-2 border rounded text-center tracking-widest text-lg"
          value={code}
          onChange={e => setCode(e.target.value.replace(/[^0-9]/g, ''))}
          required
        />
        {error && <div className="text-red-600 text-sm" aria-live="assertive">{error}</div>}
        {success && <div className="text-green-600 text-sm" aria-live="polite">{success}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
          aria-busy={loading}
        >
          {loading && <span className="loader border-white mr-2" aria-hidden="true"></span>}
          Verify
        </button>
      </form>
    </div>
  );
}
