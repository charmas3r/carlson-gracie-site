import type { Metadata } from 'next';
import { getSchedule, groupScheduleByDay } from '@/lib/sanity';
import { SchedulePageContent } from './SchedulePageContent';

export const metadata: Metadata = {
  title: 'Class Schedule | Carlson Gracie BJJ San Diego',
  description:
    'View our weekly BJJ class schedule. Morning, afternoon, and evening classes available for adults and kids in Escondido, San Diego.',
};

export default async function SchedulePage() {
  const schedule = await getSchedule();
  const groupedSchedule = groupScheduleByDay(schedule);
  return <SchedulePageContent schedule={groupedSchedule} />;
}
