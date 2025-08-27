'use client';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from '@/store/userStore';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useUserStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Failed to log in. Please check your email and password.");
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-3xl font-bold text-center text-maroon-800 font-display mb-6">
        Committee Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-maroon-800 text-sm font-bold mb-2">Email</label>
          <input
            type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="your@email.com"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-maroon-800 text-sm font-bold mb-2">Password</label>
          <input
            type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 hover:scale-105 transition-transform text-maroon-900 font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  );
}