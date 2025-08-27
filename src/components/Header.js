'use client';
import { useUserStore } from '@/store/userStore';

export default function Header() {
  const { user, logout } = useUserStore();

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-between items-center w-full max-w-4xl mx-auto mb-4">
      <div className="bg-white/80 p-2 px-4 rounded-lg shadow">
        <i className="fas fa-user-check mr-2 text-maroon-800"></i>
        <span className="font-bold text-maroon-800">{user.email}</span>
      </div>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        <i className="fas fa-sign-out-alt mr-2"></i>
        Logout
      </button>
    </div>
  );
}