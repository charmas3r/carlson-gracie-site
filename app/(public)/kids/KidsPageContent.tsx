'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Brain,
  Users,
  Trophy,
  Heart,
  Target,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { KidsAgeGroup } from '@/lib/sanity';

// Fallback data when Sanity has no content
const fallbackAgeGroups: KidsAgeGroup[] = [
  {
    id: 'little-champions',
    title: 'Little Champions (Novice)',
    ages: '4-6 years',
    level: 'Ages 4-6',
    duration: '30 min',
    scheduleDays: 'Mon, Tue, Wed, Thu, Fri - 4:00 PM',
    description:
      'Introduction to BJJ through fun games and activities. Focus on motor skills, listening, and basic movements.',
    highlights: [
      'Game-based learning',
      'Basic coordination drills',
      'Teamwork activities',
      'Positive reinforcement',
    ],
    color: 'bg-green-500',
  },
  {
    id: 'kids',
    title: 'Kids BJJ (Intermediate)',
    ages: '7-11 years',
    level: 'Ages 7-11',
    duration: '45 min',
    scheduleDays: 'Mon, Tue, Wed, Thu, Fri - 4:30 PM',
    description:
      'Structured classes with technique drilling, belt progression, and supervised sparring. Building discipline and confidence.',
    highlights: [
      'Belt rank progression',
      'Technical drilling',
      'Light sparring',
      'Self-defense skills',
    ],
    color: 'bg-blue-500',
  },
  {
    id: 'teens',
    title: 'Teen Program (Advanced)',
    ages: '12-15 years',
    level: 'Ages 12-Teens',
    duration: '60 min',
    scheduleDays: 'Mon, Tue, Wed, Thu, Fri - 5:15 PM',
    description:
      'Advanced training preparing teens for adult classes. Competition opportunities and leadership development.',
    highlights: [
      'Advanced techniques',
      'Competition training',
      'Mentorship program',
      'Leadership skills',
    ],
    color: 'bg-purple-500',
  },
];

const benefits = [
  {
    icon: Shield,
    title: 'Bully Prevention',
    description:
      'Confidence and skills to handle confrontations peacefully and safely.',
  },
  {
    icon: Brain,
    title: 'Focus & Discipline',
    description:
      'Structured training improves attention span and self-control.',
  },
  {
    icon: Users,
    title: 'Social Skills',
    description: 'Make lifelong friends in a supportive team environment.',
  },
  {
    icon: Trophy,
    title: 'Goal Achievement',
    description: 'Belt progression teaches perseverance and celebrating success.',
  },
  {
    icon: Heart,
    title: 'Physical Fitness',
    description: 'Fun exercise that builds strength, flexibility, and endurance.',
  },
  {
    icon: Target,
    title: 'Self-Defense',
    description: 'Practical skills to protect themselves in any situation.',
  },
];

const faqs = [
  {
    question: 'Is BJJ safe for kids?',
    answer:
      'Yes! BJJ is one of the safest martial arts for children. There are no strikes or kicks. Training focuses on control and technique rather than strength. Our instructors are trained in child safety and maintain strict supervision at all times.',
  },
  {
    question: 'What should my child wear to their first class?',
    answer:
      'Athletic clothes like shorts/leggings and a t-shirt work great for the first class. We have loaner gis (uniforms) available. Once enrolled, we can help you purchase the right gi for your child.',
  },
  {
    question: 'What if my child is shy or nervous?',
    answer:
      'Totally normal! Our instructors are experienced at helping shy children feel comfortable. We start with fun games and activities. Parents can watch from our viewing area. Most kids warm up within the first 10 minutes.',
  },
  {
    question: 'How long until my child sees results?',
    answer:
      'Many parents notice improved confidence and focus within the first few weeks. Physical skills develop over months of consistent training. Belt promotions typically occur every 3-4 months for dedicated students.',
  },
  {
    question: 'Do you accommodate children with special needs?',
    answer:
      'Yes, we welcome children of all abilities. Please let us know about any special considerations so we can provide appropriate accommodations. Our instructors are trained to adapt techniques for different learning styles.',
  },
  {
    question: 'What are your family discounts?',
    answer:
      'We offer sibling discounts and family packages. The second child receives 15% off, and the third child 25% off. Contact us for details on our family membership options.',
  },
];

interface KidsPageContentProps {
  ageGroups?: KidsAgeGroup[];
}

export function KidsPageContent({ ageGroups }: KidsPageContentProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Use Sanity data if available, otherwise fallback
  const displayAgeGroups = ageGroups && ageGroups.length > 0 ? ageGroups : fallbackAgeGroups;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/kids-wall-photo.webp)' }}
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
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium mb-6">
              Ages 4-15
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
              Kids BJJ Program
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Building confident, disciplined, and resilient kids through
              Brazilian Jiu-Jitsu. Give your child skills that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/contact">Book Free Kids Week</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Why BJJ for Your Child?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Brazilian Jiu-Jitsu develops the whole child - physically,
              mentally, and socially.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Age-Appropriate Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curriculum designed specifically for each developmental stage.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {displayAgeGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className={`${group.color} p-6 text-white`}>
                  <h3 className="text-2xl font-bold mb-1">{group.title}</h3>
                  <p className="text-white/80">{group.ages}</p>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    {group.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{group.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {group.scheduleDays}
                  </p>

                  <ul className="space-y-2">
                    {group.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything parents need to know about our kids program.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial CTA Section */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book a FREE trial week for your child. No commitment required.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link href="/contact">Book Free Kids Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
