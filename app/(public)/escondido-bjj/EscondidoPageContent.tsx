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

const benefits = [
  {
    icon: Shield,
    title: 'Self-Defense Skills',
    description: 'Learn practical techniques that work in real situations',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Join a supportive family of practitioners from Escondido',
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
  { name: 'Women\'s Classes', description: 'Supportive environment for women' },
  { name: 'Competition Team', description: 'For those seeking tournaments' },
];

export function EscondidoPageContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        body: JSON.stringify({ ...data, source: 'escondido-page' }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitStatus({
        type: 'success',
        message: "Thank you! We'll contact you within 24 hours to schedule your free trial.",
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
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/mat-texture.png')] opacity-5" />
        <div className="mx-auto max-w-6xl px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              Serving Escondido & Rancho Bernardo
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-6">
              Brazilian Jiu-Jitsu Classes in{' '}
              <span className="text-primary">Escondido</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join Escondido&apos;s premier BJJ academy. World-class instruction,
              family-friendly environment, and a community that feels like home.
              Just minutes from downtown Escondido via I-15.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Book Your Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-gray-900"
              >
                View Schedule
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Escondido Residents Choose Us */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold md:text-4xl mb-4">
              Why Escondido Residents Choose{' '}
              <span className="text-primary">Carlson Gracie</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              For over a decade, families from Escondido, Rancho Bernardo, and the
              surrounding communities have trusted us with their martial arts
              training.
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
                Located just minutes from downtown Escondido, our academy has become
                the go-to destination for Brazilian Jiu-Jitsu training in North
                County San Diego. Whether you&apos;re coming from{' '}
                <strong>Westfield North County mall</strong>, the{' '}
                <strong>Escondido High School</strong> area, or{' '}
                <strong>Rancho Bernardo</strong>, you&apos;ll find our academy
                conveniently accessible via I-15.
              </p>
              <p>
                What sets us apart is our commitment to authentic Carlson Gracie
                Jiu-Jitsu—a lineage known worldwide for producing champion fighters
                and everyday practitioners who can confidently defend themselves.
                Our Escondido location offers the same world-class curriculum that
                has made Carlson Gracie academies famous globally.
              </p>
              <p>
                We understand that Escondido families value quality, convenience,
                and community. That&apos;s why we offer flexible class schedules to
                accommodate work commutes, school pickups, and busy family
                calendars. Many of our members are local professionals who train
                during lunch hours or after work, as well as parents who bring their
                children to our renowned kids program.
              </p>

              {/* Local Landmarks */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 not-prose mt-8">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" />
                  Easy Access from Escondido Landmarks
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    5 min from Westfield North County
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    7 min from Escondido High School
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    10 min from Rancho Bernardo via I-15
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
              {benefits.map((benefit, index) => (
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
              Convenient Schedule for Escondido Commuters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer early morning, midday, and evening classes to fit your
              Escondido lifestyle—whether you work locally or commute.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                time: 'Early Bird',
                schedule: '6:00 AM - 7:00 AM',
                description: 'Train before work. Perfect for early risers.',
              },
              {
                time: 'Lunch Hour',
                schedule: '12:00 PM - 1:00 PM',
                description: 'Midday training for local professionals.',
              },
              {
                time: 'Evening',
                schedule: '6:00 PM - 9:00 PM',
                description: 'Multiple classes after work hours.',
              },
            ].map((slot) => (
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
                Book Your Free Trial in Escondido
              </h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and we&apos;ll contact you within 24 hours
                to schedule your complimentary class.
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
                    placeholder="(760) 555-1234"
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
                    placeholder="Any experience? Goals? Questions about our Escondido location?"
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
                  {isSubmitting ? 'Sending...' : 'Claim My Free Trial'}
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
                <h2 className="text-2xl font-bold mb-4">Getting Here from Escondido</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Address:</strong>
                    <br />
                    123 Academy Way, Escondido, CA 92025
                  </p>
                  <p>
                    <strong className="text-foreground">From Downtown Escondido:</strong>
                    <br />
                    Head south on Centre City Parkway, merge onto I-15 South. Take
                    the Via Rancho Parkway exit. We&apos;re located just 2 minutes
                    from the freeway.
                  </p>
                  <p>
                    <strong className="text-foreground">From Rancho Bernardo:</strong>
                    <br />
                    Take I-15 North. Exit at Via Rancho Parkway and head west.
                    The academy is on your left after the first light.
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 flex items-center justify-center overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106715.32843844565!2d-117.14973385!3d33.1192432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dbf439c1b13da1%3A0x5fcfb6f0c2a4a0a1!2sEscondido%2C%20CA!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carlson Gracie BJJ Escondido Location"
                />
              </div>

              {/* Cross-link */}
              <div className="bg-primary/10 rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  Also serving:
                </p>
                <Link
                  href="/north-county-san-diego-bjj"
                  className="text-primary font-semibold hover:underline flex items-center gap-2"
                >
                  North County San Diego BJJ
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
            Ready to Train in Escondido?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Join hundreds of Escondido residents who have transformed their lives
            through Brazilian Jiu-Jitsu. Your first class is on us.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8"
          >
            Start Your Free Trial Today
          </Button>
        </div>
      </section>
    </div>
  );
}
