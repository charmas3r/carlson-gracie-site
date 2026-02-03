'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SanityAchievement } from '@/lib/sanity';

// Fallback data for featured achievements
const fallbackAchievements: SanityAchievement[] = [
  {
    _id: '1',
    studentName: 'Marcus Johnson',
    category: 'competition',
    title: 'IBJJF San Diego Open Champion',
    date: '2026-01-15',
    description: 'Gold medal in Adult Blue Belt Medium Heavy division.',
    featured: true,
  },
  {
    _id: '2',
    studentName: 'Sofia Rodriguez',
    category: 'promotion',
    title: 'Promoted to Purple Belt',
    date: '2026-01-10',
    description: 'After 3 years of dedicated training, Sofia earned her purple belt.',
    featured: true,
  },
  {
    _id: '3',
    studentName: 'Tyler Chen',
    category: 'spotlight',
    title: 'Student of the Month',
    date: '2026-01-01',
    description: '100% attendance and outstanding attitude on and off the mats.',
    featured: true,
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
      staggerChildren: 0.15,
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
};

interface ChampionsPreviewProps {
  achievements?: SanityAchievement[];
}

export function ChampionsPreview({ achievements }: ChampionsPreviewProps) {
  // Use Sanity data if available, otherwise fall back to mock data
  const displayAchievements = achievements && achievements.length > 0 ? achievements : fallbackAchievements;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl mb-4">
            Wall of Champions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating the achievements of our incredible students. From
            competition victories to belt promotions, we honor every milestone.
          </p>
        </motion.div>

        {/* Featured Achievements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3 mb-10"
        >
          {displayAchievements.map((achievement) => {
            const Icon = categoryIcons[achievement.category];
            return (
              <motion.div
                key={achievement._id}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Icon */}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/wall-of-champions">
              View All Achievements
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
