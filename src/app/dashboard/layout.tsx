export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
      <main className="pt-5 pb-3">
        {children}
      </main>
    </>
  );
}
