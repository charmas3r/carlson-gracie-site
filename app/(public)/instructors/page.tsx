import type { Metadata } from 'next';
import { getInstructors } from '@/lib/sanity';
import { InstructorsPageContent } from './InstructorsPageContent';

export const metadata: Metadata = {
  title: 'Our Instructors | Carlson Gracie BJJ San Diego',
  description:
    'Meet our world-class Brazilian Jiu-Jitsu instructors. Black belt certified with decades of combined experience in competition and teaching.',
};

export default async function InstructorsPage() {
  const instructors = await getInstructors();
  return <InstructorsPageContent instructors={instructors} />;
}
