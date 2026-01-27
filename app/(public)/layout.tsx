export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header will go here */}
      <main className="min-h-screen">{children}</main>
      {/* Footer will go here */}
    </>
  );
}
