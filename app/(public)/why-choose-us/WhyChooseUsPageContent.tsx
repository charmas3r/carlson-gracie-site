'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Users,
  Shield,
  Heart,
  Target,
  Star,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const reasons = [
  {
    icon: Award,
    title: 'World-Class Lineage',
    description:
      'Direct lineage to Carlson Gracie Sr., one of the most legendary figures in BJJ history. Our techniques and teaching methods are proven at the highest levels.',
  },
  {
    icon: Users,
    title: 'Family Environment',
    description:
      'We welcome students of all ages and backgrounds. Our academy feels like family, where everyone supports each other\'s journey.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description:
      'Clean, well-maintained facilities. All instructors are certified in First Aid/CPR. We prioritize safety without sacrificing effective training.',
  },
  {
    icon: Target,
    title: 'Proven Results',
    description:
      'Our students consistently medal at local and national competitions. More importantly, they develop confidence and skills that last a lifetime.',
  },
  {
    icon: Heart,
    title: 'Supportive Community',
    description:
      'More than just a gym—we\'re a community. Regular social events, competition support, and lifelong friendships are part of the experience.',
  },
  {
    icon: Star,
    title: 'Flexible Programs',
    description:
      'Morning, afternoon, and evening classes. Kids, adults, and competition programs. We have options for every schedule and goal.',
  },
];

const values = [
  'Respect for all training partners',
  'Continuous improvement mindset',
  'Integrity on and off the mats',
  'Supporting each other\'s growth',
  'Excellence in technique and character',
  'Humility to always keep learning',
];

export function WhyChooseUsPageContent() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
              Why <span className="text-primary">Choose Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Not all BJJ academies are the same. Here&apos;s what makes
              Carlson Gracie San Diego the best choice for your martial arts journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reasons Grid */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <reason.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold md:text-4xl mb-6">Our Values</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Brazilian Jiu-Jitsu is more than techniques—it&apos;s a way of life.
                These values guide everything we do at our academy.
              </p>
              <ul className="space-y-4">
                {values.map((value) => (
                  <li key={value} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">The Carlson Gracie Legacy</h3>
              <p className="text-white/90 mb-6">
                Carlson Gracie Sr. was one of the most influential figures in
                Brazilian Jiu-Jitsu history. Known for his tough, effective style
                and legendary fight team, his legacy lives on through academies
                like ours around the world.
              </p>
              <p className="text-white/90 mb-6">
                Training at a Carlson Gracie academy means learning techniques
                proven at the highest levels of competition and real-world
                self-defense.
              </p>
              <p className="font-semibold">
                &ldquo;Punch a black belt in the face, he becomes a brown belt.
                Punch him again, purple...&rdquo;
              </p>
              <p className="text-white/70 text-sm mt-2">
                — Carlson Gracie Sr.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
            Experience the Difference
          </h2>
          <p className="text-xl text-white/90 mb-8">
            See for yourself why students choose Carlson Gracie San Diego.
            Your first class is always free.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link href="/contact">Book Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
