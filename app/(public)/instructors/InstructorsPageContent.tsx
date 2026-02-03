'use client';

import { motion } from 'framer-motion';
import { Award, Medal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { SanityInstructor, urlFor } from '@/lib/sanity';

// Fallback data for when Sanity has no content yet
const fallbackInstructors: SanityInstructor[] = [
  {
    _id: '1',
    name: 'Professor Carlos Silva',
    title: 'Head Instructor',
    belt: '4th Degree Black Belt',
    bio: 'Professor Carlos has been training Brazilian Jiu-Jitsu for over 25 years. A multiple-time IBJJF champion, he brings world-class technique and a passion for teaching to every class.',
    achievements: [
      'IBJJF World Champion (2x)',
      'Pan American Champion (4x)',
      '25+ years training experience',
      'Certified under Carlson Gracie Sr.',
    ],
    specialties: ['Competition Strategy', 'Guard Passing', 'Submissions'],
    order: 0,
    isActive: true,
  },
  {
    _id: '2',
    name: 'Professor Maria Santos',
    title: 'Kids Program Director',
    belt: '2nd Degree Black Belt',
    bio: 'Professor Maria specializes in youth development through martial arts. Her patient teaching style and child psychology background make her perfect for nurturing young champions.',
    achievements: [
      'Brazilian National Champion',
      'Child Development Certified',
      '15+ years teaching kids',
      'CPR/First Aid Certified',
    ],
    specialties: ['Youth Development', 'Self-Defense', 'Confidence Building'],
    order: 1,
    isActive: true,
  },
  {
    _id: '3',
    name: 'Coach Jake Thompson',
    title: 'Competition Coach',
    belt: 'Black Belt',
    bio: 'Coach Jake is our competition team leader. An active competitor himself, he brings cutting-edge techniques and tournament strategies to help our students succeed on the competition circuit.',
    achievements: [
      'IBJJF No-Gi World Medalist',
      'ADCC Trials Competitor',
      'Active competitor',
      '50+ tournament medals',
    ],
    specialties: ['No-Gi Grappling', 'Leg Locks', 'Wrestling'],
    order: 2,
    isActive: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

interface InstructorsPageContentProps {
  instructors?: SanityInstructor[];
}

export function InstructorsPageContent({ instructors }: InstructorsPageContentProps) {
  // Use Sanity data if available, otherwise fall back to mock data
  const displayInstructors = instructors && instructors.length > 0 ? instructors : fallbackInstructors;

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
              Meet Our <span className="text-primary">Instructors</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Learn from the best. Our instructors have decades of combined
              experience in competition and teaching.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            {displayInstructors.map((instructor, index) => (
              <motion.div
                key={instructor._id}
                variants={cardVariants}
                className={`flex flex-col gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                {/* Photo */}
                <div className="lg:w-1/3">
                  {instructor.image ? (
                    <div className="aspect-square relative rounded-2xl overflow-hidden">
                      <Image
                        src={urlFor(instructor.image).width(400).height(400).url()}
                        alt={instructor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                      <div className="text-center p-8">
                        <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Photo Coming Soon</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="lg:w-2/3">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">{instructor.name}</h2>
                        <p className="text-primary font-medium">
                          {instructor.title}
                        </p>
                      </div>
                      <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
                        {instructor.belt}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-6">{instructor.bio}</p>

                    {/* Achievements */}
                    {instructor.achievements && instructor.achievements.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          Achievements
                        </h3>
                        <ul className="grid grid-cols-2 gap-2">
                          {instructor.achievements.map((achievement) => (
                            <li
                              key={achievement}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Medal className="h-4 w-4 text-yellow-500" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Specialties */}
                    {instructor.specialties && instructor.specialties.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Specialties</h3>
                        <div className="flex flex-wrap gap-2">
                          {instructor.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Train with the Best
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Experience world-class instruction firsthand. Your first week is
            free.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link href="/contact">Book Your Free Week</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
