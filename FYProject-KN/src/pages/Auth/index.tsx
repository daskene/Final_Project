import { useState, type FormEvent } from 'react';
import { signInWithEmail, signUpWithEmail } from '../../services/firebase/auth';
import { isUsernameAvailable, claimUsername, getUserByUsername, isEmail } from '../../services/firebase/usernames';
import useAuth from '../../hooks/useAuth';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useAuth();

  // Redirect if already logged in
  if (user) {
    window.location.hash = '#dashboard';
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-slate-400">Redirecting...</p>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      // Sign Up validation
      if (!username || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      if (username.length < 3) {
        setError('Username must be at least 3 characters');
        return;
      }

      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        setError('Username can only contain letters, numbers, and underscores');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      setLoading(true);

      try {
        // Check username availability
        const available = await isUsernameAvailable(username);
        if (!available) {
          setError('Username is already taken. Please choose a different one.');
          setLoading(false);
          return;
        }

        // Create account
        const newUser = await signUpWithEmail(email, password);
        if (newUser) {
          await claimUsername(username, newUser.uid, email);
        }
        
        window.location.hash = '#dashboard';
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
        setError(errorMessage.replace('Firebase: ', '').replace(/\(auth\/[^)]+\)\.?/, '').trim());
      } finally {
        setLoading(false);
      }
    } else {
      // Sign In validation
      if (!username || !password) {
        setError('Please fill in all fields');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      setLoading(true);

      try {
        let emailToUse = username;

        // If not an email, look up username
        if (!isEmail(username)) {
          const userData = await getUserByUsername(username);
          if (!userData) {
            setError('Username not found');
            setLoading(false);
            return;
          }
          emailToUse = userData.email;
        }

        await signInWithEmail(emailToUse, password);
        window.location.hash = '#dashboard';
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
        setError(errorMessage.replace('Firebase: ', '').replace(/\(auth\/[^)]+\)\.?/, '').trim());
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-slate-400">
            {isSignUp ? 'Start your storytelling journey' : 'Continue your creative journey'}
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                {isSignUp ? 'Username' : 'Username or Email'}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder={isSignUp ? 'johndoe' : 'johndoe or you@example.com'}
                disabled={loading}
              />
              {isSignUp && (
                <p className="text-xs text-slate-400 mt-1">
                  3+ characters, letters, numbers, and underscores only
                </p>
              )}
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl px-4 py-3 font-semibold transition-colors"
            >
              {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
              className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="#dashboard" className="text-slate-400 hover:text-slate-300 text-sm transition-colors">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
