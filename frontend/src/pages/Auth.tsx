import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Login, Signup, ForgotPassword, ResetPassword, VerifyEmail, MFA, LegalLinks } from '../features/auth';

const routeToComponent = (pathname: string) => {
  if (pathname === '/login') return <Login />;
  if (pathname === '/signup') return <Signup />;
  if (pathname === '/forgot-password') return <ForgotPassword />;
  if (pathname.startsWith('/reset-password')) return <ResetPassword />;
  if (pathname === '/verify-email') return <VerifyEmail />;
  if (pathname === '/mfa') return <MFA />;
  return <Login />;
};

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect /auth to /login for default
  useEffect(() => {
    if (location.pathname === '/auth') navigate('/login', { replace: true });
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        {routeToComponent(location.pathname)}
      </div>
      <LegalLinks />
    </div>
  );
}
