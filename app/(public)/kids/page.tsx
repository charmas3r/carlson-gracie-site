import type { Metadata } from 'next';
import { getKidsSchedule, groupKidsScheduleByLevel } from '@/lib/sanity';
import { KidsPageContent } from './KidsPageContent';

export const metadata: Metadata = {
  title: 'Kids BJJ Program | Ages 4-15 | Carlson Gracie San Diego',
  description:
    'Build confidence, discipline, and self-defense skills with our Kids Brazilian Jiu-Jitsu program. Age-appropriate classes for Little Champions (4-6), Kids (7-11), and Teens (12-15) in Escondido, San Diego.',
  keywords: [
    'kids BJJ San Diego',
    'kids martial arts',
    'children jiu-jitsu',
    'youth BJJ',
    'anti-bullying martial arts',
    'kids self-defense',
    'Escondido kids martial arts',
  ],
};

export default async function KidsPage() {
  const kidsSchedule = await getKidsSchedule();
  const ageGroups = groupKidsScheduleByLevel(kidsSchedule);
  return <KidsPageContent ageGroups={ageGroups} />;
}
