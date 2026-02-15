import type { Metadata } from 'next';
import { FAQPageContent } from './FAQPageContent';

export const metadata: Metadata = {
  title: 'FAQ | Carlson Gracie Escondido',
  description:
    'Frequently asked questions about Brazilian Jiu-Jitsu classes at Carlson Gracie Escondido. Learn about trials, pricing, what to wear, kids programs, and more.',
  keywords: [
    'BJJ FAQ',
    'Brazilian Jiu-Jitsu questions',
    'Escondido BJJ FAQ',
    'martial arts FAQ',
    'kids BJJ questions',
    'free trial BJJ',
  ],
};

export default function FAQPage() {
  return <FAQPageContent />;
}
