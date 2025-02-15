// Components
import Navbar from '../../components/layout/Navbar/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
      <Navbar />
      <main className="mt-5 pt-5 pb-5">
        {children}
      </main>
    </>
  );
}
