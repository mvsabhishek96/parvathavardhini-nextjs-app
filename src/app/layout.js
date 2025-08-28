// layout.js
import AuthListener from '@/components/AuthListener';
import './globals.css';
import { Laila, Poppins } from 'next/font/google';
import Image from 'next/image';

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
      <head>
        <title>Divine Donation Portal</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body>
        <AuthListener />
        
        {/* Background Slideshow */}
        <div className="slideshow">
          <Image 
            src="/images/image1.jpeg" 
            alt="Temple" 
            fill
            className="slideshow-image" 
            style={{ animationDelay: '0s' }} 
            priority
          />
          <Image 
            src="/images/image2.jpg" 
            alt="Deity" 
            fill
            className="slideshow-image" 
            style={{ animationDelay: '8s' }} 
          />
          <Image 
            src="/images/image3.jpeg" 
            alt="Festival" 
            fill
            className="slideshow-image" 
            style={{ animationDelay: '16s' }} 
          />
        </div>

        <div className="container mx-auto p-4 relative z-10 flex flex-col min-h-screen text-dark">
          <header className="logo text-center my-6">
            <div className="inline-block p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-maroon-300 shadow-lg">
              <h1 className="text-4xl lg:text-5xl font-bold text-maroon-800 font-display mb-2">
                <i className="fas fa-om text-gold-500 mr-3"></i>Divine Donation Portal
              </h1>
              <p className="text-maroon-700 italic">Serve with devotion, give with heart</p>
            </div>
          </header>

          <main className="flex-grow flex flex-col items-center justify-center w-full py-4">
            {children}
          </main>

          <footer className="w-full text-center p-4 mt-8 text-white text-sm font-light bg-maroon-800/80 rounded-lg">
            <p>With divine blessings • Developed with ❤️ by mvsabhishek96@gmail.com</p>
          </footer>
        </div>
      </body>
    </html>
  );
}