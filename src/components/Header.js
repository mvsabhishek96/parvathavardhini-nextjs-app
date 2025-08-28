// Header.js
'use client';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';

export default function Header() {
  const { user, logout } = useUserStore();
  if (!user) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-4xl mx-auto mb-6 gap-4">
      <div className="bg-white/90 p-3 px-5 rounded-xl shadow-md traditional-border">
        <i className="fas fa-user-check mr-2 text-maroon-700"></i>
        <span className="font-bold text-maroon-700">{user.email}</span>
      </div>
      
      <div className="flex gap-3 flex-wrap justify-center">
        <Link href="/submissions">
          <button className="bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center">
            <i className="fas fa-list mr-2"></i>
            View Records
          </button>
        </Link>

        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Divine Exit
        </button>
      </div>
    </div>
  );
}