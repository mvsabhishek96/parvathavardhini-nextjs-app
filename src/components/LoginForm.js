// LoginForm.js
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
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl traditional-border max-w-md w-full relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-500 rounded-full opacity-20"></div>
      <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-maroon-500 rounded-full opacity-20"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center text-maroon-800 font-display mb-2">
          Committee Login
        </h2>
        <div className="ornamental-divider">
          <i className="fas fa-lock text-gold-600 bg-white px-2 relative z-10"></i>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-5">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-600"></i>
              <input
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="form-input pl-10"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="relative">
              <i className="fas fa-key absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-600"></i>
              <input
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pl-10"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          {error && <p className="text-red-600 text-sm italic mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}

          <button
            type="submit"
            className="w-full gold-button text-lg"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>Enter Sacred Portal
          </button>
        </form>
      </div>
    </div>
  );
}