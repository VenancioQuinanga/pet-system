
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Components
import Navbar from '../components/layout/Navbar/Navbar';
import FlashMessage from '../components/layout/FlashMessage';

// Contexts
import { FlashMessageProvider } from '../context/FlashMessageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pet-System',
  description: 'Criando um sistema de petshop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="pt-ao">
      <body className={inter.className}>
        <FlashMessageProvider>
          <Navbar />
          <main className="main mt-5 pt-5 pb-5">
            <FlashMessage />
            {children}
          </main>
        </FlashMessageProvider>
      </body>
    </html>
  );
}
