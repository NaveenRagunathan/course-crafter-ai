export default function SocialLogin() {
  // Placeholder for Google login integration
  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth logic
    alert('Google login coming soon!');
  };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center gap-2">
        <span className="material-icons">google</span> Continue with Google
      </button>
    </div>
  );
}
