import type { Metadata } from 'next';
import { ClassesPageContent } from './ClassesPageContent';

export const metadata: Metadata = {
  title: 'BJJ Classes | Adult & Kids Programs | Carlson Gracie Escondido',
  description:
    'Explore our Brazilian Jiu-Jitsu programs for all ages and skill levels. Adult BJJ, Kids BJJ, Competition Team, and Beginners programs available in Escondido, San Diego.',
  keywords: [
    'BJJ classes San Diego',
    'Brazilian Jiu-Jitsu classes',
    'adult BJJ',
    'kids martial arts',
    'competition BJJ',
    'beginners BJJ',
  ],
};

export default function ClassesPage() {
  return <ClassesPageContent />;
}
