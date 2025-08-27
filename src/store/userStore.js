import { create } from 'zustand';
import { signOut } from 'firebase/auth'; // 1. Import signOut from Firebase
import { auth } from '@/lib/firebase';    // 2. Import our configured auth service

export const useUserStore = create((set) => ({
  // State: The initial information in our store
  user: null,

  // Action: A function to update the user
  setUser: (userData) => set({ user: userData }),

  // Action: Update the logout function to also call Firebase signOut
  logout: () => {
    signOut(auth); // Tell Firebase to sign the user out
    set({ user: null }); // Clear the user from our global store
  },
}));