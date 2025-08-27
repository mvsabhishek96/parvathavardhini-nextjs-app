import AuthListener from '@/components/AuthListener';
import './globals.css';
import { Laila, Poppins } from 'next/font/google';

// Setup custom fonts
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700']
});

const laila = Laila({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['600', '700']
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${laila.variable}`}>
      <body>
        <AuthListener />
        <div className="slideshow fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
          {/* These paths assume your 'public' folder has an 'images' subfolder */}
          <img src="/images/image1.jpeg" alt="Slide 1" className="slideshow-image child-1" />
          <img src="/images/image2.jpg" alt="Slide 2" className="slideshow-image child-2" />
          <img src="/images/image3.jpeg" alt="Slide 3" className="slideshow-image child-3" />
        </div>

        <div className="container mx-auto p-4 relative z-10 flex flex-col min-h-screen">
          <header className="logo text-center mb-5">
              <h1 className="text-3xl font-bold text-light-color font-display" style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.5)' }}>
                  <i className="fas fa-om text-accent-color"></i> Donation Portal
              </h1>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          <footer className="site-footer w-full text-center p-2 mt-auto text-light-color text-sm font-light" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
              <p>Developed by mvsabhishek96@gmail.com</p>
          </footer>
        </div>
      </body>
    </html>
  );
}