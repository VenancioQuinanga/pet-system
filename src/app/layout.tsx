import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Components
import FlashMessage from '../components/layout/FlashMessage';

// Contexts
import { FlashMessageProvider } from '../context/FlashMessageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gest-Vet',
  description: 'Criando um sistema de petshop'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-ao">
      <body className={inter.className}>
        <FlashMessageProvider>
          <main className="mt-3 pt-3 pb-3">
            <FlashMessage />
            {children}
          </main>
        </FlashMessageProvider>
      </body>
    </html>
  );
}
