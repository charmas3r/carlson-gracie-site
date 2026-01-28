'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Trophy, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const benefits = [
  {
    icon: Shield,
    title: 'Bully Prevention',
    description: 'Build confidence and skills to handle any situation safely.',
  },
  {
    icon: Brain,
    title: 'Focus & Discipline',
    description: 'Structured training improves attention and self-control.',
  },
  {
    icon: Users,
    title: 'Social Skills',
    description: 'Make friends in a supportive, team-oriented environment.',
  },
  {
    icon: Trophy,
    title: 'Goal Achievement',
    description: 'Belt progression teaches perseverance and hard work.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function KidsHighlight() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Ages 4-15
            </div>

            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-6">
              Kids BJJ Program
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Give your child the gift of confidence, discipline, and real
              self-defense skills. Our age-appropriate programs make learning
              fun while building character.
            </p>

            {/* Benefits Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Link href="/kids">Book Free Kids Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/kids">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Placeholder for kids training image */}
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    Kids Training Photo
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Coming soon from photo shoot
                  </p>
                </div>
              </div>

              {/* Age badges */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                <span className="rounded-full bg-white/90 dark:bg-gray-800/90 px-3 py-1 text-xs font-medium shadow-lg">
                  Little Champions 4-7
                </span>
                <span className="rounded-full bg-white/90 dark:bg-gray-800/90 px-3 py-1 text-xs font-medium shadow-lg">
                  Kids 8-12
                </span>
                <span className="rounded-full bg-white/90 dark:bg-gray-800/90 px-3 py-1 text-xs font-medium shadow-lg">
                  Teens 13-15
                </span>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-primary/10 -z-10" />
            <div className="absolute -top-4 -left-4 h-16 w-16 rounded-xl bg-primary/5 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
