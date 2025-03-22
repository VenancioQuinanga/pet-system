export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
      <main className="mt-5 pb-5">
        {children}
      </main>
    </>
  );
}
