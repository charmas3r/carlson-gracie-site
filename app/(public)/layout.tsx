import { ExitIntentProvider } from '@/components/exit-intent';
import { MobileActionBar } from '@/components/mobile-actions';
import { Header, Footer } from '@/components/navigation';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExitIntentProvider>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Mobile-only sticky action bar */}
      <MobileActionBar />
    </ExitIntentProvider>
  );
}
