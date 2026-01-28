import type { Metadata } from 'next';
import { ContactPageContent } from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us | Carlson Gracie BJJ San Diego',
  description:
    'Get in touch with Carlson Gracie San Diego. Book your free trial class, ask questions, or visit our academy in Escondido. Call, text, or fill out our contact form.',
  keywords: [
    'contact BJJ gym',
    'free trial BJJ',
    'Escondido martial arts',
    'San Diego BJJ contact',
  ],
};

export default function ContactPage() {
  return <ContactPageContent />;
}
