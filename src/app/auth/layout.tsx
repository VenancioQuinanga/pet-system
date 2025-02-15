export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
      <main className="mt-0 justify-content-center align-items-center">
        {children}
      </main>
    </>
  );
}
