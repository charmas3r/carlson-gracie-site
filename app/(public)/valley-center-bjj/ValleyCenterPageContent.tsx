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
  Shield,
  Award,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { ScheduleTimeSlot } from '@/lib/sanity';

const benefits = [
  {
    icon: Shield,
    title: 'Self-Defense Skills',
    description: 'Learn practical techniques that work in real situations',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Join a supportive family of practitioners near Valley Center',
  },
  {
    icon: Award,
    title: 'Expert Instruction',
    description: 'Train under certified black belt instructors',
  },
];

const programs = [
  { name: 'Adult BJJ', description: 'Ages 16+, all skill levels welcome' },
  { name: 'Kids BJJ', description: 'Ages 4-15, building confidence daily' },
  { name: "Women's Classes", description: 'Supportive environment for women' },
  { name: 'Competition Team', description: 'For those seeking tournaments' },
];

// Fallback schedule time slots
const fallbackTimeSlots: ScheduleTimeSlot[] = [
  {
    time: 'Morning',
    schedule: '9:00 AM - 90 min',
    description: 'Train before work. Perfect for early risers.',
  },
  {
    time: 'Afternoon',
    schedule: '4:00 PM - 5:15 PM',
    description: 'Kids classes available.',
  },
  {
    time: 'Evening',
    schedule: '6:30 PM - 9:00 PM',
    description: 'Multiple classes after work hours.',
  },
];

interface ValleyCenterPageContentProps {
  timeSlots?: ScheduleTimeSlot[];
}

export function ValleyCenterPageContent({ timeSlots }: ValleyCenterPageContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const displayTimeSlots = timeSlots && timeSlots.length > 0 ? timeSlots : fallbackTimeSlots;
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
        body: JSON.stringify({ ...data, source: 'valley-center-page' }),
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
              Serving Valley Center & Pauma Valley
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
              Brazilian Jiu-Jitsu Classes for{' '}
              <span className="text-primary">Valley Center</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Valley Center&apos;s closest premier BJJ academy. World-class instruction,
              family-friendly environment, and a community that feels like home.
              Just 15 minutes south on Valley Center Road.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/contact">Book Your Free Week</Link>
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

      {/* Why Valley Center Residents Choose Us */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Why Valley Center Residents Choose{' '}
              <span className="text-primary">Carlson Gracie</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Families from Valley Center, Pauma Valley, and the surrounding
              communities have trusted us with their martial arts training for years.
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: About */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <p>
                Located just 15 minutes south of Valley Center on Valley Center Road,
                our Escondido academy is the premier destination for Brazilian Jiu-Jitsu
                training in the North County area. Whether you&apos;re coming from{' '}
                <strong>Valley Center</strong>, <strong>Pauma Valley</strong>, or the{' '}
                <strong>Woods Valley</strong> area, you&apos;ll find our academy an
                easy drive with ample free parking.
              </p>
              <p>
                What sets us apart is our commitment to authentic Carlson Gracie
                Jiu-Jitsu—a lineage known worldwide for producing champion fighters
                and everyday practitioners who can confidently defend themselves.
                Our location offers the same world-class curriculum that has made
                Carlson Gracie academies famous globally.
              </p>
              <p>
                We understand that Valley Center families value quality instruction
                and a welcoming atmosphere. That&apos;s why we offer flexible class
                schedules to accommodate rural lifestyles and busy family calendars.
                Many of our members drive from Valley Center for our evening and
                weekend classes, as well as parents who bring their children to our
                renowned kids program.
              </p>

              {/* Local Landmarks */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 not-prose mt-8">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Easy Drive from Valley Center
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    15 min from Valley Center via Valley Center Rd
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    20 min from Pauma Valley
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Easy access via Valley Parkway
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Free parking available
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right: Benefits & Programs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Benefits */}
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}

              {/* Programs List */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4">Programs Available</h3>
                <ul className="space-y-3">
                  {programs.map((program) => (
                    <li key={program.name} className="flex items-center gap-3">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <div>
                        <span className="font-medium">{program.name}</span>
                        <span className="text-muted-foreground text-sm ml-2">
                          — {program.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule Highlights */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Convenient Schedule for Valley Center Families
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer morning, afternoon, and evening classes to fit your
              schedule—perfect for Valley Center families making the short drive.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {displayTimeSlots.map((slot) => (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm"
              >
                <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{slot.time}</h3>
                <p className="text-primary font-semibold mb-2">{slot.schedule}</p>
                <p className="text-muted-foreground text-sm">{slot.description}</p>
              </motion.div>
            ))}
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
                Book Your Free Week - Valley Center Area
              </h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and we&apos;ll contact you within 24 hours
                to schedule your complimentary week of classes.
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
                    Tell us about yourself
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Any experience? Goals? Questions about classes for Valley Center residents?"
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
                <h2 className="text-2xl font-bold mb-4">Getting Here from Valley Center</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Address:</strong>
                    <br />
                    1980 E. Valley Parkway, Escondido, CA 92027
                  </p>
                  <p>
                    <strong className="text-foreground">From Valley Center:</strong>
                    <br />
                    Head south on Valley Center Road toward Escondido. Continue straight
                    as it becomes Valley Parkway. Our academy is located on the right
                    side, just past the I-15 overpass. Total drive time is approximately
                    15 minutes.
                  </p>
                  <p>
                    <strong className="text-foreground">From Pauma Valley:</strong>
                    <br />
                    Take Highway 76 east to Valley Center Road, then head south toward
                    Escondido. Continue on Valley Parkway to our location on the right.
                  </p>
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
                  Also serving:
                </p>
                <div className="space-y-2">
                  <Link
                    href="/escondido-bjj"
                    className="text-primary font-semibold hover:underline flex items-center gap-2"
                  >
                    Escondido BJJ
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/north-county-san-diego-bjj"
                    className="text-primary font-semibold hover:underline flex items-center gap-2"
                  >
                    North County San Diego BJJ
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Train? Valley Center Families Welcome!
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Join families from Valley Center who have transformed their lives
            through Brazilian Jiu-Jitsu. Your first week is on us.
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
