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
        <>
          <Header />
          <div className="flex justify-center mt-8">
            <DonationForm />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <LoginForm />
        </div>
      )}
    </div>
  );
}