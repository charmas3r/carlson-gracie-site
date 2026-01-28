import type { Metadata } from 'next';
import { SchedulePageContent } from './SchedulePageContent';

export const metadata: Metadata = {
  title: 'Class Schedule | Carlson Gracie BJJ San Diego',
  description:
    'View our weekly BJJ class schedule. Morning, afternoon, and evening classes available for adults and kids in Escondido, San Diego.',
};

export default function SchedulePage() {
  return <SchedulePageContent />;
}
