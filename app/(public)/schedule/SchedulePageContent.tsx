'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const schedule = {
  Monday: [
    { time: '6:00 AM', class: 'Morning BJJ', level: 'All Levels', duration: '60 min' },
    { time: '12:00 PM', class: 'Lunch BJJ', level: 'All Levels', duration: '60 min' },
    { time: '4:00 PM', class: 'Little Champions', level: 'Ages 4-7', duration: '30 min' },
    { time: '5:00 PM', class: 'Kids BJJ', level: 'Ages 8-12', duration: '45 min' },
    { time: '6:00 PM', class: 'Fundamentals', level: 'All Levels', duration: '60 min' },
    { time: '7:30 PM', class: 'No-Gi', level: 'All Levels', duration: '60 min' },
  ],
  Tuesday: [
    { time: '6:00 AM', class: 'Morning BJJ', level: 'All Levels', duration: '60 min' },
    { time: '12:00 PM', class: 'Lunch BJJ', level: 'All Levels', duration: '60 min' },
    { time: '5:30 PM', class: 'Teen Program', level: 'Ages 13-15', duration: '60 min' },
    { time: '7:00 PM', class: 'Advanced BJJ', level: 'Blue Belt+', duration: '90 min' },
  ],
  Wednesday: [
    { time: '6:00 AM', class: 'Morning BJJ', level: 'All Levels', duration: '60 min' },
    { time: '12:00 PM', class: 'Lunch BJJ', level: 'All Levels', duration: '60 min' },
    { time: '4:00 PM', class: 'Little Champions', level: 'Ages 4-7', duration: '30 min' },
    { time: '5:00 PM', class: 'Kids BJJ', level: 'Ages 8-12', duration: '45 min' },
    { time: '6:00 PM', class: 'Fundamentals', level: 'All Levels', duration: '60 min' },
    { time: '7:30 PM', class: 'No-Gi', level: 'All Levels', duration: '60 min' },
  ],
  Thursday: [
    { time: '6:00 AM', class: 'Morning BJJ', level: 'All Levels', duration: '60 min' },
    { time: '12:00 PM', class: 'Lunch BJJ', level: 'All Levels', duration: '60 min' },
    { time: '5:30 PM', class: 'Teen Program', level: 'Ages 13-15', duration: '60 min' },
    { time: '7:00 PM', class: 'Advanced BJJ', level: 'Blue Belt+', duration: '90 min' },
  ],
  Friday: [
    { time: '6:00 AM', class: 'Morning BJJ', level: 'All Levels', duration: '60 min' },
    { time: '12:00 PM', class: 'Open Mat', level: 'All Levels', duration: '90 min' },
    { time: '4:00 PM', class: 'Little Champions', level: 'Ages 4-7', duration: '30 min' },
    { time: '5:00 PM', class: 'Kids BJJ', level: 'Ages 8-12', duration: '45 min' },
    { time: '6:00 PM', class: 'Fundamentals', level: 'All Levels', duration: '60 min' },
  ],
  Saturday: [
    { time: '9:00 AM', class: 'All Levels BJJ', level: 'All Levels', duration: '90 min' },
    { time: '10:30 AM', class: 'Advanced BJJ', level: 'Blue Belt+', duration: '90 min' },
    { time: '11:00 AM', class: 'Teen Program', level: 'Ages 13-15', duration: '60 min' },
    { time: '12:00 PM', class: 'Competition Team', level: 'Invite Only', duration: '120 min' },
  ],
  Sunday: [],
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const levelColors: Record<string, string> = {
  'All Levels': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Blue Belt+': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Ages 4-7': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Ages 8-12': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  'Ages 13-15': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  'Invite Only': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export function SchedulePageContent() {
  const [selectedDay, setSelectedDay] = useState('Monday');

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
            {schedule[selectedDay as keyof typeof schedule].length > 0 ? (
              schedule[selectedDay as keyof typeof schedule].map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex items-center gap-4 sm:w-32">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.class}</h3>
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
                <p className="text-lg">No classes scheduled for Sunday</p>
                <p>Rest and recover!</p>
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              First class is always FREE!
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Book Your Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
