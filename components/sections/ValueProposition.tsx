'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Zap } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'World-Class Instruction',
    description:
      'Learn from experienced black belt instructors with proven competitive and teaching credentials.',
  },
  {
    icon: Users,
    title: 'Family-Friendly Environment',
    description:
      'Programs for all ages, from kids as young as 4 to adults. Everyone is welcome at our academy.',
  },
  {
    icon: Zap,
    title: 'Results-Driven Training',
    description:
      'Progressive curriculum designed to build confidence, fitness, and real self-defense skills.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function ValueProposition() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-12 md:grid-cols-3"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
              >
                <value.icon className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                {value.title}
              </h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
