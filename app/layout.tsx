import type { Metadata } from 'next';
import { Inter, Anton } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Analytics } from '@/components/Analytics';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });

export const metadata: Metadata = {
  title: {
    default: 'Carlson Gracie Escondido | Escondido Brazilian Jiu-Jitsu | San Diego BJJ',
    template: '%s | Carlson Gracie Escondido',
  },
  description:
    'Transform your body, sharpen your mind, build confidence. Premier Brazilian Jiu-Jitsu training in Escondido, San Diego.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Carlson Gracie Escondido',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${anton.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange={false}
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
