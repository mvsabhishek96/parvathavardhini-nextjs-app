'use client';
import LoginForm from '@/components/LoginForm';
import Header from '@/components/Header';
import DonationForm from '@/components/DonationForm';
import { useUserStore } from '@/store/userStore';

export default function HomePage() {
  const { user } = useUserStore();

  return (
    <div className="w-full">
      {user ? (
        // If a user is logged in, show this layout:
        <>
          <Header />
          <div className="flex justify-center">
            <DonationForm />
          </div>
        </>
      ) : (
        // If no user is logged in, show this:
        <div className="flex justify-center">
          <LoginForm />
        </div>
      )}
    </div>
  );
}