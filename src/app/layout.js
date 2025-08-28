import AuthListener from '@/components/AuthListener';
import './globals.css';
import { Laila, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'], display: 'swap', variable: '--font-body',
  weight: ['300', '400', '500', '600', '700']
});
const laila = Laila({
  subsets: ['latin'], display: 'swap', variable: '--font-display',
  weight: ['600', '700']
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${laila.variable}`}>
      <head>
        <title>Committee Donation Form</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body>
        <AuthListener />
        <div className="slideshow fixed top-0 left-0 w-full h-full -z-10 overflow-hidden brightness-75">
          <style jsx global>{`
            @keyframes kenburns {
              0%, 100% { opacity: 0; transform: scale(1.15) rotate(2deg) translate(5%, -5%); }
              4%, 33% { opacity: 1; transform: scale(1) rotate(0deg) translate(0, 0); }
              37%, 96% { opacity: 0; transform: scale(1) rotate(0deg) translate(0, 0); }
            }
          `}</style>
          <img src="/images/image1.jpeg" alt="Temple" className="absolute top-0 left-0 w-full h-full object-cover opacity-0" style={{ animation: 'kenburns 24s linear infinite 0s' }} />
          <img src="/images/image2.jpg" alt="Deity" className="absolute top-0 left-0 w-full h-full object-cover opacity-0" style={{ animation: 'kenburns 24s linear infinite 8s' }} />
          <img src="/images/image3.jpeg" alt="Festival" className="absolute top-0 left-0 w-full h-full object-cover opacity-0" style={{ animation: 'kenburns 24s linear infinite 16s' }} />
        </div>

        <div className="container mx-auto p-4 relative z-10 flex flex-col min-h-screen text-dark-color">
          <header className="logo text-center mb-5">
              <h1 className="text-3xl lg:text-4xl font-bold text-white font-display" style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.7)' }}>
                  <i className="fas fa-om text-accent-color"></i> Donation Portal
              </h1>
          </header>

          <main className="flex-grow flex flex-col items-center justify-center w-full">
            {children}
          </main>

          <footer className="w-full text-center p-4 mt-auto text-white text-sm font-light" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              <p>Developed by mvsabhishek96@gmail.com</p>
          </footer>
        </div>
      </body>
    </html>
  );
}