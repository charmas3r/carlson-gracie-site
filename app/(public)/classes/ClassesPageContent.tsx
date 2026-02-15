'use client';

import { motion } from 'framer-motion';
import { Clock, Users, Award, Dumbbell, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const programs = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    subtitle: 'Perfect for beginners',
    description:
      'Learn the core techniques and principles of Brazilian Jiu-Jitsu in a supportive, structured environment. No experience required.',
    duration: '60 min',
    level: 'All Levels',
    schedule: 'Mon, Wed, Fri - 6:00 PM',
    features: [
      'Core positions and escapes',
      'Basic submissions',
      'Self-defense applications',
      'Drilling and technique practice',
    ],
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    id: 'advanced',
    title: 'Advanced BJJ',
    subtitle: 'For experienced practitioners',
    description:
      'Take your game to the next level with advanced techniques, strategies, and live sparring. Blue belt and above recommended.',
    duration: '90 min',
    level: 'Blue Belt+',
    schedule: 'Tue, Thu - 7:00 PM, Sat - 10:00 AM',
    features: [
      'Advanced guard systems',
      'Competition strategies',
      'Submission chains',
      'Extended sparring sessions',
    ],
    icon: Award,
    color: 'bg-purple-500',
  },
  {
    id: 'competition',
    title: 'Competition Team',
    subtitle: 'Train to compete',
    description:
      'Intensive training for students serious about competing. Tournament preparation, drilling, and competition-focused sparring.',
    duration: '120 min',
    level: 'By Invitation',
    schedule: 'Sat - 12:00 PM',
    features: [
      'Tournament game planning',
      'Competition drilling',
      'High-intensity sparring',
      'Video analysis',
    ],
    icon: Dumbbell,
    color: 'bg-red-500',
  },
  {
    id: 'nogi',
    title: 'No-Gi Grappling',
    subtitle: 'Submission wrestling',
    description:
      'Train without the traditional gi for a faster-paced, wrestling-influenced style of grappling. Great for MMA and self-defense.',
    duration: '60 min',
    level: 'All Levels',
    schedule: 'Mon, Wed - 7:30 PM',
    features: [
      'Wrestling takedowns',
      'Leg lock systems',
      'Scramble situations',
      'MMA-applicable techniques',
    ],
    icon: Dumbbell,
    color: 'bg-orange-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ClassesPageContent() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/kids%20gallery/Photo%20Feb%2014%202026%2C%2010%2036%2022%20AM%20%281%29.webp)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
              Our <span className="text-primary">Classes</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From complete beginners to seasoned competitors, we have a program
              designed for your goals. All classes taught by experienced black
              belt instructors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2"
          >
            {programs.map((program) => (
              <motion.div
                key={program.id}
                variants={cardVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Card Header */}
                <div className={`${program.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <program.icon className="h-10 w-10" />
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {program.level}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{program.title}</h2>
                  <p className="text-white/80">{program.subtitle}</p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">
                    {program.description}
                  </p>

                  {/* Schedule Info */}
                  <div className="flex items-center gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {program.schedule}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button asChild className="w-full">
                    <Link href="/contact">Try This Class Free</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Kids Program CTA */}
      <section className="py-16 bg-primary/10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for Kids Classes?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We offer specialized programs for children ages 4-15 with
            age-appropriate curriculum and certified instructors.
          </p>
          <Button asChild size="lg">
            <Link href="/kids">View Kids Program</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
