import { create } from 'zustand';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => {
    signOut(auth);
    set({ user: null });
  },
}));