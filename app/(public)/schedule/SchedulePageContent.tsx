'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SanityClassSchedule } from '@/lib/sanity';

// Fallback data for when Sanity has no content yet
const fallbackSchedule: Record<string, SanityClassSchedule[]> = {
  Monday: [
    { _id: '1', time: '9:00 AM', className: 'Adults Jiu-Jitsu (Gi)', level: 'All Levels', duration: '90 min', dayOfWeek: 'Monday', isActive: true },
    { _id: '2', time: '4:00 PM', className: 'Kids Jiu-Jitsu (Novice) - Gi', level: 'Ages 4-6', duration: '30 min', dayOfWeek: 'Monday', isActive: true },
    { _id: '3', time: '4:30 PM', className: 'Kids Jiu-Jitsu (Intermediate) - Gi', level: 'Ages 7-11', duration: '45 min', dayOfWeek: 'Monday', isActive: true },
    { _id: '4', time: '5:15 PM', className: 'Kids Jiu-Jitsu (Advanced) - Gi', level: 'Ages 12-Teens', duration: '60 min', dayOfWeek: 'Monday', isActive: true },
    { _id: '5', time: '6:30 PM', className: 'Adults Jiu-Jitsu (Gi)', level: 'All Levels', duration: '90 min', dayOfWeek: 'Monday', isActive: true },
    { _id: '6', time: '8:00 PM', className: 'Competition Adults Jiu-Jitsu (Gi)', level: 'Advanced', duration: '60 min', dayOfWeek: 'Monday', isActive: true },
  ],
  Tuesday: [
    { _id: '7', time: '9:00 AM', className: 'Adults Jiu-Jitsu (No-Gi)', level: 'All Levels', duration: '90 min', dayOfWeek: 'Tuesday', isActive: true },
    { _id: '8', time: '4:00 PM', className: 'Kids Jiu-Jitsu (Novice) - No-Gi', level: 'Ages 4-6', duration: '30 min', dayOfWeek: 'Tuesday', isActive: true },
    { _id: '9', time: '4:30 PM', className: 'Kids Jiu-Jitsu (Intermediate) - No-Gi', level: 'Ages 7-11', duration: '45 min', dayOfWeek: 'Tuesday', isActive: true },
    { _id: '10', time: '5:15 PM', className: 'Kids Jiu-Jitsu (Advanced) - No-Gi', level: 'Ages 12-Teens', duration: '60 min', dayOfWeek: 'Tuesday', isActive: true },
    { _id: '11', time: '6:30 PM', className: 'Adults Jiu-Jitsu (No-Gi)', level: 'All Levels', duration: '90 min', dayOfWeek: 'Tuesday', isActive: true },
    { _id: '12', time: '8:00 PM', className: 'Competition Adults Jiu-Jitsu (No-Gi)', level: 'Advanced', duration: '60 min', dayOfWeek: 'Tuesday', isActive: true },
  ],
  Wednesday: [
    { _id: '13', time: '9:00 AM', className: 'Adults Jiu-Jitsu (Gi)', level: 'All Levels', duration: '90 min', dayOfWeek: 'Wednesday', isActive: true },
    { _id: '14', time: '4:00 PM', className: 'Kids Jiu-Jitsu (Novice) - Gi', level: 'Ages 4-6', duration: '30 min', dayOfWeek: 'Wednesday', isActive: true },
    { _id: '15', time: '4:30 PM', className: 'Kids Jiu-Jitsu (Intermediate) - Gi', level: 'Ages 7-11', duration: '45 min', dayOfWeek: 'Wednesday', isActive: true },
    { _id: '16', time: '5:15 PM', className: 'Kids Jiu-Jitsu (Advanced) - Gi', level: 'Ages 12-Teens', duration: '60 min', dayOfWeek: 'Wednesday', isActive: true },
    { _id: '17', time: '6:30 PM', className: 'Adults Jiu-Jitsu (Gi)', level: 'All Levels', duration: '90 min', dayOfWeek: 'Wednesday', isActive: true },
    { _id: '18', time: '8:00 PM', className: 'Competition Adults Jiu-Jitsu (Gi)', level: 'Advanced', duration: '60 min', dayOfWeek: 'Wednesday', isActive: true },
  ],
  Thursday: [
    { _id: '19', time: '9:00 AM', className: 'Adults Jiu-Jitsu (No-Gi)', level: 'All Levels', duration: '90 min', dayOfWeek: 'Thursday', isActive: true },
    { _id: '20', time: '4:00 PM', className: 'Kids Jiu-Jitsu (Novice) - No-Gi', level: 'Ages 4-6', duration: '30 min', dayOfWeek: 'Thursday', isActive: true },
    { _id: '21', time: '4:30 PM', className: 'Kids Jiu-Jitsu (Intermediate) - No-Gi', level: 'Ages 7-11', duration: '45 min', dayOfWeek: 'Thursday', isActive: true },
    { _id: '22', time: '5:15 PM', className: 'Kids Jiu-Jitsu (Advanced) - No-Gi', level: 'Ages 12-Teens', duration: '60 min', dayOfWeek: 'Thursday', isActive: true },
    { _id: '23', time: '6:30 PM', className: 'Adults Jiu-Jitsu (No-Gi)', level: 'All Levels', duration: '90 min', dayOfWeek: 'Thursday', isActive: true },
    { _id: '24', time: '8:00 PM', className: 'Competition Adults Jiu-Jitsu (No-Gi)', level: 'Advanced', duration: '60 min', dayOfWeek: 'Thursday', isActive: true },
  ],
  Friday: [
    { _id: '25', time: '9:00 AM', className: 'Adults Jiu-Jitsu (Gi)', level: 'All Levels', duration: '90 min', dayOfWeek: 'Friday', isActive: true },
    { _id: '26', time: '4:00 PM', className: 'Kids Jiu-Jitsu (Novice) - Gi', level: 'Ages 4-6', duration: '30 min', dayOfWeek: 'Friday', isActive: true },
    { _id: '27', time: '4:30 PM', className: 'Kids Jiu-Jitsu (Intermediate) - Gi', level: 'Ages 7-11', duration: '45 min', dayOfWeek: 'Friday', isActive: true },
    { _id: '28', time: '5:15 PM', className: 'Kids Jiu-Jitsu (Advanced) - Gi', level: 'Ages 12-Teens', duration: '60 min', dayOfWeek: 'Friday', isActive: true },
    { _id: '29', time: '6:30 PM', className: 'Jiu-Jitsu Open Mat', level: 'All Levels', duration: '90 min', dayOfWeek: 'Friday', isActive: true },
    { _id: '30', time: '8:00 PM', className: 'Competition Adults Jiu-Jitsu (Gi)', level: 'Advanced', duration: '60 min', dayOfWeek: 'Friday', isActive: true },
  ],
  Saturday: [
    { _id: '31', time: '9:00 AM', className: 'Private Lessons', level: 'Private', duration: '90 min', dayOfWeek: 'Saturday', isActive: true },
    { _id: '32', time: '10:00 AM', className: 'Jiu-Jitsu Open Mat', level: 'All Levels', duration: '90 min', dayOfWeek: 'Saturday', isActive: true },
  ],
  Sunday: [
    { _id: '33', time: '10:00 AM', className: 'Wrestling/Jiu-Jitsu Open Mat', level: 'All Levels', duration: '90 min', dayOfWeek: 'Sunday', isActive: true },
  ],
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Helper to convert time string to minutes for sorting
function timeToMinutes(time: string): number {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

// Sort classes by time
function sortByTime(classes: SanityClassSchedule[]): SanityClassSchedule[] {
  return [...classes].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
}

const levelColors: Record<string, string> = {
  'All Levels': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Advanced': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Ages 4-6': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Ages 7-11': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  'Ages 12-Teens': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  'Private': 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-400',
};

interface SchedulePageContentProps {
  schedule?: Record<string, SanityClassSchedule[]>;
}

export function SchedulePageContent({ schedule }: SchedulePageContentProps) {
  const [selectedDay, setSelectedDay] = useState('Monday');

  // Check if schedule has any content
  const hasContent = schedule && Object.values(schedule).some(day => day.length > 0);
  const displaySchedule = hasContent ? schedule : fallbackSchedule;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold md:text-5xl mb-4">
              Class <span className="text-primary">Schedule</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find a class that fits your schedule. Morning, afternoon, and
              evening options available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          {/* Day Selector */}
          <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors',
                  selectedDay === day
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Classes List */}
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {displaySchedule[selectedDay]?.length > 0 ? (
              sortByTime(displaySchedule[selectedDay]).map((item) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex items-center gap-4 sm:w-32">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.className}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.duration}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-sm font-medium',
                      levelColors[item.level] || 'bg-gray-100'
                    )}
                  >
                    {item.level}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">No classes scheduled for {selectedDay}</p>
                <p>Check back soon or contact us for updates!</p>
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              First week is always FREE!
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Book Your Free Week</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
