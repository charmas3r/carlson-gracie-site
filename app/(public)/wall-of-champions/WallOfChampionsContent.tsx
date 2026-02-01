'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, Award, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Achievement {
  id: string;
  studentName: string;
  category: 'competition' | 'promotion' | 'spotlight';
  title: string;
  date: string; // ISO format: '2026-01-15'
  description: string;
  featured?: boolean;
}

// Mock data for all achievements - in production, this would come from Sanity CMS
const achievements: Achievement[] = [
  // Competition achievements
  {
    id: '1',
    studentName: 'Marcus Johnson',
    category: 'competition',
    title: 'IBJJF San Diego Open Champion',
    date: '2026-01-15',
    description: 'Gold medal in Adult Blue Belt Medium Heavy division.',
    featured: true,
  },
  {
    id: '4',
    studentName: 'Alex Rivera',
    category: 'competition',
    title: 'Submission Only Tournament Winner',
    date: '2025-12-20',
    description: '5 submission victories in absolute division.',
  },
  {
    id: '7',
    studentName: 'Jessica Wong',
    category: 'competition',
    title: 'NAGA San Diego Silver Medalist',
    date: '2025-11-15',
    description: 'Second place in Women\'s Advanced division.',
  },
  {
    id: '10',
    studentName: 'Daniel Martinez',
    category: 'competition',
    title: 'Grappling Industries Double Gold',
    date: '2025-10-28',
    description: 'First place in both Gi and No-Gi divisions.',
  },
  {
    id: '13',
    studentName: 'Emma Thompson',
    category: 'competition',
    title: 'American Nationals Qualifier',
    date: '2025-09-18',
    description: 'Bronze medal and qualification for nationals.',
  },

  // Promotion achievements
  {
    id: '2',
    studentName: 'Sofia Rodriguez',
    category: 'promotion',
    title: 'Promoted to Purple Belt',
    date: '2026-01-10',
    description: 'After 3 years of dedicated training, Sofia earned her purple belt.',
    featured: true,
  },
  {
    id: '5',
    studentName: 'Kevin Park',
    category: 'promotion',
    title: 'Promoted to Blue Belt',
    date: '2025-12-15',
    description: 'First stripe to blue belt after 18 months of consistent training.',
  },
  {
    id: '8',
    studentName: 'Rachel Green',
    category: 'promotion',
    title: 'Promoted to Brown Belt',
    date: '2025-11-05',
    description: '7 years of dedication culminating in this major milestone.',
  },
  {
    id: '11',
    studentName: 'Tommy Anderson',
    category: 'promotion',
    title: 'Kids Blue Belt Achievement',
    date: '2025-10-20',
    description: 'Outstanding technique and attitude on and off the mats.',
  },
  {
    id: '14',
    studentName: 'Miguel Santos',
    category: 'promotion',
    title: 'Promoted to Black Belt',
    date: '2025-09-10',
    description: 'After 12 years of journey, achieving the highest rank in BJJ.',
  },

  // Spotlight achievements
  {
    id: '3',
    studentName: 'Tyler Chen',
    category: 'spotlight',
    title: 'Student of the Month',
    date: '2026-01-01',
    description: '100% attendance and outstanding attitude on and off the mats.',
    featured: true,
  },
  {
    id: '6',
    studentName: 'Sarah Mitchell',
    category: 'spotlight',
    title: 'Most Improved Student',
    date: '2025-12-05',
    description: 'Incredible progress in technique and confidence over 6 months.',
  },
  {
    id: '9',
    studentName: 'Brandon Lee',
    category: 'spotlight',
    title: 'Community Service Award',
    date: '2025-11-01',
    description: 'Volunteered 50+ hours teaching kids self-defense workshops.',
  },
  {
    id: '12',
    studentName: 'Isabella Gomez',
    category: 'spotlight',
    title: 'Perfect Attendance Award',
    date: '2025-10-15',
    description: 'Not missed a single class in 12 months of training.',
  },
  {
    id: '15',
    studentName: 'Chris Walker',
    category: 'spotlight',
    title: 'Leadership Excellence',
    date: '2025-09-05',
    description: 'Outstanding mentorship to new students and positive influence.',
  },
];

// Map categories to icons
const categoryIcons = {
  competition: Trophy,
  promotion: Star,
  spotlight: Medal,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

export function WallOfChampionsContent() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'competition' | 'promotion' | 'spotlight'>('all');

  // Filter achievements based on active filter
  const filteredAchievements = activeFilter === 'all'
    ? achievements
    : achievements.filter((achievement) => achievement.category === activeFilter);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              Celebrating Excellence
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
              Wall of Champions
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Celebrating the achievements of our incredible students. From competition victories to belt promotions, we honor every milestone on the journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-background sticky top-16 md:top-20 z-40 border-b dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('all')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Target className="h-4 w-4" />
              All Achievements
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('competition')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                activeFilter === 'competition'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Trophy className="h-4 w-4" />
              Competition
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('promotion')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                activeFilter === 'promotion'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Star className="h-4 w-4" />
              Promotion
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter('spotlight')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                activeFilter === 'spotlight'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Medal className="h-4 w-4" />
              Spotlight
            </motion.button>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredAchievements.map((achievement) => {
                const Icon = categoryIcons[achievement.category];
                return (
                  <motion.div
                    key={achievement.id}
                    variants={cardVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    layout
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Icon and Student Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          achievement.category === 'competition'
                            ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : achievement.category === 'promotion'
                              ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                              : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {achievement.studentName}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {achievement.category}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-foreground mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>

                    {/* Date */}
                    <p className="text-xs text-muted-foreground">
                      {new Date(achievement.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredAchievements.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No achievements found for this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our community of champions and start your Brazilian Jiu-Jitsu journey today.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="/contact">Start Your Free Trial</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
