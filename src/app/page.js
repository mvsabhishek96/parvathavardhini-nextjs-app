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
        // If user is logged in, show the Header and DonationForm
        <>
          <Header />
          <div className="flex justify-center mt-8 w-full">
            <DonationForm />
          </div>
        </>
      ) : (
        // If user is not logged in, show the LoginForm
        <div className="flex justify-center items-center w-full">
          <LoginForm />
        </div>
      )}
    </div>
  );
}