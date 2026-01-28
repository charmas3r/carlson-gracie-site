import type { Metadata } from 'next';
import { InstructorsPageContent } from './InstructorsPageContent';

export const metadata: Metadata = {
  title: 'Our Instructors | Carlson Gracie BJJ San Diego',
  description:
    'Meet our world-class Brazilian Jiu-Jitsu instructors. Black belt certified with decades of combined experience in competition and teaching.',
};

export default function InstructorsPage() {
  return <InstructorsPageContent />;
}
