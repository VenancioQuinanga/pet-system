import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
          <main className="mt-5 pt-2 pb-2">
            {children}
          </main>
      </body>
    </html>
  );
}
