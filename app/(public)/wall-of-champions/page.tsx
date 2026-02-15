import type { Metadata } from 'next';
import { getAchievements } from '@/lib/sanity';
import { WallOfChampionsContent } from './WallOfChampionsContent';

export const metadata: Metadata = {
  title: 'Wall of Champions | Student Achievements | Carlson Gracie Escondido',
  description:
    'Celebrate our students\' achievements in Brazilian Jiu-Jitsu. From competition victories to belt promotions, we honor every milestone at Carlson Gracie Escondido in Escondido.',
  keywords: [
    'BJJ achievements San Diego',
    'BJJ competition results',
    'belt promotions',
    'BJJ student success',
    'martial arts achievements',
    'Escondido BJJ champions',
    'Carlson Gracie champions',
  ],
  openGraph: {
    title: 'Wall of Champions | Student Achievements | Carlson Gracie Escondido',
    description:
      'Celebrate our students\' achievements in Brazilian Jiu-Jitsu. From competition victories to belt promotions, we honor every milestone.',
    type: 'website',
  },
};

export default async function WallOfChampionsPage() {
  const achievements = await getAchievements();
  return <WallOfChampionsContent achievements={achievements} />;
}
