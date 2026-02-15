'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MapPin,
  Clock,
  Car,
  Users,
  Baby,
  Trophy,
  ChevronRight,
  CheckCircle,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { SaturdayClassInfo } from '@/lib/sanity';

const servingAreas = [
  { city: 'San Marcos', drive: '12 min via CA-78' },
  { city: 'Vista', drive: '15 min via CA-78' },
  { city: 'Carlsbad', drive: '18 min via I-5/CA-78' },
  { city: 'Encinitas', drive: '20 min via I-5' },
  { city: 'Oceanside', drive: '20 min via CA-78' },
  { city: 'Rancho Bernardo', drive: '10 min via I-15' },
];

const familyBenefits = [
  {
    icon: Baby,
    title: 'Kids Programs (Ages 4-15)',
    description:
      'Age-appropriate training that builds confidence, discipline, and anti-bullying skills.',
  },
  {
    icon: Users,
    title: 'Family Discounts',
    description:
      'Train together as a family with special multi-member pricing for North County families.',
  },
  {
    icon: Heart,
    title: 'Safe & Welcoming',
    description:
      'A clean, professional facility where families feel comfortable and kids thrive.',
  },
  {
    icon: Trophy,
    title: 'Competition Options',
    description:
      'From recreational training to tournament competition, we support all goals.',
  },
];

// Fallback Saturday schedule
const fallbackSaturdaySchedule: SaturdayClassInfo = {
  kidsTime: '9:00 AM',
  kidsDescription: 'All ages welcome. Perfect for families with school-age children.',
  adultsTime: '10:00 AM',
  adultsDescription: 'Parents train while kids attend the earlier session.',
};

interface NorthCountyPageContentProps {
  saturdaySchedule?: SaturdayClassInfo;
}

