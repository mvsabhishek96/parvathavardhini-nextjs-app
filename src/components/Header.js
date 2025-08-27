'use client';
import { useUserStore } from '@/store/userStore';

export default function Header() {
  // Get the user object and logout action from our global store
  const { user, logout } = useUserStore();

  // This is a "guard clause". If there is no user, this component
  // will render nothing, so it stays hidden until login is complete.
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
        onClick={logout} // When clicked, this calls the logout action from our store
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        <i className="fas fa-sign-out-alt mr-2"></i>
        Logout
      </button>
    </div>
  );
}