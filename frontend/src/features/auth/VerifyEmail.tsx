import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authApi } from '../../services/api';
import { toast } from 'react-hot-toast';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'idle'|'verifying'|'success'|'error'>('idle');
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);
  const resendBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (token) {
      setStatus('verifying');
      authApi.verifyEmail(token)
        .then(() => {
          setStatus('success');
          toast.success('Email verified! You can now log in.');
        })
        .catch((err: any) => {
          setStatus('error');
          setError(err.message || 'Verification failed.');
          toast.error(err.message || 'Verification failed.');
        });
    }
  }, [token]);

  const handleResend = async () => {
    setResent(true);
    setError('');
    // Assume backend can resend verification (e.g., /auth/resend-verification)
    try {
      // TODO: Implement backend resend logic (e.g., /auth/resend-verification)
      toast.success('Verification email resent! (Mocked)');
    } catch (err: any) {
      setError(err.message || 'Failed to resend email.');
      toast.error(err.message || 'Failed to resend email.');
      setResent(false);
      resendBtnRef.current?.focus();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center" role="main" aria-labelledby="verify-email-title">
      <h2 id="verify-email-title" className="text-2xl font-bold mb-4">Verify Your Email</h2>
      {status === 'verifying' && <p className="mb-4" aria-live="polite">Verifying your email...</p>}
      {status === 'success' && <p className="mb-4 text-green-600" aria-live="polite">Your email has been verified! You can now <a href="/login" className="underline text-blue-600">log in</a>.</p>}
      {status === 'error' && <p className="mb-4 text-red-600" aria-live="assertive">{error}</p>}
      {status !== 'success' && (
        <>
          <p className="mb-4">A verification link has been sent to your email. Please check your inbox and follow the link to verify your account.</p>
          <button
            ref={resendBtnRef}
            onClick={handleResend}
            className="bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={resent}
            aria-disabled={resent}
            aria-busy={resent}
          >
            {resent ? 'Verification Email Sent!' : 'Resend Email'}
          </button>
        </>
      )}
    </div>
  );
}