export function NorthCountyPageContent({ saturdaySchedule }: NorthCountyPageContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const displaySaturdaySchedule = saturdaySchedule || fallbackSaturdaySchedule;
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'north-county-page' }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitStatus({
        type: 'success',
        message: "Thank you! We'll contact you within 24 hours to schedule your free week.",
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://sb2gnofm9xtbm3op.public.blob.vercel-storage.com/why-choose-us/Photo%20Jul%2030%202025%2C%207%2057%2011%20PM.webp)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              Serving All of North County San Diego
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
              North County San Diego{' '}
              <span className="text-primary">Brazilian Jiu-Jitsu</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              The premier BJJ academy for North County families. Serving San Marcos,
              Vista, Carlsbad, Encinitas, Oceanside, Rancho Bernardo, and
              surrounding communities with world-class instruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/contact">Book Your Free Family Week</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-gray-900"
                asChild
              >
                <Link href="/schedule">View Schedule</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Conveniently Located for{' '}
              <span className="text-primary">All of North County</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re coming from the coast or inland communities, our
              central location makes training accessible for the entire North
              County region.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servingAreas.map((area, index) => (
              <motion.div
                key={area.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <Car className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">{area.city}</p>
                  <p className="text-sm text-muted-foreground">{area.drive}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center bg-white dark:bg-gray-800 rounded-xl p-6"
          >
            <h3 className="font-bold text-lg mb-2">Easy Freeway Access</h3>
            <p className="text-muted-foreground">
              Located at the intersection of North County&apos;s major freeways:{' '}
              <strong>I-15</strong>, <strong>I-5</strong>, and{' '}
              <strong>CA-78</strong>. Free parking available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Family-Friendly Focus */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              North County&apos;s{' '}
              <span className="text-primary">Family-Friendly</span> BJJ Academy
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              North County San Diego is known for its family-oriented communities.
              That&apos;s why we&apos;ve built an academy where entire families can
              train together in a safe, welcoming environment.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: Benefits */}
            <div className="space-y-6">
              {familyBenefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <p>
                North County San Diego has a well-deserved reputation for
                family-focused communities—from the suburban neighborhoods of{' '}
                <strong>San Marcos</strong> and <strong>Rancho Bernardo</strong> to
                the coastal cities of <strong>Carlsbad</strong> and{' '}
                <strong>Encinitas</strong>. Our academy was built with these
                families in mind.
              </p>
              <p>
                Unlike many martial arts schools that cater primarily to adults or
                focus solely on competition, we&apos;ve created a balanced
                environment where a 5-year-old learning their first techniques can
                train alongside a parent pursuing their black belt journey. This
                family-centered approach has made us the academy of choice for North
                County households.
              </p>
              <p>
                Our weekend classes are especially popular with North County
                families. Saturday morning kids classes allow parents to train at
                the same time, making BJJ a true family activity. Many of our
                members from <strong>Vista</strong>, <strong>Oceanside</strong>, and
                surrounding areas have told us this &quot;family training
                time&quot; has become the highlight of their week.
              </p>
              <p>
                Whether you live in the master-planned communities near the 78
                freeway or the established neighborhoods closer to the coast, our
                central location and flexible scheduling make it easy to make BJJ
                part of your family&apos;s lifestyle.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Weekend Schedule Highlight */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Weekend Classes for North County Families
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Busy weekday schedule? Our Saturday classes are designed for families
              who want to train together on the weekend.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm"
            >
              <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Saturday Kids Classes</h3>
              <p className="text-primary font-semibold text-lg mb-2">
                {displaySaturdaySchedule.kidsTime}
              </p>
              <p className="text-muted-foreground">
                {displaySaturdaySchedule.kidsDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm"
            >
              <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Saturday Open Mat</h3>
              <p className="text-primary font-semibold text-lg mb-2">
                {displaySaturdaySchedule.adultsTime}
              </p>
              <p className="text-muted-foreground">
                {displaySaturdaySchedule.adultsDescription}
              </p>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <Link href="/schedule">
              <Button variant="outline" size="lg">
                View Full Schedule
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-2">
                Book Your Free Week
              </h2>
              <p className="text-muted-foreground mb-6">
                Whether you&apos;re in San Marcos, Vista, Carlsbad, or anywhere in
                North County—we&apos;d love to welcome you to our academy.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone (optional)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(760) 500-7710"
                    {...register('phone')}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Tell us about your family
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Which city are you coming from? Interested in kids classes, adult classes, or both?"
                    {...register('message')}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                  />
                </div>

                {submitStatus && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                  {isSubmitting ? 'Sending...' : 'Claim My Free Week'}
                </Button>
              </form>
            </motion.div>

            {/* Map & Directions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Getting Here</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Address:</strong>
                    <br />
                    1980 E. Valley Parkway, Escondido, CA 92027
                  </p>
                  <div>
                    <strong className="text-foreground">Directions:</strong>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>
                          <strong>From San Marcos/Vista:</strong> Take CA-78 East,
                          exit at Via Rancho Parkway
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>
                          <strong>From Carlsbad/Encinitas:</strong> I-5 North to
                          CA-78 East, exit at Via Rancho Parkway
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>
                          <strong>From Oceanside:</strong> CA-78 East, exit at Via
                          Rancho Parkway
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>
                          <strong>From Rancho Bernardo:</strong> I-15 North, exit at
                          Via Rancho Parkway
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 flex items-center justify-center overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.8!2d-117.0523!3d33.1244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dbf4e8c1c1c1c1%3A0x0!2s1980+E+Valley+Pkwy%2C+Escondido%2C+CA+92027!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carlson Gracie BJJ - 1980 E Valley Pkwy, Escondido, CA 92027"
                />
              </div>

              {/* Cross-link */}
              <div className="bg-primary/10 rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Also see:
                </p>
                <Link
                  href="/escondido-bjj"
                  className="text-primary font-semibold hover:underline flex items-center gap-2"
                >
                  Escondido BJJ Page
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Join North County&apos;s BJJ Community
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Families from San Marcos to Oceanside have discovered the
            life-changing benefits of Brazilian Jiu-Jitsu at our academy. Your
            first week is free—no obligation, no pressure.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8"
            asChild
          >
            <Link href="/contact">Start Your Free Week Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
